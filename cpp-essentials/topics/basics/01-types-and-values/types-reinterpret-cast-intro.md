---
id: types-reinterpret-cast-intro
kind: basic
version: 1
level: 2
tags: [types, conversions, casts, pointers]
refs:
  - https://en.cppreference.com/w/cpp/language/reinterpret_cast
  - https://eel.is/c++draft/expr.reinterpret.cast#7
---

## After the second line, what does `bytes` point to?

```cpp
float f = 1.5f;
auto* bytes = reinterpret_cast<const unsigned char*>(&f);
```

---

**The first byte of `f` itself: the address is unchanged, only its
pointer type is new.** `reinterpret_cast` converts no value; it relabels
the address of a `float` as the address of `unsigned char`s. Reading
through a byte-type pointer like this one is allowed and shows `f`'s raw
bytes.
