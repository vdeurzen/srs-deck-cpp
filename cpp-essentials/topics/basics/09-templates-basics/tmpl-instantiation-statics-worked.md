---
id: tmpl-instantiation-statics-worked
kind: basic
version: 1
level: 2
tags: [templates, instantiation, worked-example]
requires:
  - templates-instantiation
  - life-function-local-static
  - tmpl-deduction-conflict
refs:
  - https://en.cppreference.com/w/cpp/language/function_template#Implicit_instantiation
  - https://en.cppreference.com/w/cpp/language/storage_duration#Static_block_variables
---

`seen(T)` names no parameter: the argument is ignored, only its type matters.

```cpp
template <typename T>
int seen(T) { static int n = 0; return ++n; }

int x = seen(2.5);
int y = seen(7);
int z = seen(1.5);
```

| call | `T` | which `n` | returns |
| --- | --- | --- | --- |
| `seen(2.5)` | `double` | `seen<double>`'s | 1 |
| `seen(7)` | `int` | `seen<int>`'s | 1 |
| `seen(1.5)` | `double` | `seen<double>`'s | 2 |

## Why does `seen(7)` return 1, not 2?

---

**`seen(7)` deduces `T = int`: a separate function with its own `n`.**

Each distinct `T` instantiates its own function from the template, and
each of those functions has its own `static` local. `seen(1.5)` reuses
`seen<double>`, so that `n` reaches 2.
