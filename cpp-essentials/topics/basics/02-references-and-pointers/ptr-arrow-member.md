---
id: ptr-arrow-member
kind: basic
version: 1
level: 1
tags: [pointers, operators, members]
requires:
  - ptr-amp-and-star-cloze
  - class-struct-members
elaborate: Go writes `r.h` for a pointer `r` too. Say what C++ gains or loses by making you write `->` instead.
refs:
  - https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_member_access_operators
  - https://eel.is/c++draft/expr.ref#2
---

```cpp
struct Rect { int w, h; };
Rect box{3, 4};
Rect* r = &box;
int b = r->h;
```

## `r` is a `Rect*`. Spell `r->h` using only `*` and `.` instead.

---

**`(*r).h`: `p->m` is shorthand for `(*p).m`.**

The parentheses matter: `.` binds tighter than `*`, so `*r.h` means
`*(r.h)`, which fails because a pointer has no members. Go's `r.h`
dereferences for you; C++ spells that step `->`.
