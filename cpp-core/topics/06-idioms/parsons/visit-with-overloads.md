---
id: parsons-visit-with-overloads
kind: parsons
version: 2
level: 4
tags: [idioms, variant]
requires:
  - chunks-visit-overload-set
compile:
  harness: |
    static_assert(is_whole(3));
    static_assert(is_whole(2.0));
    static_assert(!is_whole(2.5));
    int main() {}
elaborate: Say in one sentence, as to an interviewer, what the compiler does when a new alternative is added to the `variant` and no lambda accepts it.
refs:
  - https://en.cppreference.com/w/cpp/utility/variant/visit
---

`is_whole` reports whether the number in a `std::variant<int, double>`
has no fractional part. Order the lines so it visits the variant with an
overload set of one lambda per alternative.

```cpp
#include <variant>
template <typename... Ts> struct overloaded : Ts... { using Ts::operator()...; };
constexpr bool is_whole(const std::variant<int, double>& v) {
  return std::visit(overloaded{
    [](int) { return true; }, [](double d) { return d == static_cast<int>(d); },
  }, v);
}
```

---

**Define the overload set, then hand `std::visit` one built from a
brace list of lambdas.** That gives one
lambda per alternative of the `variant`, chosen by ordinary overload
resolution rather than a chain of `if (std::holds_alternative<...>(v))`
checks — and unlike that chain, the compiler rejects it outright if a new
alternative is added to the `variant` and no lambda accepts it (beware: an
existing lambda can silently accept it by implicit conversion, as
`[](int)` would a `double`).
No deduction guide is needed: since C++20, aggregate class template
argument deduction builds `overloaded{...}` from the lambdas.
