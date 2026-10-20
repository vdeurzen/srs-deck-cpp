---
id: range-for-expr-first
kind: basic
version: 1
level: 2
tags: [range-for, lifetime, references]
requires:
  - iter-range-for-intro
  - iter-end-one-past
  - ptr-reference-must-bind
elaborate: Say in one sentence why the loop calls `end()` once up front rather than on every pass, and what that means if the body adds elements.
refs:
  - https://en.cppreference.com/w/cpp/language/range-for
  - https://eel.is/c++draft/stmt.ranged#1
---

`make_list()` returns a `std::vector<int>` by value.

```cpp
int sum = 0;
for (int x : make_list())
    sum += x;
```

## Before the first pass, what does this range-`for` do with the result of `make_list()`?

---

**It binds the result to a hidden reference that lives until the loop ends.**

The standard defines the loop this way: then it calls `begin()` and
`end()` once on what that reference names and steps from one to the
other. Every pass reads through the reference, never a fresh call.
