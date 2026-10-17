---
id: err-noexcept-broken-promise
kind: basic
version: 1
level: 2
tags: [exceptions, noexcept]
requires:
  - err-no-handler-terminates
refs:
  - https://en.cppreference.com/w/cpp/language/noexcept_spec
  - https://eel.is/c++draft/except.spec
---

## The compiler accepts this, although `log` may throw. What happens at run time if it does?

```cpp
void reset_cache() noexcept {
    cache.clear();
    log("cache reset");
}
```

---

**`std::terminate` is called; no caller's `catch` ever sees the
exception.** `noexcept` is a promise the compiler does not verify. Callers
and the standard library (`std::vector` deciding whether to move its
elements) rely on it, so breaking it ends the program instead of
propagating.
