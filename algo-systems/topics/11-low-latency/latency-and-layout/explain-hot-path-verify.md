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
elaborate: Where in your own code have you trusted a mean latency, and what would a histogram have shown?
---
An interviewer asks how you would measure whether a hot path meets a
p99.9 budget of a few microseconds, from a microbenchmark up to the full
system. Answer aloud.
---
- [ ] The budget is stated as p99.9 and max, since a mean hides exactly the slow events it is about
- [ ] Load runs open-loop on a fixed schedule, latency measured from each event's intended time, or coordinated omission hides stalls
- [ ] A short operation is timed as N calls minus an empty-loop baseline, since one clock read costs as much
- [ ] The benchmarked result is kept observable, or the optimiser deletes the work and the benchmark reports an impossible number
- [ ] A microbenchmark win is confirmed end to end, because the benchmark ran alone with warm caches and a trained predictor
