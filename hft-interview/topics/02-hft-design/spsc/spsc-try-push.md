---
id: spsc-try-push
kind: code
version: 1
level: 4
tags: [spsc, lock-free, queues, low-latency]
input: chips
choices:
  c1:
    - "t - cached_head_ == N"
    - "t == cached_head_"
    - "(t & (N - 1)) == (cached_head_ & (N - 1))"
    - "t - cached_head_ == N - 1"
    - "true"
compile:
  harness: |
    struct FakeAtomic {               // constexpr stand-in for std::atomic: counts loads
      std::size_t v;
      mutable int loads = 0;
      constexpr FakeAtomic(std::size_t x) : v(x) {}
      constexpr std::size_t load(std::memory_order) const { ++loads; return v; }
      constexpr void store(std::size_t x, std::memory_order) { v = x; }
    };
    consteval bool fill_then_wrap() {
      Spsc<int, 4, FakeAtomic> q;
      for (int i = 1; i <= 4; ++i)
        if (!q.try_push(i)) return false;           // all N slots are usable
      if (q.head_.loads != 0) return false;         // the cached copy sufficed
      if (q.try_push(5)) return false;              // full: refused, not overwritten
      q.head_.store(2, std::memory_order_release);  // the consumer has taken two
      if (!q.try_push(5) || !q.try_push(6) || q.try_push(7)) return false;
      return q.buf_[0] == 5 && q.buf_[1] == 6 && q.buf_[2] == 3 && q.head_.loads == 3;
    }
    static_assert(fill_then_wrap());
    int main() {}
requires:
  - interview-essentials/seq-ring-buffer-mask
  - algo-systems/ll-spsc-cached-index
refs:
  - https://rigtorp.se/ringbuffer/
  - https://lmax-exchange.github.io/disruptor/disruptor.html
---

The interviewer: "Write `try_push` for a single-producer, single-consumer
ring." `head_` and `tail_` count items ever popped and pushed;
`cached_head_` is the producer's last read of `head_`. Complete the
condition so the producer re-reads `head_` only when it has to.

```cpp
#include <atomic>
template <class T, std::size_t N, class A = std::atomic<std::size_t>> struct Spsc {  // N: 2^k
  A head_{0}, tail_{0};  std::size_t cached_head_ = 0;  T buf_[N]{};
  constexpr bool try_push(const T& x) {
    const std::size_t t = tail_.load(std::memory_order_relaxed);
    if ({{c1::t - cached_head_ == N}}) {
      cached_head_ = head_.load(std::memory_order_acquire);
      if ({{c1::t - cached_head_ == N}}) return false;
    }
    buf_[t & (N - 1)] = x;  tail_.store(t + 1, std::memory_order_release);  return true;
  }
};
```

---

**Refresh exactly when the stale copy says full: `N` items in flight.**
`head_` only grows, so a stale copy can make the ring look fuller, never
emptier, and that error is safe. A refresh costs a cross-core read of
the consumer's line, so it should happen only when the stale copy
actually blocks the push.

Both blanks are the same test: before the refresh and after it. The
test counts `head_` loads. `true` refreshes on every push, which is what
the cache exists to prevent (Rigtorp measured roughly 20× more items/s
with the cache, on his machine), and then reports full. Masked indices are equal when
the ring is empty as well as full, so they refresh needlessly.
`t == cached_head_` is the *empty* test. `N - 1` refreshes one push
early.
