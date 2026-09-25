---
id: ll-false-sharing
kind: code
version: 1
level: 4
tags: [low-latency, concurrency, memory-hierarchy]
input: chips
choices:
  c1: ["64", "8", "16", "32"]
compile:
  harness: |
    static_assert(alignof(Counters) == 64);
    static_assert(sizeof(Counters) == 128);   // one line each, no sharing
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
  - https://en.algorithmica.org/hpc/cpu-cache/sharing/
---

The producer writes one counter, the consumer the other. Complete the
alignment so the two never share a cache line.

```cpp
#include <atomic>
#include <cstddef>
#include <cstdint>

inline constexpr std::size_t kLine = {{c1::64}};

struct alignas(kLine) Counters {
  alignas(kLine) std::atomic<std::uint64_t> produced{0};
  alignas(kLine) std::atomic<std::uint64_t> consumed{0};
};
```

---

**False sharing** is two cores writing *different* variables that
happen to live in the same cache line. Coherence works at line
granularity, so each write invalidates the other core's copy and the
line ping-pongs between them: a few-cycle store becomes a 40–100 ns
coherence miss, every time, and the effect is invisible in the source —
the variables are genuinely independent.

The cure is padding to a line, and the number is 64 bytes on x86-64 and
on most AArch64 parts. Note the two alignments in the snippet do
different jobs: the member `alignas` separates the fields from each
other, and the struct `alignas` stops the whole object from straddling
lines or sharing its first line with a neighbouring allocation.

The standard's spelling is
`std::hardware_destructive_interference_size`, which is more honest
than a hardcoded 64 — but it is a compile-time constant baked into your
ABI, GCC warns about using it in headers for exactly that reason, and
some hardware (Apple silicon, IBM POWER, Intel's adjacent-line
prefetcher) effectively wants 128. Hardcoding 64 with a comment, or a
project-wide constant, is the common practice.

The mirror-image constant,
`hardware_constructive_interference_size`, marks data you want
*together*: a lock and the data it protects, a node's key and its
children pointers. Same number on most targets, opposite intent.

Where false sharing hides in real code: adjacent fields in a
per-connection struct written by different threads, an array of
per-thread counters (`counts[thread_id]++` — the classic), the head and
tail of a queue, and a `std::atomic<bool> stop_` next to a hot
statistic. The symptom is a profile where a trivial increment costs
more than the work around it, and scaling that gets *worse* with more
threads.
