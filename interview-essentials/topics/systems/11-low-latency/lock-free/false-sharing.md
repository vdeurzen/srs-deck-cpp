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
  - ll-shared-counter-scaling
  - cpp-essentials/layout-alignas-intro
  - cpp-essentials/const-vs-constexpr-initializer
elaborate: Say in one sentence, as to an interviewer, why false sharing never shows up when you read the source.
refs:
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
  - https://en.algorithmica.org/hpc/cpu-cache/sharing/
---

On x86-64, the producer writes one counter, the consumer the other.
Complete the smallest alignment that keeps the two on separate cache
lines.

```cpp
#include <atomic>

constexpr int kAlign = {{c1::64}};

struct alignas(kAlign) Counters {
  alignas(kAlign) std::atomic<long> produced{0};
  alignas(kAlign) std::atomic<long> consumed{0};
};
```

---

**False sharing**: two cores write *different* variables in one cache
line. Coherence works per line, so every write invalidates the other
core's copy and the line ping-pongs — a few-cycle store becomes a
40–100 ns transfer, invisible in the source.

The member `alignas` separates the fields; the struct `alignas` stops the
object sharing its first line with a neighbour. 64 is the line on
x86-64; 32 still puts both counters in one line, and 128 pads more than
needed.
