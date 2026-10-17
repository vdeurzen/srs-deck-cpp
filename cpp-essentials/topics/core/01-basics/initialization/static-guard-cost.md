---
id: initialization-static-guard-cost
kind: basic
version: 1
level: 3
tags: [initialization, concurrency, performance]
requires:
  - initialization-magic-statics
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration#Static_local_variables
  - https://itanium-cxx-abi.github.io/cxx-abi/abi.html#once-ctor
---

## `Widget` has a non-`constexpr` constructor. After the first call to `instance()`, what does every later call still pay?

```cpp
Widget& instance() {
    static Widget w;
    return w;
}
```

---

**A check of a hidden guard variable: "already initialized?"** Dynamic
initialization must run once and thread-safely, so the compiler emits
the check (Itanium ABI: an acquire load; `__cxa_guard_acquire` only on the
slow path). A constant-initialized `static` needs no guard.
