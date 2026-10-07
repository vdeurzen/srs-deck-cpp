---
id: trap-hash-vs-tree
kind: basic
version: 1
level: 3
tags: [transfer, misconception, hashing, trees]
elaborate: Pick a map in your codebase. Does anything iterate it, range over it, or depend on its order — and would you notice if the order changed?
requires:
  - hash-chaining-vs-open-addressing
  - algo-basics/tree-why-balance
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map
  - https://en.cppreference.com/w/cpp/container/map/lower_bound
---

## A teammate picked `std::unordered_map` for this index because lookup is O(1). What does the range query cost?

```cpp
std::unordered_map<std::int64_t, Event> by_ts;   // 10 M events, key = timestamp
// query: every event with a <= ts < b
```

---

**O(n): a scan of all 10 M entries, because hashing keeps no order.**

Neighbouring timestamps land in unrelated buckets. An ordered
structure (`std::map`, a B-tree, a sorted vector) answers in
O(log n + k): find `a`, walk to `b`. Ranges, ordered iteration and
predecessor queries decide the choice, not point-lookup big-O.
