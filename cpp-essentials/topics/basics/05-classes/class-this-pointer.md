---
id: class-this-pointer
kind: basic
version: 1
level: 1
tags: [classes, member-functions, pointers]
requires:
  - class-struct-members
  - ptr-amp-and-star-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/this
  - https://eel.is/c++draft/expr.prim.this
elaborate: Where does `this` appear in your own member functions, explicitly or implicitly?
---

```cpp
struct Tally {
    int count;
    Tally* mark() { return this; }
};
Tally a, b;
Tally* p = a.mark();
p = b.mark();
```

## Inside the call `b.mark()`, what value does `this` hold?

---

**`&b`: `this` points to the object the member function was called on.**
Its type here is `Tally*`, and each call gets its own: inside `a.mark()`
it held `&a`. Every member function receives this pointer implicitly,
with no parameter written for it.
