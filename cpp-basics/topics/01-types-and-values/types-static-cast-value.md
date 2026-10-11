---
id: types-static-cast-value
kind: code
version: 1
level: 1
tags: [types, conversions, casts]
input: chips
choices:
  c1: ["static_cast<double>(hits) / shots", "static_cast<double>(hits / shots)", "static_cast<long>(hits) / shots", "double(hits / shots)"]
compile:
  harness: |
    static_assert(rate == 0.75);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/static_cast
  - https://eel.is/c++draft/expr.static.cast
---

`hits / shots` divides two `int`s and gives `0`. Complete the initializer
so `rate` is `0.75`.

```cpp
constexpr int hits = 3, shots = 4;
constexpr double rate = {{c1::static_cast<double>(hits) / shots}};
```

---

`static_cast` is the named cast for ordinary value conversions such as
`int` to `double`. **Convert an operand, before the division**: then
`shots` converts too and the division is done in `double`. Converting the
result is too late, as `3 / 4` is already `0`; `long` is still an integer
type.
