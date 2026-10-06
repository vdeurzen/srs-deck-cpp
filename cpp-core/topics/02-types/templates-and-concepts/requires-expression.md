---
id: templates-requires-expression
kind: code
version: 1
level: 4
tags: [templates, concepts]
input: chips
choices:
  c1:
    ["std::convertible_to<std::size_t>", "std::same_as<void>", "std::integral", "std::floating_point"]
compile:
  harness: |
    // std::hash<int> returns std::size_t, which satisfies std::integral
    // just as happily as std::convertible_to<std::size_t>. Widget hashes
    // to a type that converts to std::size_t without being an integer, so
    // only the concept this card is really asking for accepts both.
    struct SizeLike {
        std::size_t value;
        operator std::size_t() const { return value; }
    };
    struct Widget {};
    template<>
    struct std::hash<Widget> {
        SizeLike operator()(const Widget&) const { return SizeLike{0}; }
    };
    static_assert(Hashable<int>);
    static_assert(Hashable<Widget>);
    int main() {}
requires:
  - templates-requires-clause
refs:
  - https://en.cppreference.com/w/cpp/language/requires
---

Complete the compound requirement so `Hashable<T>` also constrains what
`std::hash<T>{}(t)` returns, not just that the call is well-formed.

```cpp
#include <concepts>
#include <functional>
template<typename T>
concept Hashable = requires(T t) {
    { std::hash<T>{}(t) } -> {{c1::std\::convertible_to<std\::size_t>}};
};
```

---

`{ expr } -> Concept` is a **compound requirement**: `expr` must be
well-formed, and `Concept<decltype((expr))>` must hold. `std::hash<int>`
returns `std::size_t`, which is convertible to itself, so the constraint
holds; a return-type concept that `size_t` does not satisfy makes
`Hashable<int>` false even though the call itself compiles fine.

`std::integral` would also hold for `std::hash<int>`, but it asks for more
than the requirement needs: a hash that returns any type convertible to
`std::size_t` is still perfectly hashable.
