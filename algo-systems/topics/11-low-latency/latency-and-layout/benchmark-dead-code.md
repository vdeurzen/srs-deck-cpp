---
id: ll-benchmark-dead-code
kind: basic
version: 1
level: 4
tags: [low-latency, measurement, benchmarking, optimiser]
requires:
  - ll-measurement
refs:
  - https://github.com/google/benchmark/blob/main/docs/user_guide.md#preventing-optimization
---

```cpp
for (int i = 0; i < n; ++i) hash(key);   // result unused
```

## At `-O2` this benchmark reports 0.3 ns per `hash()` call. What happened?

---

**The optimiser deleted the call: its result is unused and it has no
side effects.** You timed an empty loop. Make the result observable
(`benchmark::DoNotOptimize(hash(key))`, or accumulate and print it), and
read the assembly: an impossible number is the symptom.
