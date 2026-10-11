---
id: ll-rcu-basics
kind: basic
version: 1
level: 4
tags: [low-latency, lock-free, memory, linux]
requires:
  - ll-reclamation
refs:
  - https://www.kernel.org/doc/html/latest/RCU/whatisRCU.html
---

## Linux RCU: readers bracket their access with `rcu_read_lock()` / `rcu_read_unlock()`; a writer swaps in a new copy with `rcu_assign_pointer()`. What must it do before `kfree()` of the old copy?

---

**Wait for a grace period: `synchronize_rcu()`, or defer the free with
`call_rcu()`.** A grace period ends once every read-side critical section
that began before the swap has finished; readers starting later can only
find the new copy. Readers never write shared memory, so they never retry
or block the writer.
