---
id: chunks-if-constexpr-dispatch
kind: chunk
version: 1
level: 3
tags: [idioms, templates]
requires:
  - const-constexpr-if-constexpr-discard
expose_ms: 10000
compile:
  harness: |
    int main() {
      return describe(1) == "integral 1" &&
                     describe(1.5) == "not integral"
                 ? 0
                 : 1;
    }
refs:
  - https://en.cppreference.com/w/cpp/language/if
  - https://en.cppreference.com/w/cpp/types/is_integral
---

```cpp
#include <type_traits>
#include <string>
template <typename T>
std::string describe(T value) {
  if constexpr (std::is_integral_v<T>) {
    return "integral " + std::to_string(value);
  } else {
    return "not integral";
  }
}
```

---

Compile-time branch dispatch inside a template: `if constexpr` discards
the untaken branch for each instantiation, so it is never instantiated.
For `double` an ordinary `if` would also compile, since `std::to_string`
has a `double` overload; the difference shows for a `T` like
`std::string`, where `std::to_string(value)` has no overload at all — an
ordinary `if` instantiates both branches and fails, `if constexpr` lets
`describe(std::string{})` compile.
