---
id: virtual-construct-order-worked
kind: basic
version: 1
level: 1
tags: [inheritance, constructors, destructors, worked-example]
requires:
  - virtual-is-a
  - life-destructor-intro
  - string-basics
refs:
  - https://en.cppreference.com/w/cpp/language/constructor#Explanation
  - https://en.cppreference.com/w/cpp/language/destructor#Destruction_sequence
---

```cpp
std::string out;
struct Widget {
  Widget()  { out += 'W'; }
  ~Widget() { out += "~W"; }
};
struct Button : public Widget {
  Button()  { out += 'B'; }
  ~Button() { out += "~B"; }
};
{ Button b; }
```

| step | body that runs | `out` after |
| --- | --- | --- |
| 1 `Button b;` | `Widget()` | `W` |
| 2 | `Button()` | `WB` |
| 3 `}` | `~Button()` | `WB~B` |
| 4 | `~Widget()` | `WB~B~W` |

## Why does `Widget()` run (row 1) before `Button()`'s body?

---

**A `Button` contains a `Widget` base subobject, which must exist before `Button()`'s body runs.**

The derived body may use its base part, so the base is built first.
Destruction mirrors it: `~Button()` runs while the `Widget` part still
exists, and that part is destroyed last (rows 3 and 4).
