---
id: foundations-littles-law
kind: basic
version: 2
level: 4
tags: [cost-model, throughput, low-latency, databases]
elaborate: What is the arrival rate and the time-in-system of the busiest queue you own? What depth does that predict?
refs:
  - https://doi.org/10.1287/opre.9.3.383
  - https://en.wikipedia.org/wiki/Little%27s_law
---

## A handler receives 200 000 messages/s and each spends 50 µs inside it. How many messages are in flight on average?

---

**10, by Little's law: L = λ·W = 200 000/s × 50 µs.**
It holds for any stable system, whatever the distribution of arrivals
or service times. That number is your queue depth, buffer count and
needed concurrency.
