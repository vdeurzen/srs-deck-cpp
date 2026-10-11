---
id: life-delete-matches-new
kind: basic
version: 1
level: 1
tags: [lifetime, new-delete]
requires:
  - life-new-outlives-scope
refs:
  - https://en.cppreference.com/w/cpp/language/delete
  - https://eel.is/c++draft/expr.delete#2
---

## Both pointers came from `new`. Which `delete` expression must release each one?

```cpp
int* one  = new int{5};
int* many = new int[5]{};
```

---

**`delete one;` and `delete[] many;`.** The form must match the
allocation: `new` pairs with `delete`, `new T[n]` with `delete[]`. The
pointer's type (`int*` for both) cannot tell them apart, so you have to.
`delete[]` destroys every element and frees the whole block; mixing the
forms is undefined behaviour.
