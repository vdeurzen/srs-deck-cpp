---
id: seq-generational-handles
kind: basic
version: 1
level: 4
tags: [arena, handles, compilers, low-latency]
refs:
  - https://floooh.github.io/2018/06/17/handles-vs-pointers.html
  - https://docs.rs/slotmap/latest/slotmap/
---

## Why do compilers, ECS engines and order books store 32-bit *handles* into an arena instead of pointers, and what does the generation counter add?

---

A handle is an index into a densely packed array, usually split into
bits: 24 bits of index plus 8 bits of **generation**, or 32 + 32. The
array of objects is owned by one arena; nobody holds a pointer to an
element.

What indices buy over pointers:

- **Half the size** (or a quarter), so structures that are mostly
  references — an IR instruction's operand list, an order's neighbours —
  fit in fewer cache lines.
- **Relocation is free**: the arena can grow, compact, or be serialised
  to disk and reloaded at a different address, and every handle is still
  valid. Pointers would all have to be rewritten.
- **Dense iteration for free**: the arena is a `vector`, so a pass over
  every instruction is a linear scan, not a pointer chase through
  whatever order the allocator happened to hand out.
- **Trivial bounds and ownership checks**: an index can be validated; a
  dangling pointer cannot.

The **generation counter** is what makes use-after-free detectable. Each
slot keeps a counter that is bumped when the slot is freed; a handle
carries the generation it was created with; dereferencing compares them
and fails loudly when the slot has been recycled. That turns the worst
bug class in this design — a stale handle silently naming whatever object
now lives in slot 417 — into an assertion, at the cost of one compare on
a line you were loading anyway.

The costs: every access is `arena[h.index]`, so you need the arena in
hand (it is a parameter or a member, never a global if you can help it);
the type system no longer distinguishes what a handle points at unless
you make handles strongly typed (`Handle<Instruction>`); and freeing
leaves holes, so either the slots are recycled through a free list or the
arena is only ever reset wholesale.
