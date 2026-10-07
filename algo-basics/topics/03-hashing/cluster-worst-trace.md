---
id: hashing-cluster-worst-trace
kind: trace
version: 1
level: 2
tags: [hashing, open-addressing, complexity, tracing]
requires:
  - hashing-linear-probe-step
probes:
  1: { probes: "3" }
  2: { probes: "10", last: "3" }
refs:
  - Knuth, The Art of Computer Programming, vol. 3, 2nd ed., §6.4
---

Linear probing in 8 slots, home slot `key % 8`. `probes` counts every
slot looked at.

```cpp
int t[8] = {};   // 0 = empty
int probes = 0;

int insert(int key) {
  int i = key % 8;
  ++probes;
  while (t[i] != 0) { i = (i + 1) % 8; ++probes; }
  t[i] = key;
  return i;
}

int main() {
  insert(8); insert(16);                // @1
  insert(24); int last = insert(32);    // @2
}
```

---

Every key is a multiple of 8, so all share home slot 0 and the k-th
insert probes k slots: 1 + 2 + 3 + 4 = 10. **n colliding keys cost
O(n) each, O(n²) in total**: the worst case is the hash failing to
spread, not the table being full.

(Values from running it under GCC 16.2.)
