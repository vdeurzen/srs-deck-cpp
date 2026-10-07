---
id: hash-tombstones
kind: basic
version: 1
level: 3
requires:
  - hash-linear-probe-step
tags: [hashing, open-addressing, misconception]
elaborate: Does a table in your own system erase keys? How does its erase stop this from happening?
refs:
  - https://en.wikipedia.org/wiki/Lazy_deletion
  - https://abseil.io/about/design/swisstables
---

## Erasing from an open-addressed table by marking the slot empty again, as when it was never used. What does the last line return?

```cpp
// 8 slots, home slot = key % 8, linear probing, 0 = empty
insert(t, 3);      // slot 3
insert(t, 11);     // home 3 taken → slot 4
t[3] = 0;          // "erase" 3
find(t, 11);       // result
```

---

**"Not found", though 11 is still in slot 4.**

A search stops at the first empty slot; that is how a miss ends. Clearing
slot 3 cut 11's probe run, so the search for 11 stops before reaching
it. Erasing must not leave a hole in a run.
