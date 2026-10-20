---
id: types-using-alias
kind: basic
version: 2
level: 1
tags: [types, aliases]
refs:
  - https://en.cppreference.com/w/cpp/language/type_alias
  - https://eel.is/c++draft/dcl.typedef
---

## Two functions may share a name if their parameter types differ. Exactly one line here fails to compile. Which one?

```cpp
using Score = int;
void show(int n) {}
void show(Score s) {}
void show(double d) {}
Score total = 5;
```

---

**`void show(Score s) {}`: `Score` is a second name for `int`, not a new type.**

So it repeats the definition of `show(int)`. `show(double)` differs, and
`total` is a plain `int`. An alias gives long types shorter or clearer
names; it gives no type safety.
