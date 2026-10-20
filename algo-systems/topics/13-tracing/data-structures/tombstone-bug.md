---
id: trace-tombstone-bug
kind: trace
version: 3
level: 4
tags: [tracing, hashing, open-addressing]
probes:
  1: { before: "true", after: "false" }
requires:
  - hash-tombstones
refs:
  - https://en.wikipedia.org/wiki/Lazy_deletion
  - https://abseil.io/about/design/swisstables
elaborate: Your table erases by backward shift instead of tombstones. Which keys does erasing 11 here have to move, and why only those?
---

An 8-slot table with linear probing, where 0 marks an empty slot.
3, 11 and 19 all have home slot 3 (`k & 7`).

```cpp
struct Table {
  int key[8];
  bool contains(int k) const {          // probe from home slot k & 7
    for (unsigned i = k & 7u; key[i] != 0; i = (i + 1) & 7)   // stop at empty
      if (key[i] == k) return true;
    return false;
  }
};
int main() {
  Table t{{0, 0, 0, 3, 11, 19, 0, 0}};
  bool before = t.contains(19);
  t.key[4] = 0;                         // "erase" 11: mark its slot empty
  bool after = t.contains(19);          // @1
}
```

---

Linear probing put the three keys in slots 3, 4 and 5, a **run**.
`contains` stops at the first empty slot, which is what keeps a miss
short. Emptying slot 4 breaks the run: 19 still sits in slot 5, but
the probe from slot 3 hits the hole at 4 and reports "not found". No
crash, a present key turned invisible.

The repair is a third slot state, a **tombstone**, which lookups walk
past and inserts may reuse.

Verified by compiling and running this program under GCC 16.2.
