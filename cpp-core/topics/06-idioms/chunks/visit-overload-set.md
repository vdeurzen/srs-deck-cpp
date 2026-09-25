---
id: chunks-visit-overload-set
kind: chunk
version: 1
level: 4
tags: [idioms, variant]
expose_ms: 9000
compile:
  harness: |
    #include <variant>
    int main() {
      std::variant<int, double> v = 3.5;
      auto r = std::visit(overloaded{
        [](int i) { return i; },
        [](double d) { return static_cast<int>(d); },
      }, v);
      return r == 3 ? 0 : 1;
    }
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
ordinary overload resolution.
