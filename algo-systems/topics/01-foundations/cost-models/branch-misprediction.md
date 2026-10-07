---
id: foundations-branch-misprediction
kind: basic
version: 1
level: 3
requires:
  - foundations-latency-scale
tags: [cost-model, branchless, low-latency]
refs:
  - https://en.algorithmica.org/hpc/pipelining/branching/
  - https://www.agner.org/optimize/
---

## The same loop runs several times faster after `std::sort(v)`, with the same instructions and the same cache behaviour. Why?

```cpp
for (unsigned char b : v)
  if (b >= 128) sum += b;
```

---

**Sorted, the branch becomes predictable, so mispredictions (~15–20 cycles each) vanish.**
On random bytes the predictor guesses wrong about half the time and the
pipeline restarts. Sorted, the branch is one run of not-taken then one
run of taken, and the predictor is right almost every time.
