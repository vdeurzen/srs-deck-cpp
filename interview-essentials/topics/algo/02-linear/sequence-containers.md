---
id: linear-sequence-containers
kind: basic
version: 1
level: 1
tags: [foundations, containers]
requires:
  - cpp-essentials/vector-basics
  - linear-list-node
refs:
  - https://en.cppreference.com/w/cpp/container/deque
  - https://en.cppreference.com/w/cpp/container/vector
  - https://en.cppreference.com/w/cpp/container/list
elaborate: Which queue in your own code would you back with each of the three, and why?
---

## You need `push_front`, `push_back` and reading `x[i]` by position, each in O(1). Which of the three standard containers gives all three?

```cpp
std::vector<int> v{1, 2};
std::deque<int>  d{1, 2};
std::list<int>   l{1, 2};
```

---

**`std::deque`: it grows at both ends and still indexes.**

A deque keeps fixed-size blocks plus a table of them, so `d[i]` is two
lookups. `std::vector` is one array: O(1) only at the back. `std::list`
is linked nodes: O(1) at both ends, but no `l[i]`.
