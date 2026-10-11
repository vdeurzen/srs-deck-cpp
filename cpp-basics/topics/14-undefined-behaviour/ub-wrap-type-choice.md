---
id: ub-wrap-type-choice
kind: code
version: 1
level: 2
tags: [undefined-behaviour, integers, constexpr]
requires:
  - ub-signed-overflow-no-wrap
  - ub-static-assert-finds-ub
input: chips
choices:
  c1: ["std::uint32_t", "std::int32_t", "long long"]
compile:
  harness: |
    static_assert(hash("") == 7);
    constexpr Hash key = hash("the quick brown fox");
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Overflows
  - https://en.cppreference.com/w/cpp/language/constant_expression
---

`hash` must be a stable 32-bit hash, the same value on every platform,
and `key` is computed at compile time. Choose `Hash`.

```cpp
#include <cstdint>
using Hash = {{c1::std\::uint32_t}};
constexpr Hash hash(const char* s) {
    Hash h = 7;
    for (; *s != '\0'; ++s) h = h * 31 + *s;
    return h;
}
```

---

`std::uint32_t` is exactly 32 bits and unsigned, so `h * 31` wraps
modulo 2³²: defined, and identical everywhere. With `std::int32_t` it
overflows after a handful of characters: undefined behaviour, which
constant evaluation rejects (`overflow in constant expression`).
`long long` only postpones it: 19 characters overflow 64 bits too.
