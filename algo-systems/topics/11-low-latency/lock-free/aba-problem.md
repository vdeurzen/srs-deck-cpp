---
id: ll-aba-problem
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, concurrency, misconception]
elaborate: Where in a lock-free structure you have read (or written) does a CAS assume that an unchanged value means an unchanged world?
refs:
  - https://en.wikipedia.org/wiki/ABA_problem
  - https://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf
---

## True or false: if a CAS sees the value it expected, nothing has changed since it read it.

---

**False — that is the ABA problem.** Between the read and the CAS,
another thread can change the value from A to B and back to A. The CAS
succeeds, the algorithm concludes nothing happened, and the invariant
it depended on is gone.

The textbook case is a lock-free stack. Thread 1 reads `head = A` and
prepares to CAS `head` to `A->next = B`. It is descheduled. Thread 2
pops A, pops B, pushes A back — so `head == A` again, but `A->next` is
now something else entirely (or B has been freed). Thread 1 resumes,
its CAS succeeds because `head` is still A, and it installs a stale or
freed pointer as the new head.

The standard defences:

- **Tagged pointers / version counters**: pack a monotonically
  increasing tag next to the pointer and CAS both at once. With a
  double-width CAS (`cmpxchg16b`, or `std::atomic<struct{ptr,tag}>`
  when it is lock-free) A-with-tag-7 never equals A-with-tag-9.
  Pointer-packing into unused high bits is the 64-bit variant, at the
  cost of tag wraparound being possible in principle.
- **Load-linked/store-conditional** (ARM, POWER): SC fails if the line
  was written at all, so ABA cannot occur — one reason lock-free code
  ported from ARM to x86 sometimes grows a bug.
- **Don't reuse the memory**: most ABA instances are really
  use-after-free in disguise, so a safe reclamation scheme (hazard
  pointers, epochs, RCU) removes both problems at once. This is the
  practical answer in modern code.

The deeper point is that **CAS compares a word, not a state**. Any
lock-free design has to ask what the compared word is standing in for,
and whether that meaning can be restored by an unrelated sequence of
operations. A garbage-collected language hides the memory half of the
problem — which is why Go and Java lock-free code looks simpler — but
not the logical half.
