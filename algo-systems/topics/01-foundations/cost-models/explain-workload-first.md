---
id: foundations-explain-workload-first
kind: explain
version: 2
level: 4
requires:
  - interview-essentials/complexity-big-o-scaling
  - interview-essentials/complexity-amortised-single-call
  - foundations-latency-line-bounce
  - foundations-amdahl-speedup
  - foundations-utilisation-knee
tags: [complexity, cost-model, interview]
elaborate: Once you know the workload, how would you settle the choice — on what data, by which metric, against which baseline?
refs:
  - https://en.algorithmica.org/hpc/
  - https://doi.org/10.1145/1465482.1465560
---
An interviewer asks what you need to find out about a hot path's
workload before you compare two data structures for it. What do you
tell them?
---
- [ ] How large n really gets, since big-O only rules out what is too slow at that size
- [ ] Whether the latency target is a mean or a tail: an amortised bound hides single slow calls
- [ ] Whether several cores write the same data: each such write moves the cache line between cores
- [ ] Whether the common path takes a lock: that serial fraction s caps speedup at 1/s
- [ ] How close to saturation it runs: queueing wait grows as ρ/(1−ρ), exploding near full utilisation
