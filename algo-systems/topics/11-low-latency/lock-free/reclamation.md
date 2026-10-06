---
id: ll-reclamation
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, memory, concurrency]
refs:
  - https://www.kernel.org/doc/html/latest/RCU/whatisRCU.html
  - https://en.cppreference.com/w/cpp/header/hazard_pointer
  - https://docs.rs/crossbeam-epoch/latest/crossbeam_epoch/
---

## In a lock-free structure, when is it safe to `delete` a node another thread may be reading? Compare the three answers.

---

The question *is* the hard part of lock-free programming: unlinking a
node is a CAS, but freeing it requires knowing that no reader still
holds a pointer — and readers, by design, announce nothing.

**Hazard pointers.** Before dereferencing, a reader publishes the
pointer in a per-thread single-writer slot, then re-validates that the
node is still reachable. A retiring thread collects all published
hazard pointers and frees only nodes absent from that set, deferring
the rest. Cost: a store plus a fence per read, and a scan per batch of
retirements. Bounded memory (at most O(threads × slots) unreclaimed
nodes), and it is now standardised as `std::hazard_pointer` (C++26).

**Epoch-based reclamation (EBR).** A global epoch counter; each thread
announces the epoch it entered a critical section in. A node retired in
epoch `e` may be freed once every thread has been observed in epoch
`e+2`. Reads cost almost nothing (a store plus one store-load fence on
entry — paid once per critical section, not once per dereference as
with hazard pointers; a relaxed store alone would let the thread's
first pointer load overtake its announcement), which is
why EBR is the choice for read-heavy structures (crossbeam in Rust,
most C++ lock-free libraries). The failure mode is unbounded memory: a
single thread that stalls inside a critical section pins the epoch and
nothing can be freed.

**RCU.** The same idea with the grace period defined by the *scheduler*
rather than by counters — on the kernel's classic implementation,
readers are free (literally no instructions) and a grace period ends
when every CPU has context-switched. Unbeatable read side; writers
must `synchronize_rcu()` or defer via callback, and it depends on
cooperation from the runtime, hence userspace RCU needing explicit
`rcu_read_lock()`.

The trade is one line long: **hazard pointers pay on the read side to
bound memory; epochs and RCU make reads nearly free and let memory
grow**. Pick by which resource is scarce.

And the fourth answer, which is often the right one: **don't reclaim**.
Pre-allocate every node from a pool sized for the workload, recycle
through the structure itself, and the problem disappears — the usual
approach in a trading system, where allocation on the hot path was
never acceptable anyway.
