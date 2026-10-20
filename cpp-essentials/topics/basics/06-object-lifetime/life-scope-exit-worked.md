---
id: life-scope-exit-worked
kind: basic
version: 1
level: 2
tags: [lifetime, scope, destructors, worked-example]
requires:
  - life-destructor-intro
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration#Automatic_storage_duration
  - https://en.cppreference.com/w/cpp/language/destructor
---

## `alive` counts the `Cell`s that exist. Each step of `main` below:

```cpp
int alive = 0;
struct Cell {
  Cell()  { ++alive; }
  ~Cell() { --alive; }
};
void use() { Cell t; }
int main() { Cell a; use(); }
```

| step | alive | why |
| --- | --- | --- |
| `Cell a;` in `main` | 1 | `a` constructed |
| `use()` runs `Cell t;` | 2 | `t` constructed |
| `use`'s `}` | 1 | `t` destroyed |
| `main`'s `}` | 0 | `a` destroyed |

Why is `t` destroyed at row 3, while `main` is still running?

---

**A local dies at the closing brace of its own block: `use`'s body.**

`t` belongs to `use`, so leaving `use` ends it and runs its destructor,
whatever its caller does next. `a` belongs to `main`'s block, so only
`main`'s `}` destroys it.
