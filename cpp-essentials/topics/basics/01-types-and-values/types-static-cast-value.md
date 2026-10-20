---
id: types-static-cast-value
kind: code
version: 1
level: 1
tags: [types, conversions, casts]
input: chips
choices:
  c1: ["static_cast<double>(hits) / shots", "static_cast<double>(hits / shots)", "hits / shots * 1.0", "(hits / shots) + 0.0"]
compile:
  harness: |
    static_assert(rate == 0.75);
    int main() {}
requires:
  - cast-static-cast-intro
  - const-vs-constexpr-initializer
elaborate: Where in your own code does an integer division feed a `double`, and where exactly would you put the cast?
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

**Convert an operand before the division, so the division is done in `double`.**

Once `hits` is a `double`, `shots` converts too. Every other choice
divides two `int`s first: `3 / 4` is already `0`, and converting,
multiplying or adding afterwards cannot bring the fraction back.
