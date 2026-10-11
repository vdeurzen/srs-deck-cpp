---
id: vc-assign-to-call
kind: code
version: 1
level: 2
tags: [value-categories, references, functions]
requires:
  - vc-classify-cloze
  - ptr-bump-by-reference
input: chips
choices:
  c1: ["int&", "int", "const int&", "auto"]
compile:
  harness: |
    constexpr int store() {
      int cells[3] = {};
      slot(cells, 1) = 7;
      return cells[1];
    }
    static_assert(store() == 7);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/value_category#lvalue
  - https://eel.is/c++draft/expr.call#15
---

The caller writes `slot(cells, 1) = 7;` and expects `cells[1]` to become
7. Complete the return type.

```cpp
constexpr {{c1::int&}} slot(int* cells, int i) {
  return cells[i];
}
```

---

A call's value category comes from its return type. Returning `int&`
makes `slot(cells, 1)` an **lvalue** that denotes `cells[1]`, so the
assignment writes there. Returning `int` (or `auto`, which deduces `int`)
makes the call a prvalue, a copied value with no object behind it, and
assigning to a prvalue `int` does not compile. `const int&` is an lvalue
too, but read-only.
