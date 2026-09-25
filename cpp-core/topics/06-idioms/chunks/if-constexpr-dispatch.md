---
id: chunks-if-constexpr-dispatch
kind: chunk
version: 1
level: 3
tags: [idioms, templates]
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
the untaken branch entirely for each instantiation, so `describe<double>`
never has to compile `std::to_string(value)` against a `double`-shaped
call it does not need — an ordinary `if` would have to compile both
branches for every `T`.
