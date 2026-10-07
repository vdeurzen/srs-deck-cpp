---
id: chunks-visit-overload-set
kind: chunk
version: 1
level: 4
tags: [idioms, variant]
requires:
  - templates-deduction-guide
  - variadic-expansion-placement
expose_ms: 9000
compile:
  harness: |
    #include <variant>
    constexpr int pick(std::variant<int, double> v) {
      return std::visit(overloaded{
        [](int i) { return i; },
        [](double d) { return static_cast<int>(d) * 10; },
      }, v);
    }
    static_assert(pick(3.5) == 30);
    static_assert(pick(4) == 4);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/utility/variant/visit
---

```cpp
template <typename... Ts>
struct overloaded : Ts... {
  using Ts::operator()...;
};
template <typename... Ts>
overloaded(Ts...) -> overloaded<Ts...>;
```

---

The overload-set idiom for `std::visit`: multiply inherit from a pack of
lambdas, pull all their `operator()`s into one overload set with a
`using`-pack declaration, and let a deduction guide build one from a brace
list of lambdas at the call site. `std::visit(overloaded{...}, v)` then
reads like a `match` expression — one case per alternative, picked by
ordinary overload resolution. The bug it prevents: an `if`/`holds_alternative`
chain that silently ignores a newly added alternative. Since C++20,
aggregate CTAD deduces `overloaded{...}` without the guide (GCC 14 does);
the guide is kept because C++17 code needs it and you will read it.
