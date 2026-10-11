---
id: sort-swap-temp
kind: code
version: 1
level: 1
tags: [foundations, sorting, swap]
input: chips
choices:
  c1:
    - "a[i] = a[j];"
    - "a[j] = a[i];"
    - "a[i] = t;"
    - "t = a[j];"
compile:
  harness: |
    constexpr std::array<int, 4> after(std::array<int, 4> a) { swap_at(a, 0, 3); return a; }
    static_assert(after({7, 1, 2, 9}) == std::array{9, 1, 2, 7});
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/swap
  - https://algs4.cs.princeton.edu/21elementary/
---

Complete `swap_at` so the values in slots `i` and `j` trade places.

```cpp
#include <array>
#include <cstddef>
constexpr void swap_at(std::array<int, 4>& a, std::size_t i, std::size_t j) {
  int t = a[i];
  {{c1::a[i] = a[j];}}
  a[j] = t;
}
```

---

`t` keeps the old `a[i]` alive across the write that overwrites it.
Without it, `a[i] = a[j]; a[j] = a[i];` leaves both slots holding the
old `a[j]`. A swap costs three writes, which is why sorts are compared
by swaps as well as comparisons. `std::swap` is the same three moves.
