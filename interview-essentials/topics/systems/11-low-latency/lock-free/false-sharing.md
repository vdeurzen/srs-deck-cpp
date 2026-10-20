---
id: ll-false-sharing
kind: code
version: 2
level: 4
tags: [low-latency, concurrency, memory-hierarchy]
input: chips
choices:
  c1:
    - "alignas(kAlign) std::atomic<long>"
    - "std::atomic<long>"
    - "alignas(kAlign / 2) std::atomic<long>"
    - "alignas(8) std::atomic<long>"
compile:
  harness: |
    static_assert(alignof(Counters) == 64);
    static_assert(sizeof(Counters) == 128);
    int main() {}
requires:
  - ll-false-sharing-symptom
  - cpp-essentials/layout-alignas-intro
  - cpp-essentials/const-vs-constexpr-initializer
elaborate: If you kept a thousand of these structs, what would the padding cost, and when is that worth paying?
refs:
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
  - https://en.cppreference.com/w/cpp/language/alignas
  - https://en.algorithmica.org/hpc/cpu-cache/sharing/
---

A cache line is 64 bytes. The producer thread writes `produced`, the
consumer thread writes `consumed`. Complete `consumed`'s declaration so
the two counters never share a line.

```cpp
#include <atomic>

constexpr int kAlign = 64;

struct alignas(kAlign) Counters {
  std::atomic<long> produced{0};
  {{c1::alignas(kAlign) std\::atomic<long>}} consumed{0};
};
```

---

**`alignas(kAlign)` starts `consumed` on the next line, at offset 64.**
The struct's own `alignas` only places the object's start; with a plain
`std::atomic<long>` or `alignas(8)`, `consumed` sits at offset 8, in
`produced`'s line. `kAlign / 2` puts it at offset 32: still the same line.
