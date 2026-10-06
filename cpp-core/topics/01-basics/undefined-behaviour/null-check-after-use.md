---
id: ub-null-check-after-use
kind: basic
version: 1
level: 2
tags: [undefined-behaviour, optimisation]
requires:
  - ub-definition
  - types-signed-overflow-ub
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://timsong-cpp.github.io/cppwp/n4950/intro.abstract#5
---

## Compiled with `-O2`, this function has no null test left in it: it returns `*p` unconditionally. Why is the compiler allowed to delete the `if`?

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
behaviour never happens": every dereference or signed `+`
becomes a fact about its operands, and a check contradicting it is dead
code — the same contract that lets a signed loop counter skip overflow
checks. Test, then use.
