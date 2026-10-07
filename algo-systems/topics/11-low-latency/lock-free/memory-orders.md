---
id: ll-memory-orders
kind: cloze
version: 2
level: 5
tags: [low-latency, concurrency, atomics]
requires:
  - cpp-core/atomics-synchronizes-with
  - cpp-core/atomics-seq-cst-store-buffering
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order
  - https://eel.is/c++draft/atomics.order
  - https://www.cl.cam.ac.uk/~pes20/cpp/cpp0xmappings.html
---

What the orders cost on x86-64. The hardware is already TSO, so an acquire
load, a release store and even a `seq_cst` load all compile to
{{c4::plain MOVs::an instruction class}}; only a `seq_cst` store pays, as
an `xchg` (GCC 16 `-O2`), to forbid store-load reordering. Choosing
weaker orders on x86 therefore saves little in the instructions and
mostly frees the *compiler* to reorder.

---

Checked with `g++ -O2 -S` (GCC 16.2, x86-64); the mappings are the
Cambridge C/C++11 table. The flip side: too-weak orders usually *work*
on x86 and prove nothing. A plain payload published with a relaxed flag
is a data race, and AArch64 (`LDAR`/`STLR` really constrain the core)
or the optimiser will exhibit it — test with ThreadSanitizer.
