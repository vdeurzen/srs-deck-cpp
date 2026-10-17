---
id: sptr-weak-plus-one
kind: trace
version: 1
level: 4
tags: [smart-pointers, lifetime, tracing, implement-std]
probes:
  1: { strong: "2", weak: "1", alive: "true", freed: "false" }
  2: { strong: "0", weak: "1", alive: "false", freed: "false" }
  3: { strong: "0", weak: "0", alive: "false", freed: "true" }
requires:
  - sptr-make-shared-retention
refs:
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/shared_ptr_base.h
  - https://en.cppreference.com/w/cpp/memory/shared_ptr#Implementation_notes
---

A single-threaded model of your control block's counts: `make_shared`,
copy it, take a `weak_ptr`, drop both owners, drop the `weak_ptr`.

```cpp
struct Ctl { long strong = 1, weak = 1; bool alive = true, freed = false; };
void drop_strong(Ctl& c) {
    if (--c.strong == 0) { c.alive = false; if (--c.weak == 0) c.freed = true; }
}
void drop_weak(Ctl& c) { if (--c.weak == 0) c.freed = true; }

Ctl c;
++c.strong;          // @1
++c.weak;
drop_strong(c);
drop_strong(c);      // @2
drop_weak(c);        // @3
```

---

**The owners together hold one weak reference.** At `@1` there is no
`weak_ptr`, yet `weak` is 1: libstdc++'s source comments its weak count as
"#weak + (#shared != 0)". At `@2` the object is destroyed but the
`weak_ptr` keeps the block. The last owner gives up the shared +1, so
exactly one decrement takes `weak` to 0 and frees the block. Without
the +1, the last owner would have to read `weak` and decide, racing a
`weak_ptr` dropping at the same moment: both could free, or neither.
