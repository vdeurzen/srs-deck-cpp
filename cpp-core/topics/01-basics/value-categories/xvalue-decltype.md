---
id: value-categories-xvalue-decltype
kind: code
version: 1
level: 2
tags: [value-categories]
input: chips
choices:
  c1: ["std::move(x)", "x", "x + 1", "int{x}", "static_cast<int&>(x)"]
compile:
  harness: |
    int main() {}
requires:
  - value-categories-std-move-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/decltype
  - https://en.cppreference.com/w/cpp/language/value_category
---

With double parentheses, `decltype((e))` reports `e`'s value category in
its reference type: one per primary category. Complete the assertion with
an expression involving `x` that makes it hold.

```cpp
#include <type_traits>
#include <utility>
int x = 0;
static_assert(std::is_same_v<decltype(( {{c1::std\::move(x)}} )), int&&>);
```

---

`std::move(x)` is a call returning `int&&`, and a function call returning
an rvalue reference is an **xvalue**: still `x` (identity), now
movable-from: `int&&`. Naming `x`, or casting it to `int&`, is an lvalue
(`int&`); `x + 1` and `int{x}` create new values with no identity, so they
are prvalues (plain `int`).
