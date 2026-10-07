---
id: ll-hazard-vs-epoch
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, memory, concurrency]
requires:
  - ll-hazard-pointers
  - ll-epoch-stall
refs:
  - https://doi.org/10.1109/TPDS.2004.8
  - https://www.cl.cam.ac.uk/techreports/UCAM-CL-TR-579.pdf
---

## Hazard pointers or epoch-based reclamation: what property decides between them?

---

**Which resource is scarce: read-side cost or bounded memory.** Hazard
pointers pay a store and a fence per *dereference* to keep unreclaimed
nodes at O(threads × slots). Epochs pay one fence per *critical section*
and let memory grow when a reader stalls. Read-heavy and memory-rich:
epochs (or RCU).
