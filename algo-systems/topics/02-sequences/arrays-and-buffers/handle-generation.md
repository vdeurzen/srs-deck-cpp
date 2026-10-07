---
id: seq-handle-generation
kind: basic
version: 1
level: 4
tags: [arena, handles, low-latency]
requires:
  - seq-generational-handles
  - seq-swap-and-pop
refs:
  - https://floooh.github.io/2018/06/17/handles-vs-pointers.html
  - https://docs.rs/slotmap/latest/slotmap/
---

## Slot 417 is freed and reused for a new order, while an old handle `{index: 417}` is still held. A handle carries `{index, generation}` and each slot stores a generation. What does that catch?

---

**A stale handle: its generation no longer matches the slot's.** Freeing
a slot bumps its generation, and every access compares the two. A silent
read of the wrong object becomes a failed check, for one compare on a
line already loaded.
