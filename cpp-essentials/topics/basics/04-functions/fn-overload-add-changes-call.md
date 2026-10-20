---
id: fn-overload-add-changes-call
kind: code
version: 1
level: 3
tags: [functions, overloading, conversions]
input: chips
choices:
  c1: ["int", "unsigned", "long long"]
compile:
  harness: |
    constexpr char c = 'a';
    static_assert(show(c) == 2);
    static_assert(show(2.5) == 1);
    int main() {}
requires:
  - fn-overload-trace
  - constexpr-fn-static-assert
elaborate: Before adding an overload to a widely used function, how would you find which existing calls it might capture?
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution
  - https://eel.is/c++draft/over.ics.rank
---

Today `show(c)`, with a `char c`, calls `show(double)`. Complete the new
overload's parameter type so that the same call now picks it, while
`show(2.5)` still calls `show(double)`.

```cpp
constexpr int show(double) { return 1; }
constexpr int show({{c1::int}}) { return 2; }
```

---

**`int`: `char` → `int` is a promotion, which beats the conversion to `double`.**
So adding the overload silently moves an existing call. With `unsigned`
or `long long`, `char` reaches the new overload only by a conversion, the
same rank as `double`, so `show(c)` becomes ambiguous: widening alone is
not a promotion.
