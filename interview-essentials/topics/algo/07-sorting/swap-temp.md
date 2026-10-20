---
id: sort-swap-temp
kind: code
version: 1
level: 1
tags: [foundations, sorting, swap]
requires:
  - cpp-essentials/ptr-reference-must-bind
  - cpp-essentials/constexpr-fn-static-assert
input: chips
choices:
  c1:
    - "x = y;"
    - "y = x;"
    - "x = t;"
    - "t = y;"
compile:
  harness: |
    constexpr int run() {
      int a[] = {7, 1, 2, 9};
      swap_vals(a[0], a[3]);
      return a[0] * 1000 + a[1] * 100 + a[2] * 10 + a[3];
    }
    static_assert(run() == 9127);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/algorithm/swap
  - https://algs4.cs.princeton.edu/21elementary/
elaborate: Where else have you had to save a value before overwriting it, the way `t` does here?
---

Complete `swap_vals` so `x` and `y` trade values, as two array slots do
when a sort exchanges them.

```cpp
constexpr void swap_vals(int& x, int& y) {
  int t = x;
  {{c1::x = y;}}
  y = t;
}
```

---

`t` keeps the old `x` alive across the write that overwrites it.
Without it, `x = y; y = x;` leaves both holding the old `y`. A swap
costs three writes, which is why sorts are compared by swaps as well as
comparisons. `std::swap` is the same three moves.
