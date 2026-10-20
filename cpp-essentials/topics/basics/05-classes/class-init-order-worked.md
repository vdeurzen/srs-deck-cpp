---
id: class-init-order-worked
kind: basic
version: 1
level: 2
tags: [classes, constructors, initialization, worked-example]
requires:
  - class-member-at-body-start
refs:
  - https://en.cppreference.com/w/cpp/language/constructor#Explanation
  - https://eel.is/c++draft/class.base.init#9
---

## Building `InBody b;` and `InList l;`

```cpp
struct Speed { int kmh; Speed() : kmh(50) {} Speed(int k) : kmh(k) {} };
struct InBody { Speed s; InBody() { s = Speed(90); } };
struct InList { Speed s; InList() : s(90) {} };
```

| step | what runs | `s.kmh` |
| --- | --- | --- |
| `b`: member built | `Speed()`, no list entry | 50 |
| `b`: body starts | `s` already exists | 50 |
| `b`: body | nameless `Speed(90)` built | 50 |
| `b`: assignment | nameless one copied into `s` | 90 |
| `l`: member built | `Speed(90)`, from the list | 90 |

Why does `b`'s first row run `Speed()`, though `InBody`'s code never asks for it?

---

**Every member is built before the body runs; with no list entry, by its default constructor.**

The body cannot be where `s` is created, because `s` must exist for
`s = ...` to assign to it. So `InBody` builds a `Speed` twice; `InList`
names the value in its list and builds `s` once.
