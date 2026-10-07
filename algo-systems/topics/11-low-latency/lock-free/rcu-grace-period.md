---
id: ll-rcu-grace-period
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, memory, linux]
requires:
  - ll-epoch-stall
refs:
  - https://www.kernel.org/doc/html/latest/RCU/whatisRCU.html
---

## In a Linux kernel built with `CONFIG_PREEMPT_NONE`, a writer unlinks an RCU-protected node and calls `synchronize_rcu()`. When does it return, so the node may be freed?

---

**After every CPU has passed a quiescent state, such as a context
switch.** Readers may not block inside `rcu_read_lock()`, so once each
CPU has switched, every reader that could hold the node has finished.
The grace period comes from the scheduler, so here `rcu_read_lock()`
emits no instructions; preemptible RCU must count readers.
