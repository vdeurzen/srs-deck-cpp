---
id: ll-false-sharing-symptom
kind: basic
version: 1
level: 3
tags: [low-latency, concurrency, cache-coherence]
requires:
  - ll-hardware-numbers
  - ll-shared-counter-scaling
elaborate: Say in one sentence, as to an interviewer, why this effect never shows up when you read the source.
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/sharing/
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
---

## Two threads each increment only their own `std::atomic<long>`; neither ever reads the other's. The two counters are adjacent members of one struct. Run together, each thread is several times slower than alone. What is this effect called?

```cpp
struct Stats {
  std::atomic<long> sent{0};      // thread A only
  std::atomic<long> received{0};  // thread B only
};
```

---

**False sharing: different variables in one cache line.**

No data is shared, only the line, yet coherence moves it between the
cores on every write, as with one counter both threads write (true
sharing). The cure differs: moving the counters to separate lines
fixes false sharing; true sharing needs fewer shared writes.
