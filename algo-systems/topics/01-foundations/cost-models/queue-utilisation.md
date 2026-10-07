---
id: foundations-queue-utilisation
kind: basic
version: 1
level: 2
tags: [cost-model, throughput, queues]
refs:
  - https://homes.cs.washington.edu/~lazowska/qsp/
  - https://doi.org/10.1287/opre.9.3.383
elaborate: Which server in your system has the largest arrival rate × service time, and how close to 1 is it at peak?
---

## A server handles one request at a time, 2 ms each, and requests arrive at 400 per second on average. What fraction of the time is it busy?

---

**80 %: utilisation ρ = λ·S = 400/s × 2 ms.**

λ is the arrival rate, S the service time per request. At 500/s ρ
reaches 1: work arrives as fast as it can leave, and above that the
queue grows without bound. Queueing results describe only a stable
server, ρ < 1.
