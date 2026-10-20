---
id: class-default-member-init-intro
kind: basic
version: 1
level: 1
tags: [classes, constructors, initialization, foundations]
requires:
  - class-ctor-colon-part
elaborate: Say which members of a struct you have written could carry a default member initialiser, so that no constructor can forget them.
refs:
  - https://en.cppreference.com/w/cpp/language/data_members#Member_initialization
  - https://eel.is/c++draft/class.mem.general
---

```cpp
struct Retry {
    int limit = 3;
    int delay;
    Retry(int d) : delay(d) {}
};

Retry r(250);
```

## The constructor's list sets only `delay`. What value does `r.limit` start with?

---

**3: `= 3` is a default member initialiser, used when a constructor omits `limit`.**

The `= 3` belongs to the member's declaration, so every constructor whose
member initialiser list leaves `limit` out still starts it at 3. Without
it, `r.limit` would hold no reliable value.
