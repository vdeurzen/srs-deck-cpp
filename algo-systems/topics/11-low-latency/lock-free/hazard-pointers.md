---
id: ll-hazard-pointers
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, memory, concurrency]
requires:
  - ll-reclamation
refs:
  - https://doi.org/10.1109/TPDS.2004.8
  - https://en.cppreference.com/w/cpp/header/hazard_pointer
---

## A hazard-pointer reader stores `p` in its hazard slot. Why must it then re-read the shared pointer and check it still equals `p` before dereferencing?

---

**The node may have been retired between the first load and the
publication.** A retiring thread that scanned the slots in that gap saw
no hazard and may free it. Re-validating proves the node was still
reachable *after* the hazard became visible (which needs a store-load
fence), so any later scan will see it.
