---
id: templates-concepts-vs-sfinae
kind: basic
version: 2
level: 3
tags: [templates, concepts]
requires:
  - cpp-essentials/templates-instantiation
  - cpp-essentials/tmpl-concept-error
refs:
  - https://en.cppreference.com/w/cpp/language/constraints#Partial_ordering_of_constraints
  - https://en.cppreference.com/w/cpp/language/sfinae
---

## With concepts, `f(-1)` picks #2. Written with `std::enable_if_t<cond, int> = 0` instead, the same two overloads make `f(-1)` ambiguous. Why the difference?

```cpp
template<std::integral T>        int f(T) { return 1; }  // #1
template<std::signed_integral T> int f(T) { return 2; }  // #2
```

---

**Constraints are partially ordered: `std::signed_integral` subsumes
`std::integral`, so #2 is more constrained and wins.**

`signed_integral<T>` is defined as `integral<T> && ...`, which the
compiler can see. An `enable_if` condition is just an expression inside a
type; the compiler cannot compare two of them, so both viable overloads
tie.
