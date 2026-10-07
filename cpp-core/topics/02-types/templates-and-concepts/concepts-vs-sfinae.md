---
id: templates-concepts-vs-sfinae
kind: basic
version: 2
level: 3
tags: [templates, concepts]
requires:
  - templates-instantiation
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
  - https://en.cppreference.com/w/cpp/language/sfinae
---

## A caller writes `half(2.5)`. What does the C++20 declaration's error tell them that the `enable_if` one could not?

```cpp
// before C++20
template<class T, class = std::enable_if_t<std::is_integral_v<T>>>
T half(T x);

// C++20
template<std::integral T>
T half(T x);
```

---

**The name of the unsatisfied constraint, `std::integral<double>`,
instead of a substitution failure inside `enable_if`.**

SFINAE removes the overload as a side effect of failed substitution, so
the compiler can only report that `enable_if<false>` has no `type`. A
concept is a named predicate, so the error, and the declaration, say what
was required.
