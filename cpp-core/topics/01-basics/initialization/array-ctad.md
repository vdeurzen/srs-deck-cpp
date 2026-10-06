---
id: initialization-array-ctad
kind: code
version: 1
level: 2
tags: [initialization, templates]
input: chips
choices:
  c1: ["1, 2, 3", "1, 2", "1, 2, 3, 4", "0, 0, 0"]
compile:
  harness: |
    static_assert(arr.size() == 3);
    static_assert(arr[0] == 1 && arr[1] == 2 && arr[2] == 3);
    int main() {}
requires:
  - initialization-aggregate-braces
refs:
  - https://en.cppreference.com/w/cpp/container/array/deduction_guides
---

Complete the braced list so class template argument deduction gives a
three-element `std::array<int, 3>` holding `1, 2, 3`.

```cpp
#include <array>
constexpr std::array arr{ {{c1::1, 2, 3}} };
```

---

Since C++17, `std::array`'s deduction guide reads both the element type and
`N` off the braced-init-list: no `<int, 3>` needed. `N` is part of the
type, so a list of the wrong length deduces a different, incompatible
`std::array`.
