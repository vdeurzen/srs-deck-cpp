---
id: err-unwind-worked
kind: basic
version: 1
level: 2
tags: [exceptions, destructors, worked-example]
requires:
  - err-throw-catch-intro
  - life-destructor-intro
  - string-basics
refs:
  - https://eel.is/c++draft/except.ctor
  - https://en.cppreference.com/w/cpp/language/throw
---

`std::runtime_error` is a standard exception type.

```cpp
std::string trail;
struct Lock {
    Lock()  { trail += 'L'; }
    ~Lock() { trail += 'U'; }
};
void update() {
    Lock k;
    throw std::runtime_error("bad row");
}

try { update(); }
catch (const std::runtime_error&) { trail += '!'; }
```

| step | what happens | `trail` |
| --- | --- | --- |
| 1 | `Lock k;`: constructor runs | `L` |
| 2 | `throw`: rest of `update` abandoned | `L` |
| 3 | `k` destroyed: `~Lock` runs | `LU` |
| 4 | matching `catch` body runs | `LU!` |

## Why does `~Lock` run at step 3, before the handler body at step 4?

---

**Leaving `update` by exception ends `k`'s lifetime, so its destructor runs first.**

The exception leaves `update`'s scope on its way to the handler, and
leaving a scope ends its locals' lifetimes. This *stack unwinding*
destroys every fully constructed local between `throw` and handler
before the handler body starts.
