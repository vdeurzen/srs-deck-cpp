---
id: linear-stack-at-the-back
kind: basic
version: 1
level: 1
tags: [stacks, arrays]
requires:
  - linear-array-insert-shift
refs:
  - https://en.cppreference.com/w/cpp/container/stack
---

## A stack is built on a dynamic array. Why do `push` and `pop` work at the array's end, not its front?

```cpp
std::vector<int> s;
s.push_back(7);   // push
s.pop_back();     // pop
```

---

**At the end nothing else moves; at the front every element shifts: O(1) vs O(n).**

A stack only ever touches its most recent element (last in, first
out), so it can choose the cheap end. `std::stack` defaults to a
`std::deque` underneath and exposes only that end.
