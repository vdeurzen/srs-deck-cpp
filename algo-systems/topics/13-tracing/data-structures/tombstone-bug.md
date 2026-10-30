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
elaborate: Your table erases by backward shift instead of tombstones. Which keys does erasing 5 here have to move, and why only those?
---

A 4-slot table with linear probing, where 0 marks an empty slot.
1, 5 and 9 all have home slot 1 (`k & 3`).

```cpp
struct Table {
  int key[8];
  bool contains(int k) const {          // probe from home slot k & 3
    for (unsigned i = k & 3u; key[i] != 0; i = (i + 1) & 3)   // stop at empty
      if (key[i] == k) return true;
    return false;
  }
};
int main() {
  Table t{{0, 1, 5, 9}};
  bool before = t.contains(9);
  t.key[2] = 0;                         // erase 5: mark its slot empty
  bool after = t.contains(9);           // @1
}
```

---

Linear probing put the three keys in slots 1, 2 and 3, a **run**.
`contains` stops at the first empty slot, which is what keeps a miss
short. Emptying slot 2 breaks the run: 9 still sits in slot 3, but
the probe from slot 1 hits the hole at 2 and reports "not found". No
crash, a present key turned invisible.

The repair is a third slot state, a **tombstone**, which lookups walk
past and inserts may reuse.

Verified by compiling and running this program under GCC 16.2.
