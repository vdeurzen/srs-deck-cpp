---
id: foundations-latency-io-scale
kind: basic
version: 1
level: 2
tags: [cost-model, low-latency, databases]
requires:
  - foundations-latency-scale
elaborate: Where does your system cross from the nanosecond scale to the microsecond one, and does it batch at that boundary?
refs:
  - https://en.algorithmica.org/hpc/external-memory/hierarchy/
  - https://www.agner.org/optimize/
---

## How many random DRAM accesses fit in the time of one NVMe random read (~20–100 µs)?

---

**Hundreds to a thousand: ~80 ns against tens of microseconds.**
A datacentre round trip is another order of magnitude above that. At
the microsecond boundary batching and asynchronous I/O decide the
design; layout decides it at the nanosecond one.
