---
id: types-enum-to-underlying
kind: code
version: 1
level: 2
tags: [types, enums, conversions, c++23]
input: chips
choices:
  c1: ["std::to_underlying(code)", "static_cast<int>(code)", "code", "int{code}"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_same_v<decltype(wire), const unsigned char>,
                  "wire must have the enum's own underlying type");
    int main() {}
requires:
  - types-enum-class
  - cpp-basics/types-enum-fixed-underlying
refs:
  - https://en.cppreference.com/w/cpp/utility/to_underlying
  - https://en.cppreference.com/w/cpp/utility/intcmp
---

The wire format needs the number behind a scoped enumerator, in exactly
the type the enum is declared with. Complete the initializer.

```cpp
#include <utility>
enum class Status : unsigned char { ok, retry, fail };
constexpr Status code = Status::fail;
constexpr auto wire = {{c1::std\::to_underlying(code)}};
static_assert(std::cmp_equal(wire, 2));
```

---

Because `enum class` refuses implicit conversion, getting the number out
is an explicit step. `std::to_underlying` (C++23) converts to exactly the
declared underlying type (`unsigned char` here), which a hand-written
`static_cast<int>` would silently disagree with if someone changed the
`: unsigned char`; here `wire` would become an `int`. `code` leaves `wire`
a `Status`, which `std::cmp_equal` rejects, and `int{code}` asks for the
implicit conversion that does not exist.
