---
id: virtual-static-dispatch
kind: basic
version: 1
level: 2
tags: [inheritance, virtual]
requires:
  - virtual-static-dynamic-type
  - virtual-function-intro
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
  - https://eel.is/c++draft/class.virtual#16
elaborate: Where does your own code call a base-class version from inside an override, and what would happen if the qualification were dropped?
---

## `strings` is virtual and `ins` refers to a `Violin`. Why is `n` 0, not 4?

```cpp
struct Instrument {
    virtual int strings() { return 0; }
};
struct Violin : Instrument { int strings() { return 4; } };
Violin v;
Instrument& ins = v;
int n = ins.Instrument::strings();
```

---

**The qualified name `Instrument::strings` suppresses virtual dispatch: the call
binds statically to exactly that function.**

The qualifier picks the function at compile time,
whatever object `ins` refers to. That is how an override calls its base
version: inside `Violin::strings`, a plain `strings()` would call itself
forever; `Instrument::strings()` reaches the base.
