---
id: ll-pause-hint
kind: basic
version: 1
level: 4
tags: [low-latency, concurrency, spinning, misconception]
requires:
  - ll-spin-wait
refs:
  - https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html
  - https://www.felixcloutier.com/x86/pause
elaborate: In a spin loop you have written or read, what does the loop body do between checks, and what does that cost the hyperthread sibling?
---

## A spin-wait loop should re-check the flag as fast as possible, so it should contain nothing but the check. What goes wrong?

---

**Exiting the loop costs a pipeline flush, and the spin starves the
core's hyperthread sibling.**

The core speculates many loads of the flag ahead; when it changes, they
count as a memory-order violation and are discarded. x86's `pause`
(Arm: `yield`) slows the loop and avoids both, at ~10 to ~140 cycles
depending on the Intel generation.
