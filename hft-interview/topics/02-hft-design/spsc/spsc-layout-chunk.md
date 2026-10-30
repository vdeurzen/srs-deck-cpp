---
id: spsc-layout-chunk
kind: chunk
version: 1
level: 3
tags: [spsc, false-sharing, layout, low-latency]
expose_ms: 9000
compile:
  harness: |
    #include <cstddef>
    using Q = Spsc<int, 4>;   // the alias: a comma inside offsetof(...) splits the macro
    constexpr std::size_t line(std::size_t off) { return off / 64; }
    static_assert(alignof(Q) == 64 && sizeof(Q) % 64 == 0);
    static_assert(line(offsetof(Q, head_)) != line(offsetof(Q, tail_)));
    static_assert(line(offsetof(Q, buf_)) != line(offsetof(Q, head_)));
    static_assert(line(offsetof(Q, buf_)) != line(offsetof(Q, tail_)));
    static_assert(line(offsetof(Q, cached_head_)) != line(offsetof(Q, head_)));
    static_assert(line(offsetof(Q, cached_tail_)) != line(offsetof(Q, tail_)));
    static_assert(offsetof(Q, buf_) % 64 == 0);
    int main() {}
requires:
  - interview-essentials/chunks-cache-padded-counter
  - spsc-try-push
  - algo-systems/ll-spsc-cached-index
refs:
  - https://rigtorp.se/ringbuffer/
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
  - https://en.cppreference.com/w/cpp/types/offsetof
---

```cpp
#include <atomic>
template <class T, std::size_t N, class A = std::atomic<std::size_t>>
struct alignas(64) Spsc {                                  // SPSC members on 64-byte lines
  A tail_{0};  std::size_t cached_head_ = 0;               // line 0: producer writes
  alignas(64) A head_{0};  std::size_t cached_tail_ = 0;   // line 1: consumer writes
  alignas(64) T buf_[N]{};                                 // line 2 on: the slots
};
```

---

**One cache line per writer, then the slots.** No line is written by
both cores, so neither side's updates invalidate the other's line. Each
cached copy sits with the index its owner writes, because only that
owner touches it.

Without `alignas` on `head_`, the two indices share a line that bounces
on every push and pop. Without it on `buf_`, slot 0 can share the
consumer's line, so each producer write hits the line the consumer
spins on. Rigtorp's queue gives all four members a line each, which
also works. 64 is the x86-64 line, but Intel's
adjacent-line prefetcher and Apple silicon effectively want 128.
