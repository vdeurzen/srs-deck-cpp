---
id: spaceship-reversed-candidate
kind: basic
version: 1
level: 3
tags: [comparisons, operators]
requires:
  - spaceship-basics
  - operators-member-vs-free
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Call_to_an_overloaded_operator
  - https://eel.is/c++draft/over.match.oper
---

## `Version` converts implicitly from `int` and has a **member** `operator<=>`. Why does `2 < v` compile, when a member `operator+` would reject `2 + v`?

```cpp
struct Version {
    int n;
    Version(int n) : n(n) {}
    auto operator<=>(const Version&) const = default;
};
```

---

**`2 < v` may be rewritten as `0 < (v <=> 2)`: in that reversed candidate
`v` is the left operand.**

For `<`, `<=`, `>`, `>=`, `==` and `!=`, the compiler also considers
`<=>` (or `==`) with the operands swapped. Arithmetic operators get no
rewritten candidates, so `+` still needs a non-member.
