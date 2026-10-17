---
id: chunks-cache-padded-counter
kind: chunk
version: 1
level: 3
tags: [idioms, concurrency, low-latency]
expose_ms: 6000
compile:
  harness: |
    static_assert(alignof(PaddedCounter) == 64);
    static_assert(sizeof(PaddedCounter) == 64);
    static_assert(sizeof(counters) == 8 * 64);
    int main() { counters[3].value.fetch_add(1, std::memory_order_relaxed); }
requires:
  - ll-false-sharing
refs:
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
  - https://en.algorithmica.org/hpc/cpu-cache/sharing/
---

```cpp
#include <array>
#include <atomic>
struct alignas(64) PaddedCounter {
  std::atomic<unsigned long> value{0};
};
std::array<PaddedCounter, 8> counters;   // one per thread
```

---

Per-thread counters that never share a cache line. Without `alignas`,
eight 8-byte counters fill one line, and each increment invalidates it
in every other core: the array gets *slower* as threads are added —
false sharing.

The `alignas` goes on the **struct**, so the array strides by 64 bytes;
padding inside an unaligned struct does not help. 64 fits x86 and most Arm cores;
Apple M-series lines are 128 bytes, and
`std::hardware_destructive_interference_size` names the target's
value. Index by a dense
thread number, and sum all eight to read — reads are rare, increments
are not. Compile-checked: the harness pins size and alignment.
