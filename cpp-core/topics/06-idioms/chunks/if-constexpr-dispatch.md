---
id: chunks-if-constexpr-dispatch
kind: chunk
version: 2
level: 3
tags: [idioms, templates]
requires:
  - const-constexpr-if-constexpr-discard
expose_ms: 8000
compile:
  harness: |
    #include <string_view>
    static_assert(length(42) == 1);
    static_assert(length(std::string_view{"abcd"}) == 4);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/if#Constexpr_if
  - https://eel.is/c++draft/stmt.if#2
---

```cpp
#include <type_traits>
template <typename T>
constexpr auto length(const T& x) {
  if constexpr (std::is_arithmetic_v<T>) return 1;
  else return x.size();
}
```

---

Compile-time dispatch inside one template: `if constexpr` on a type
trait, one branch per kind of `T`. The discarded branch is not
instantiated, which buys two things an ordinary `if` cannot: `x.size()`
never has to compile for `T = int`, and only the kept `return` deduces
the `auto` return type (`int` in one branch, `size_t` in the other would
otherwise clash). Without it you write a pair of overloads, or SFINAE.
