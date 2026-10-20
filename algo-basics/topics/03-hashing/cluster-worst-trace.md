---
id: hashing-cluster-worst-trace
kind: basic
version: 2
level: 2
tags: [hashing, open-addressing, complexity]
requires:
  - interview-essentials/hashing-open-addressing
elaborate: How could a client who knows your hash function trigger this on purpose, and what would you change?
refs:
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4
---

```cpp
int t[8] = {};                  // 0 means empty
int insert(int key) {
  int i = key % 8;
  while (t[i] != 0) i = (i + 1) % 8;
  t[i] = key;
  return i;
}
```

## Keys 8, 16, 24 and 32 go into the empty table in that order. How many slots does the insert of 32 look at?

---

**4: all four start at slot 0, so it passes the three before it.**

The k-th such key looks at k slots, so n of them
cost 1 + 2 + … + n = O(n²). The worst case is the hash failing to
spread keys, not a full table.
