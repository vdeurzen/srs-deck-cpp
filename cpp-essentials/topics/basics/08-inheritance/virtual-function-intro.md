---
id: virtual-function-intro
kind: basic
version: 1
level: 1
tags: [inheritance, virtual, dispatch, worked-example]
requires:
  - virtual-static-dynamic-type
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
  - https://eel.is/c++draft/class.virtual
---

```cpp
struct Animal { virtual int legs() { return 0; } };
struct Bird : public Animal { int legs() { return 2; } };

Bird b;
Animal& a = b;
int n = a.legs();
```

| row | `Animal::legs` is | `a` declared as | `a` refers to | runs, `n` |
| --- | --- | --- | --- | --- |
| 1 | plain | `Animal&` | a `Bird` | `Animal::legs`, 0 |
| 2 | `virtual` | `Animal&` | a `Bird` | `Bird::legs`, 2 |

## Only the word `virtual` differs between the rows. Why does row 2 run `Bird::legs`?

---

**`virtual` makes the call follow the object (a `Bird`), not `a`'s declared type.**

Without it, the compiler picks `Animal::legs` from the type it sees,
`Animal&`. With it, the choice is made at run time from the object `a`
refers to, and `Bird::legs` (same name and parameters) *overrides* the
base version.
