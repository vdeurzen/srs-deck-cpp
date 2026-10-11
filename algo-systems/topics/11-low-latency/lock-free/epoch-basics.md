---
id: ll-epoch-basics
kind: basic
version: 1
level: 4
tags: [low-latency, lock-free, memory, concurrency]
requires:
  - ll-reclamation
refs:
  - https://www.cl.cam.ac.uk/techreports/UCAM-CL-TR-579.pdf
---

## Epoch-based reclamation: each operation runs in a critical section that announces the current global epoch, and an unlinked node goes on the current epoch's retire list. When may the list for epoch `e` be freed?

---

**Once no thread can still be inside a critical section begun in epoch
`e` or earlier.** Only such a thread could hold one of those nodes. The
global epoch advances only after every active thread has announced it, so
Fraser frees `e`'s list two advances later. Readers pay one announcement
per operation, not per pointer.
