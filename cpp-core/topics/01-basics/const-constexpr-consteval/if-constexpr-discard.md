---
id: const-constexpr-if-constexpr-discard
kind: code
version: 1
level: 3
tags: [const-constexpr-consteval, templates]
input: chips
choices:
  c1: ["constexpr", "consteval", "constinit", "static"]
compile:
  harness: |
    static_assert(value_of(3) == 3);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/if#Constexpr_if
---

Complete the `if` so the untaken branch is **discarded** rather than merely
skipped, letting `value_of` compile for a non-pointer `T` even though
`*t` would be ill-formed there.

```cpp
#include <type_traits>
template<typename T>
constexpr auto value_of(T t) {
    if {{c1::constexpr}} (std::is_pointer_v<T>) {
        return *t;
    } else {
        return t;
    }
}
```

---

An ordinary `if` still type-checks both branches of a template body at
instantiation time; only `if constexpr` removes the untaken branch from
instantiation (a *discarded statement*), so `*t` is never instantiated
for `T = int` — it is still parsed, so it must be syntactically valid. This is
why `if constexpr` is the standard way to branch on a compile-time trait
inside a template without SFINAE.
