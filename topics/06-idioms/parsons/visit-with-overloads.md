---
id: parsons-visit-with-overloads
kind: parsons
version: 1
level: 4
tags: [idioms, variant]
compile:
  harness: |
    int main() {
      std::variant<int, std::string> a = 42;
      std::variant<int, std::string> b = std::string("hi");
      return describe(a) == "int:42" && describe(b) == "string:hi" ? 0 : 1;
    }
refs:
  - https://en.cppreference.com/w/cpp/utility/variant/visit
---

```cpp
#include <variant>
#include <string>
template <typename... Ts>
struct overloaded : Ts... {
  using Ts::operator()...;
};
template <typename... Ts>
overloaded(Ts...) -> overloaded<Ts...>;
std::string describe(const std::variant<int, std::string>& v) {
  return std::visit(overloaded{
    [](int i) { return "int:" + std::to_string(i); },
    [](const std::string& s) { return "string:" + s; },
  }, v);
}
```

---

`describe` reaches for the overload-set idiom to give `std::visit` one
lambda per alternative of the `variant`, chosen by ordinary overload
resolution rather than a chain of `if (std::holds_alternative<...>(v))`
checks — and unlike that chain, the compiler rejects it outright if a new
alternative is added to the `variant` and no lambda covers it.
