---
id: transfer-null-member-call
kind: basic
version: 1
level: 3
tags: [transfer, misconception, pointers]
requires:
  - transfer-nil-vs-nullptr-optional
  - ub-null-check-after-use
elaborate: Where in your own code does a member function begin with `if (this == nullptr)`, or get called on a pointer that might be null, and what would the optimiser do to that check?
refs:
  - https://en.cppreference.com/w/cpp/language/member_functions
  - https://en.cppreference.com/w/cpp/language/ub
---

## In Go, calling `p.Name()` on a nil `*Cfg` is safe when `Name` never reads its receiver. What happens to this C++ call?

```cpp
struct Cfg {
    const char* name() const { return "cfg"; }
};
Cfg* p = nullptr;
const char* n = p->name();
```

---

**Undefined behaviour at the call itself, though the body never
touches `this`.**

It often "works", which is why the Go habit survives. But `p->name()`
means `(*p).name()`, and the compiler may assume `this` is non-null: a
later `if (p)` can be deleted.
