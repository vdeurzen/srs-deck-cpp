---
id: spsc-try-pop-parsons
kind: parsons
version: 1
level: 4
tags: [spsc, lock-free, queues, memory-model]
distractors:
  - "  q.head_.store(h + 1, std::memory_order_relaxed);"
  - "  if (h == q.cached_tail_) q.cached_tail_ = q.tail_.load(std::memory_order_relaxed);"
compile:
  harness: |
    struct FakeAtomic {               // records orders and the furthest index acquired
      std::size_t v, acquired = 0, next = 0;   // next: the producer publishes it just after a load
      std::memory_order last_store = std::memory_order_seq_cst;
      bool relaxed_store = false;
      constexpr FakeAtomic(std::size_t x) : v(x) {}
      constexpr std::size_t load(std::memory_order o) {
        const std::size_t seen = v;
        if (o == std::memory_order_acquire && seen > acquired) acquired = seen;
        if (next > v) v = next;
        return seen;
      }
      constexpr void store(std::size_t x, std::memory_order o) {
        v = x;  last_store = o;  relaxed_store |= o == std::memory_order_relaxed;
      }
    };
    struct Spsc;
    struct Slots {                    // the ring's 4 ints; every read checks it is safe now
      const Spsc* q;  int v[4]{};
      constexpr int operator[](std::size_t s) const;
    };
    struct Spsc {                     // the consumer's view of Spsc<int, 4, FakeAtomic>
      FakeAtomic head_{0}, tail_{0};  std::size_t cached_tail_ = 0;  Slots buf_{this};
    };
    constexpr int Slots::operator[](std::size_t s) const {
      const std::size_t h = q->head_.v;          // next item to pop, not yet handed back
      if (s != (h & 3) || h >= q->tail_.acquired)
        throw "slot read before an acquire of tail_ covered it, or after head_ released it";
      return v[s];
    }
    consteval bool drains_and_wraps() {
      Spsc q;
      int out = 0, sum = 0;
      q.buf_.v[0] = 10;  q.tail_.next = 1;                       // published just too late
      if (try_pop<4>(q, out)) return false;                      // empty when it looked
      for (int i = 1; i != 4; ++i) q.buf_.v[i] = 10 + i;         // the producer fills the ring
      q.tail_.store(4, std::memory_order_release);
      for (int i = 0; i != 3; ++i) { if (!try_pop<4>(q, out)) return false; sum += out; }
      q.buf_.v[0] = 20;  q.tail_.store(5, std::memory_order_release);   // wraps to slot 0
      for (int i = 0; i != 2; ++i) { if (!try_pop<4>(q, out)) return false; sum += out; }
      return sum == 10 + 11 + 12 + 13 + 20 && !try_pop<4>(q, out) && q.head_.v == 5
          && q.head_.last_store == std::memory_order_release && !q.head_.relaxed_store;
    }
    static_assert(drains_and_wraps());
    int main() {}
requires:
  - spsc-try-push
  - spsc-publish-order
refs:
  - https://rigtorp.se/ringbuffer/
  - https://en.cppreference.com/w/cpp/atomic/memory_order
---

Now the consumer, the mirror image of `try_push`. `q` has atomics
`head_` and `tail_`, the consumer's private `cached_tail_`, and
`buf_[N]` with `N` a power of two. Order the lines of `try_pop`.

```cpp
#include <atomic>
template <std::size_t N, class Q, class T> constexpr bool try_pop(Q& q, T& out) {
  const std::size_t h = q.head_.load(std::memory_order_relaxed);
  if (h == q.cached_tail_) q.cached_tail_ = q.tail_.load(std::memory_order_acquire);
  if (h == q.cached_tail_) return false;
  out = q.buf_[h & (N - 1)];
  q.head_.store(h + 1, std::memory_order_release);
  return true;
}
```

---

**Own index relaxed, refresh the other only when empty, check, read the
slot, then release it.** Only the consumer writes `head_`, so loading it
needs no ordering. A stale `cached_tail_` can only make the ring look
emptier. The `acquire` pairs with the producer's `release` of `tail_`,
which makes the slot's contents visible.

The read has to wait until an acquire has covered slot `h`, so it comes
after the refresh and after the empty check. It also has to come before
the `head_` store, because that store hands the slot back to a producer
that may overwrite it at once. The harness's `Slots` checks both on
every read. A `relaxed` load of `tail_` drops the visibility guarantee.
A `relaxed` store of `head_` lets the read drift after it.
