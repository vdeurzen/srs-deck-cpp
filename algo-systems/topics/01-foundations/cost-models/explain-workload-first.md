---
id: foundations-explain-workload-first
kind: explain
version: 1
level: 4
requires:
  - algo-basics/complexity-big-o-scaling
  - foundations-amdahl
tags: [complexity, cost-model, interview]
refs:
  - https://en.algorithmica.org/hpc/
  - https://doi.org/10.1145/1465482.1465560
---
Before comparing two data structures for a hot path, what do you need
to know about the workload, and how will you settle the question in the
end?
---
- [ ] The operation mix and sizes: read/write ratio, how often each operation runs, how big `n` really gets — and which operations sit on the critical path rather than in the background
- [ ] Big-O as a filter only: rule out what is quadratic at the real `n`, then stop treating asymptotics as the answer
- [ ] What is shared and written by more than one core, since every such write moves a cache line between cores
- [ ] Whether the structure forces a lock on the common path: that serial fraction caps scaling (Amdahl)
- [ ] A measurement plan: representative data, the metric that matters (throughput or p99), and the simplest baseline (usually a sorted `vector`)
