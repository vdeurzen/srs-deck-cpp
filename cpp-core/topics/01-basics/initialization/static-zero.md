---
id: initialization-static-zero
kind: basic
version: 1
level: 2
tags: [initialization, storage-duration]
requires:
  - initialization-default-value-zero
refs:
  - https://en.cppreference.com/w/cpp/language/zero_initialization
  - https://timsong-cpp.github.io/cppwp/n4950/basic.start.static#2
---

## What does the first call to `next_id()` return?

```cpp
int next_id() {
    static int last;
    return ++last;
}
```

---

**`1`: `last` starts at `0`.** Unlike a plain local, a variable with
*static* storage duration is zero-initialized before any other
initialization, so "no initializer" still means zero. Namespace-scope and
`thread_local` variables get the same guarantee; only automatic (and
`new`ed) scalars are left indeterminate.
