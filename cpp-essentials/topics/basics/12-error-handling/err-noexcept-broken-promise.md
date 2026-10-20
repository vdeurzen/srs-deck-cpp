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
elaborate: Name a function in your own code you would mark `noexcept`, and say what you would have to check before you could promise it.
---

`noexcept` after a function's parameters promises it never throws.

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
and the standard library rely on it and skip handling an exception, so
breaking it ends the program instead of propagating.
