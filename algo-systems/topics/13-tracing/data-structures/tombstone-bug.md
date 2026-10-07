---
id: trace-tombstone-bug
kind: trace
version: 2
level: 4
tags: [tracing, hashing, open-addressing]
probes:
  1: { has: "true", "t.contains(11)": "false", "t.contains(19)": "false" }
  2: { has: "false", "t.contains(11)": "false", "t.contains(19)": "false" }
requires:
  - hash-tombstones
refs:
  - https://en.wikipedia.org/wiki/Lazy_deletion
  - https://abseil.io/about/design/swisstables
---

```cpp
struct Table {                          // 8 slots, linear probing; 0 = empty
  int key[8];
  bool contains(int k) const {          // probe from home slot k & 7
    for (unsigned i = k & 7u; key[i] != 0; i = (i + 1) & 7)   // stop at empty
      if (key[i] == k) return true;
    return false;
  }
};
int main() {
  Table t{{0, 0, 0, 3, 11, 19, 0, 0}};  // 3, 11, 19 all hash to slot 3
  bool has = true;                      // 19 is in the table
  t.key[4] = 0;                         // @1  "erase" 11: mark its slot empty
  has = t.contains(19);                 // @2
}
```

---

3, 11 and 19 all have home slot 3 (`k & 7`), so linear probing put
them in slots 3, 4 and 5 — a **run**. `contains` stops at the first
empty slot, which is what keeps an unsuccessful lookup short.

Emptying slot 4 silently breaks the run. 19 still sits in slot 5, but
the probe from slot 3 now hits the hole at 4 and reports "not found":
no crash, a present key turned invisible. Probe 1 shows the shape of
such a bug — `has` still holds the old answer while the table already
lies.

The repair is a third slot state, a **tombstone**, which lookups walk
past and inserts may reuse; tombstones pile up until a rehash. For
linear probing, backward-shift deletion (move 19 into slot 4) avoids
them.

Verified by compiling and running this program under GCC 16.2 and printing the three values at each probe.
