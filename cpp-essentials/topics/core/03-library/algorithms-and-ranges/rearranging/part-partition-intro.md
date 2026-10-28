---
id: part-partition-intro
kind: basic
version: 1
level: 1
tags: [algorithms, rearranging]
requires:
  - srch-partitioned-vocab
  - alg-iter-index
elaborate: Name a task in your own code that splits items into two groups without caring about order inside each.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition
  - https://eel.is/c++draft/alg.partitions
---

```cpp
std::vector<int> v{3, 8, 5, 6};
auto is_even = [](int x) { return x % 2 == 0; };
auto mid = std::partition(v.begin(), v.end(), is_even);
```

## What is `mid - v.begin()`?

---

**2: `partition` moves the 2 evens first and returns where the odds begin.**

Afterwards `v` is partitioned by `is_even`: 8 and 6, then 3 and 5, each
group in an unspecified order. `mid` marks the first failing element. No
element is lost, and `v.size()` stays 4.
