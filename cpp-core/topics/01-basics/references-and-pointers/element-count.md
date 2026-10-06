---
id: ptr-element-count
kind: code
version: 1
level: 1
tags: [pointers, arrays]
requires:
  - ptr-array-decay
  - ptr-const-walk-pointer
input: chips
choices:
  c1:
    - "last - first"
    - "(last - first) / sizeof(int)"
    - "last - first + 1"
    - "(last - first) * sizeof(int)"
compile:
  harness: |
    constexpr int a[5] = {};
    static_assert(count(a, a + 5) == 5);
    static_assert(count(a + 2, a + 2) == 0);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic#Additive_operators
  - https://en.cppreference.com/w/cpp/types/ptrdiff_t
---

`first` and `last` point into the same array, `last` one past the final
element of interest. Complete `count` so it returns how many `int`s lie
in `[first, last)`.

```cpp
#include <cstddef>
constexpr std::ptrdiff_t count(const int* first, const int* last) {
  return {{c1::last - first}};
}
```

---

Pointer arithmetic is in **elements**, never bytes: `p + 1` is the next
`int`, and `last - first` is the number of `int`s between them, of type
`std::ptrdiff_t`. Dividing or multiplying by `sizeof(int)` repeats a
scaling the compiler already did; `+ 1` is the fencepost error of a closed
range. Both pointers must point into the same array (or one past its end):
subtracting pointers into different objects is undefined behaviour. A
ring buffer's `tail - head` and a slice's `len` are this number.
