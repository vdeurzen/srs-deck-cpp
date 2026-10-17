---
id: trap-linked-list-insertion
kind: basic
version: 1
level: 2
tags: [transfer, misconception, containers, memory-hierarchy]
elaborate: Where in your own code did you pick a list because insertion "should" be cheap? Do you already hold the position, or do you search for it?
requires:
  - seq-vector-vs-deque
  - linear-array-insert-shift
refs:
  - https://en.cppreference.com/w/cpp/container/list/insert
  - https://en.cppreference.com/w/cpp/container/vector/insert
---

## `c` is a `std::list<int>` (O(1) insert) or a `std::vector<int>` (O(n) insert). The loop inserts 10 000 random ints, keeping `c` sorted. Which finishes first?

```cpp
for (int x : values) {
  auto it = std::find_if(c.begin(), c.end(), [&](int y) { return y > x; });
  c.insert(it, x);
}
```

---

**The vector, typically ~10× sooner: the search dominates, not the insert.**

`list::insert` is O(1) only once you hold the position. Reaching it is
a chain of dependent loads, one node at a time; the vector's search and
shift scan contiguous memory, prefetched and vectorisable. Measured (GCC 16.2 `-O2`, Ryzen 7 PRO 6850U): list 105 ms,
vector 10 ms.
