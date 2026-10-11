---
id: vc-address-of-operand
kind: code
version: 1
level: 1
tags: [value-categories, pointers]
requires:
  - vc-classify-cloze
  - ptr-array-name-to-pointer
input: chips
choices:
  c1: ["marks[2]", "marks + 2", "marks[0] + 2", "90"]
compile:
  harness: |
    static_assert(*best == 90);
    int main() {}
refs:
  - https://eel.is/c++draft/expr.unary.op#3
  - https://en.cppreference.com/w/cpp/language/operator_member_access#Built-in_address-of_operator
---

Make `best` point at the last element of `marks`.

```cpp
constexpr int marks[3] = {70, 85, 90};
constexpr const int* best = &( {{c1::marks[2]}} );
```

---

Built-in `&` accepts only an **lvalue**: an expression that denotes an
object. `marks[2]` is that object. `marks + 2` already *is* a pointer to
it, but it is a computed prvalue, so `&(marks + 2)` is an error (and
would be a pointer to a pointer anyway). `marks[0] + 2` and `90` are
plain `int` prvalues: values with no object behind them, nothing to take
the address of.
