---
id: templates-two-phase-lookup
kind: basic
version: 2
level: 3
tags: [templates, lookup]
requires:
  - templates-instantiation
refs:
  - https://en.cppreference.com/w/cpp/language/dependent_name#Binding_rules
  - https://eel.is/c++draft/temp.res
---

## Neither `log_event` nor `flush` is declared anywhere, and `notify` is never called. Why is only `log_event()` an error?

```cpp
template<class T>
void notify(T t) {
    log_event();   // error: no declaration available
    t.flush();     // accepted
}
```

---

**`log_event()` is a non-dependent name, looked up at the template's
definition; `t.flush()` depends on `T`, so its lookup waits for
instantiation.**

This is two-phase lookup. A dependent name can mean something different
for every `T`, so it can only be resolved once `T` is known.
