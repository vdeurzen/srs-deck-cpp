---
id: ll-microbenchmark-context
kind: basic
version: 1
level: 4
tags: [low-latency, measurement, benchmarking, misconception]
requires:
  - ll-measurement
elaborate: Which of your last performance wins was measured only in a microbenchmark, and what in production competes for the same cache?
refs:
  - https://github.com/google/benchmark/blob/main/docs/user_guide.md
  - https://en.algorithmica.org/hpc/profiling/
---

## A change that precomputes a 256 KiB lookup table makes the parsing microbenchmark 30 % faster. The team ships it expecting the same win in the order path. What happens?

---

**It can lose: in production the table evicts the order path's data
from L2.** The microbenchmark ran alone with a warm cache, a trained
predictor and no TLB pressure, so it measured the table's best case. Any
microbenchmark win needs confirming end to end.
