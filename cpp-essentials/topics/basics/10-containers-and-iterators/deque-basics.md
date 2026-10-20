---
id: deque-basics
kind: basic
version: 1
level: 1
tags: [containers, deque, foundations]
requires:
  - vector-basics
elaborate: Say which job, such as a sliding-window queue or a work list, needs `push_front`, and why a `vector` would be slow for it.
refs:
  - https://en.cppreference.com/w/cpp/container/deque
  - https://eel.is/c++draft/deque.overview
---

`d` is a `std::deque<int>`, from the header `<deque>`.

```cpp
std::deque<int> d{5, 6};
d.push_front(4);
d.push_back(7);
int x = d[0];
```

## What is `x`?

---

**4: a deque grows at both ends and still indexes like a vector.**

`push_front` adds before the first element, so 4 is now at index 0.
Adding at either end is O(1), and so is `d[i]`. A `std::vector` has no
`push_front`: inserting at its front shifts every element.
