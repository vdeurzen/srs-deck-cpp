---
id: ll-explain-hot-path-verify
kind: explain
version: 1
level: 5
tags: [low-latency, hft, measurement]
requires:
  - ll-coordinated-omission
  - ll-benchmark-dead-code
  - ll-microbenchmark-context
refs:
  - https://github.com/HdrHistogram/HdrHistogram
  - https://github.com/google/benchmark/blob/main/docs/user_guide.md
---
Explain how you would measure whether a hot path meets a p99.9 budget of
a few microseconds, from a microbenchmark up to the full system.
---
- [ ] The requirement is stated as p99.9 and max, not a mean, because the mean hides exactly the slow events the budget is about
- [ ] Load is driven open-loop on a fixed schedule and latency measured from each event's intended time, or coordinated omission hides the stalls
- [ ] A short operation is timed as a loop of N against an empty-loop baseline, because one clock read costs as much as the operation
- [ ] The benchmarked result is kept observable, or the optimiser deletes the work and the benchmark reports an impossible number
- [ ] A microbenchmark win is confirmed end to end, because the benchmark ran alone with warm caches and a trained predictor
