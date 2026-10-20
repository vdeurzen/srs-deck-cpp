---
id: trap-linked-list-insertion
kind: basic
version: 1
level: 2
tags: [transfer, misconception, containers, memory-hierarchy]
elaborate: Where in your own code did you pick a list because insertion "should" be cheap, and did you already hold the position or search for it?
requires:
  - linear-list-insert-misconception
  - foundations-memory-hierarchy
  - cpp-essentials/stdalgo-find-vs-find-if
refs:
  - https://en.cppreference.com/w/cpp/container/list/insert
  - https://en.cppreference.com/w/cpp/container/vector/insert
---

## Many expect a `std::list<int>` to win here: its insert is O(1), a `std::vector<int>`'s O(n). `c` is either one; the loop inserts 10 000 random ints, keeping `c` sorted (`for (int x : values)` runs once per value). Roughly how do the two run times compare?

```cpp
for (int x : values) {
  auto it = std::find_if(c.begin(), c.end(), [x](int y) { return y > x; });
  c.insert(it, x);
}
```

---

**The vector, typically ~10× sooner: the search dominates, not the insert.**

`list::insert` is O(1) only once you hold the position. Reaching it
walks node by node, each a likely cache miss; the vector scans
contiguous memory, 16 ints per line. Measured (GCC 16.2 `-O2`, Ryzen 7 PRO 6850U): list 105 ms,
vector 10 ms.
