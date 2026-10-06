---
id: chunks-cache-padded-counter
kind: chunk
version: 1
level: 3
tags: [idioms, concurrency, low-latency]
expose_ms: 6000
compile: null
requires:
  - ll-false-sharing
refs:
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
  - https://en.algorithmica.org/hpc/cpu-cache/sharing/
---

```cpp
struct alignas(64) PaddedCounter {
  std::atomic<std::uint64_t> value{0};
};

std::array<PaddedCounter, kThreads> counters;
```

---

Per-thread counters that do not share cache lines. Without the
`alignas`, eight `uint64_t` counters sit in one line and every
increment from any thread invalidates the line in every other core —
the array gets *slower* as you add threads, which is the signature of
false sharing.

Two details are load-bearing. The `alignas` goes on the **struct**, so
an array of them is strided by 64 bytes; padding a member inside an
unaligned struct does not help. And the counters must be indexed by
something stable and dense (a thread index assigned at start-up), not
by a hash of the thread id.

The aggregate read is then a sum over the array — which is fine,
because reading is rare and incrementing is not. That asymmetry is the
whole design.

Graded by whitespace-normalised equality (SPEC §4.7): `kThreads` and
the includes come from the enclosing file.
