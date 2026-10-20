---
id: class-struct-members
kind: basic
version: 1
level: 1
tags: [classes, members]
refs:
  - https://en.cppreference.com/w/cpp/language/member_functions
  - https://eel.is/c++draft/class.mfct.non.static
---

## `Rect r{2, 3}` sets `w` and `h` in declaration order. What does `r.area()` return?

```cpp
struct Rect {
    int w;
    int h;
    int area() { return w * h; }
};

Rect r{2, 3};
r.w = 5;
```

---

**15: a member function reads the members of the object it is called on.**

Called as `r.area()`, its `w` and `h` mean `r.w` and `r.h` at the moment
of the call, after `w` became 5. Every `Rect` has its own `w` and `h`:
it is Go's method with a receiver, written inside the struct.
