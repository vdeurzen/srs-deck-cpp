---
id: linear-address-code
kind: code
version: 1
level: 1
tags: [foundations, arrays, memory]
requires:
  - linear-address-formula
input: chips
choices:
  c1: ["i * sizeof(T)", "i", "(i + 1) * sizeof(T)", "i + sizeof(T)"]
compile:
  harness: |
    struct Rgb { char r, g, b; };
    static_assert(byte_offset<int>(0) == 0);
    static_assert(byte_offset<int>(6) == 24);
    static_assert(byte_offset<double>(3) == 24);
    static_assert(byte_offset<Rgb>(5) == 15);
    int main() {}
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.1 (arrays)
  - https://en.cppreference.com/w/cpp/language/sizeof
---

An array of `T` starts at some address. Complete how many bytes past
that start element `i` begins.

```cpp
#include <cstddef>

template <class T>
constexpr std::size_t byte_offset(std::size_t i) {
  return {{c1::i * sizeof(T)}};
}
```

---

**Skip `i` whole elements, each `sizeof(T)` bytes wide.** The address
of `a[i]` is the array's start plus this offset.

`i` alone counts elements, not bytes: right only for `char`. In C++
`p + i` on a `T*` scales by `sizeof(T)` for you; a byte address does
not. `(i + 1)` is the 1-based habit: element 0 sits at offset 0.
