---
id: ll-epoch-stall
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, memory, concurrency]
requires:
  - ll-reclamation
refs:
  - https://www.cl.cam.ac.uk/techreports/UCAM-CL-TR-579.pdf
  - https://docs.rs/crossbeam-epoch/latest/crossbeam_epoch/
---

## Under epoch-based reclamation, one reader thread is descheduled for a second inside its critical section. What happens to memory?

---

**Nothing retired since it entered can be freed, so retired nodes pile
up for as long as it stalls.** A node retired in epoch `e` is freed only once every
thread has been seen in a later epoch, and the stalled thread pins the
global epoch. Readers stay cheap; memory is what pays.
