---
id: types-auto-drops-const
kind: code
version: 1
level: 2
tags: [types, auto, const]
input: chips
choices:
  c1: ["auto", "const auto", "auto&", "const auto&"]
compile:
  harness: |
    static_assert(countdown() == 6);
    int main() {}
requires:
  - types-auto-deduces
  - ptr-reference-must-bind
  - constexpr-fn-static-assert
elaborate: Where in your code could `auto x = some_const_value;` hand you a copy when you meant to keep the original's `const`, or a reference?
refs:
  - https://en.cppreference.com/w/cpp/language/auto
  - https://eel.is/c++draft/dcl.type.auto.deduct
---

Complete the declaration of `left` so that `countdown()` compiles and
returns `6`.

```cpp
constexpr int countdown() {
  const int limit = 3;
  {{c1::auto}} left = limit;
  int steps = 0;
  while (left > 0) { --left; ++steps; }
  return steps + limit;
}
```

---

**Plain `auto` drops the `const` on `limit` itself, so `left` is a modifiable `int` copy.**

That `const` belongs to the object being copied, not to the new one, so
`auto` leaves it behind. `const auto` keeps it; `auto&` and `const auto&`
make `left` another name for `limit`, which is `const`, so `--left` fails
in all three.
