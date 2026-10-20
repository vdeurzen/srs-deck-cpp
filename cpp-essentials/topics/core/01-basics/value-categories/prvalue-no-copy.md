---
id: value-categories-prvalue-no-copy
kind: basic
version: 1
level: 2
tags: [value-categories, copy-elision]
requires:
  - value-categories-categories-cloze
  - move-vs-copy-intro
elaborate: Say aloud which factory function in your code returns a large object by value, and what this rule saves it.
refs:
  - https://en.cppreference.com/w/cpp/language/copy_elision
  - https://timsong-cpp.github.io/cppwp/n4950/dcl.init.general#16.6.1
---

`Big` has a copy constructor and a move constructor, each of which logs
a line.

```cpp
Big make() { return Big{}; }

int main() {
    Big b = make();
}
```

## In C++23, how many times does a copy or move constructor of `Big` run?

---

**Zero: the prvalue `Big{}` initialises `b` directly.**

Since C++17 a prvalue is not an object yet; it says how to build one.
Passed through the `return`, it builds `b` itself, so there is nothing
to copy or move from.
