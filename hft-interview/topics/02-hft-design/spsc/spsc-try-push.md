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
elaborate: The consumer falls behind for a burst. How often does the producer now pay the cross-core read, and what would you change if that showed up in a profile?
refs:
  - https://rigtorp.se/ringbuffer/
  - https://lmax-exchange.github.io/disruptor/disruptor.html
---

An SPSC ring: `head_` and `tail_` count items ever popped and pushed;
`cached_head_` is the producer's last read of `head_`. Complete the test
so `head_` is re-read only when needed.

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
`head_` only grows, so a stale copy errs towards full, which is safe. A
refresh is a cross-core read of the consumer's line, so do it only when
the stale copy blocks the push.

Both blanks are the same test, before and after the refresh. Masked
indices are also equal when the ring is empty. `t == cached_head_` is the *empty* test.
