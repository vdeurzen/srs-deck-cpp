---
id: initialization-array-ctad
kind: code
version: 2
level: 2
tags: [initialization, templates]
input: chips
choices:
  c1: ["std::array", "auto", "std::array<int>", "std::initializer_list<int>"]
compile:
  harness: |
    #include <type_traits>
    static_assert(std::is_same_v<decltype(arr), const std::array<int, 3>>);
    int main() {}
requires:
  - initialization-aggregate-braces
refs:
  - https://en.cppreference.com/w/cpp/container/array/deduction_guides
  - https://en.cppreference.com/w/cpp/language/class_template_argument_deduction
---

Complete the declaration so `arr` is a fixed-size array whose element
type and length both come from the braced list, with neither written out.

```cpp
#include <array>
constexpr {{c1::std\::array}} arr{1, 2, 3};
```

---

Since C++17, class template argument deduction reads both template
arguments of `std::array` off the list: `std::array<int, 3>`. There is no
partial form: `std::array<int>` names one argument and deduces nothing.
`auto` with braces and several elements is ill-formed, and an
`initializer_list` is a view of a hidden array, not a container you own.
