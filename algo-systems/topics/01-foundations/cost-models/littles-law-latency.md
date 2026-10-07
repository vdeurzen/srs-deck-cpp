---
id: foundations-littles-law-latency
kind: basic
version: 1
level: 4
tags: [cost-model, throughput, low-latency]
requires:
  - foundations-littles-law
refs:
  - https://doi.org/10.1287/opre.9.3.383
  - https://en.wikipedia.org/wiki/Little%27s_law
---

## A depth gauge on a queue reads 1 000 entries while 200 000 entries/s pass through. How long does each entry wait, with no timestamps?

---

**5 ms: W = L / λ = 1 000 / 200 000 per second.**
Little's law read backwards turns an occupancy gauge into a latency
measurement, which is cheaper than timestamping every message.
