---
id: templates-requires-expression
kind: code
version: 1
level: 4
tags: [templates, concepts]
input: chips
choices:
  c1:
    ["std::convertible_to<std::size_t>", "std::same_as<std::size_t>", "std::integral", "std::same_as<void>"]
compile:
  harness: |
    struct SizeLike {
        std::size_t v;
        constexpr operator std::size_t() const { return v; }
    };
    struct Exact  { std::size_t hash() const; };
    struct Proxy  { SizeLike hash() const; };
    struct Silent { void hash() const; };
    static_assert(Hashable<Exact>);
    static_assert(Hashable<Proxy>);
    static_assert(!Hashable<Silent>);
    int main() {}
requires:
  - templates-requires-clause
refs:
  - https://en.cppreference.com/w/cpp/language/requires#Compound_requirements
---

`Hashable<T>` already checks that `t.hash()` is a valid call. Complete the
compound requirement so it also constrains what the call returns: a
`std::size_t`, or a small wrapper struct with an `operator std::size_t()`,
as some hashers return.

```cpp
#include <concepts>
#include <cstddef>
template<typename T>
concept Hashable = requires(const T& t) {
    { t.hash() } -> {{c1::std\::convertible_to<std\::size_t>}};
};
```

---

`{ expr } -> C` is a **compound requirement**: `expr` must be well-formed,
and `C<decltype((expr))>` must hold, with the expression's type inserted
as the concept's first argument. A `void` result fails it, which a plain
`t.hash();` requirement would accept. `std::integral` and
`std::same_as<std::size_t>` ask too much: both reject a wrapper whose
result converts to `std::size_t` without being one.
