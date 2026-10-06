---
id: types-enum-to-underlying
kind: code
version: 1
level: 2
tags: [types, enums, conversions, c++23]
input: chips
choices:
  c1: ["std::to_underlying(code)", "code", "int{code}"]
compile:
  harness: |
    static_assert(wire == 2);
    int main() {}
requires:
  - types-enum-class
refs:
  - https://en.cppreference.com/w/cpp/utility/to_underlying
---

The wire format needs the number behind a scoped enumerator. Complete the
initializer.

```cpp
#include <utility>
enum class Status : unsigned char { ok, retry, fail };
constexpr Status code = Status::fail;
constexpr int wire = {{c1::std\::to_underlying(code)}};
```

---

Because `enum class` refuses implicit conversion, getting the number out
is an explicit step. `std::to_underlying` (C++23) converts to exactly the
declared underlying type (`unsigned char` here), which a hand-written
`static_cast<int>` would silently disagree with if someone changed the
`: unsigned char`. Both `code` and `int{code}` ask for the implicit
conversion that does not exist.
