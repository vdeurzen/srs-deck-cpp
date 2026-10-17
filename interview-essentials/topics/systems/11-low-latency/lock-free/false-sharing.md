---
id: ll-false-sharing
kind: code
version: 1
level: 4
tags: [low-latency, concurrency, memory-hierarchy]
input: chips
choices:
  c1: ["64", "8", "32", "128", "4096"]
compile:
  harness: |
    static_assert(alignof(Counters) == 64);
    static_assert(sizeof(Counters) == 128);   // one line each, no sharing
    int main() {}
requires:
  - ll-hardware-numbers
  - cpp-essentials/layout-alignas-sizeof
  - ll-shared-counter-scaling
refs:
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
  - https://en.algorithmica.org/hpc/cpu-cache/sharing/
---

On x86-64, the producer writes one counter, the consumer the other.
Complete the smallest alignment that keeps the two on separate cache
lines.

```cpp
#include <atomic>
#include <cstddef>
#include <cstdint>

inline constexpr std::size_t kAlign = {{c1::64}};

struct alignas(kAlign) Counters {
  alignas(kAlign) std::atomic<std::uint64_t> produced{0};
  alignas(kAlign) std::atomic<std::uint64_t> consumed{0};
};
```

---

**False sharing**: two cores write *different* variables in one cache
line. Coherence works per line, so every write invalidates the other
core's copy and the line ping-pongs — a few-cycle store becomes a
40–100 ns transfer, invisible in the source.

The member `alignas` separates the fields; the struct `alignas` stops the
object sharing its first line with a neighbour. 64 is the line on x86-64
and most AArch64; `std::hardware_destructive_interference_size` is the
standard spelling, but it is baked into your ABI (GCC warns in headers),
and Apple silicon or Intel's adjacent-line prefetcher effectively want
128.
