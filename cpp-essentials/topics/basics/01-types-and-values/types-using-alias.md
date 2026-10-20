---
id: types-using-alias
kind: basic
version: 1
level: 1
tags: [types, aliases]
refs:
  - https://en.cppreference.com/w/cpp/language/type_alias
  - https://eel.is/c++draft/dcl.typedef
---

## Does the last line need any conversion from `Score` to `int`?

```cpp
using Score = int;
Score s = 5;
int t = s;
```

---

**No: `using Score = int;` gives `int` a second name, not a new type.**

`Score` and `int` are the same type, so `t = s` is a plain copy, and an
`int` is accepted anywhere a `Score` is. The point is shorter or clearer
names for long types; it gives no type safety.
