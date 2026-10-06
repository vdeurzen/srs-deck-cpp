---
id: class-invariant-constructor
kind: basic
version: 1
level: 1
tags: [classes, invariants]
refs:
  - https://en.cppreference.com/w/cpp/language/access
  - https://en.cppreference.com/w/cpp/language/constructor
elaborate: Pick a type in your own code with public fields. Which combination of field values would be a bug, and who could currently create it?
---

## Why can't `private` alone guarantee `den_ != 0` here?

```cpp
class Fraction {
    int num_ = 0, den_ = 0;
public:
    void set(int n, int d);   // checks d != 0
};
Fraction f;   // already invalid
```

---

**Nothing checks the object at creation; only a constructor can establish the invariant.**

`private` stops later code from breaking the invariant, but `f` starts out
broken. A constructor that rejects `d == 0` makes every `Fraction` valid
from birth; `private` then keeps it valid, so only members need checking.
