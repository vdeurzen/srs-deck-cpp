---
id: life-misconception-equals-assigns
kind: basic
version: 1
level: 2
tags: [lifetime, copy, special-members, misconception]
requires:
  - life-copy-init-not-assign
elaborate: In your own code, find a declaration with `=` whose type has an expensive or deleted copy constructor. Which special member does that line really call?
refs:
  - https://en.cppreference.com/w/cpp/language/copy_initialization
  - https://en.cppreference.com/w/cpp/language/copy_constructor
---

## `Gauge` can be copy-assigned but not copy-constructed. The last line has an `=`, so it should use the assignment operator. What happens?

```cpp
struct Gauge {
  Gauge() = default;
  Gauge(const Gauge&) = delete;
  Gauge& operator=(const Gauge&) = default;
};
Gauge a;
Gauge b = a;
```

---

**Compile error: "use of deleted function `Gauge(const Gauge&)`".** A
declaration with `=` is *copy-initialisation*: it creates `b`, so only
constructors are candidates. `operator=` is never considered, because
it needs an object that already exists. Writing `Gauge b; b = a;`
would compile.
