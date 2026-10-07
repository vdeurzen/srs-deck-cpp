---
id: templates-concept-subsumption
kind: basic
version: 1
level: 4
tags: [templates, concepts, overload-resolution]
requires:
  - templates-requires-clause
refs:
  - https://en.cppreference.com/w/cpp/language/constraints#Partial_ordering_of_constraints
  - https://en.cppreference.com/w/cpp/concepts/signed_integral
---

## `kind(-1)` satisfies both constraints. Why is the call not ambiguous?

```cpp
template<std::integral T>        int kind(T) { return 1; }
template<std::signed_integral T> int kind(T) { return 2; }
```

---

**`std::signed_integral<T>` is defined as `std::integral<T> && …`, so it
subsumes `std::integral<T>`: the more constrained overload wins.**

When two candidates otherwise tie, overload resolution compares their
constraints; one that implies the other is more specialised. `kind(1u)`
satisfies only the first.
