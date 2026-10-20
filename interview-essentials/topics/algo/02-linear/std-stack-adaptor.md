---
id: std-stack-adaptor
kind: basic
version: 1
level: 1
tags: [foundations, stacks, containers]
requires:
  - linear-stack-adt
  - std-queue-stack-adaptors
refs:
  - https://en.cppreference.com/w/cpp/container/stack
elaborate: "Say in one sentence why an adaptor that hides everything but `push`, `top` and `pop` makes a stack harder to misuse than a bare `std::vector`."
---

## `std::stack` is an adaptor: it wraps another container and exposes only `push`, `top` and `pop`. What does `t` hold?

```cpp
std::stack<int> s;
s.push(1);
s.push(2);
s.push(3);
s.pop();
int t = s.top();
```

---

**2: `pop()` removed the newest, 3; `top()` reads the newest left.**

Like `std::queue::pop`, `std::stack::pop` returns nothing, so read
`top()` before popping. The wrapped container is hidden: no indexing,
no iteration, only the stack's three operations.
