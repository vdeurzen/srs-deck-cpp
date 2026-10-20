---
id: initialization-aggregate-braces
kind: code
version: 1
level: 1
tags: [initialization]
input: chips
choices:
  c1: ["2, 1", "1, 2", "1", "1, 2, 3"]
compile:
  harness: |
    static_assert(p.col == 1 && p.row == 2);
    int main() {}
requires:
  - class-struct-vs-class
  - const-vs-constexpr-initializer
elaborate: Say aloud what silently changes for every brace-initialized `Cell` if someone swaps the order of `row` and `col` in the struct.
refs:
  - https://en.cppreference.com/w/cpp/language/aggregate_initialization
---

Complete the aggregate-initialization so `p.col` is `1` and `p.row` is `2`.

```cpp
struct Cell { int row; int col; };
constexpr Cell p{ {{c1::2, 1}} };
```

---

`Cell` has no user-declared constructors, so it is an aggregate: braces
initialize its members in declaration order, positionally. `row` is
declared first, so the first value goes to `row`, whatever order the
question names them in. `{1}` sets `row` and value-initializes `col` to
`0`; `{1, 2, 3}` has more values than members and is ill-formed.
