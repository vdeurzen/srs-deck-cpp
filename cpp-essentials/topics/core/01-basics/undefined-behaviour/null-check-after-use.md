---
id: ub-null-check-after-use
kind: basic
version: 1
level: 2
tags: [undefined-behaviour, optimisation]
requires:
  - ub-optimiser-assumes-no-overflow
  - ptr-null-pointer
elaborate: Where in your code is a pointer used before it is checked, and what would moving the check first cost?
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://timsong-cpp.github.io/cppwp/n4950/intro.abstract#5
---

## Compiled with `-O2` (GCC's usual optimisation level), this function has no null test left in it: it returns `*p` unconditionally. Why is the compiler allowed to delete the `if`?

```cpp
int value(int* p) {
  int v = *p;
  if (p == nullptr) return 0;
  return v;
}
```

---

**`*p` already ran, so the compiler assumes `p` is not null.** A null
dereference is undefined, and optimisers reason from "undefined
behaviour never happens": every dereference becomes a fact about its
operand, so a later check contradicting it can never be true and is
removed, just as with signed overflow. Test, then use.
