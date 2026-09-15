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
    static_assert(Hashable<int>);
    int main() {}
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
    { std::hash<T>{}(t) } -> {{c1::std::convertible_to<std::size_t>}};
};
```

---

`{ expr } -> Concept` is a **compound requirement**: `expr` must be
well-formed, and `Concept<decltype((expr))>` must hold. `std::hash<int>`
returns `std::size_t`, which is convertible to itself, so the constraint
holds; a return-type concept that `size_t` does not satisfy makes
`Hashable<int>` false even though the call itself compiles fine.
