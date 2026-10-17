---
id: ub-dangling-return-type
kind: code
version: 1
level: 2
tags: [undefined-behaviour, lifetime, references, constexpr]
requires:
  - ub-dangling-after-scope
  - cpp-essentials/ub-static-assert-finds-ub
  - cpp-essentials/fn-return-by-value
input: chips
choices:
  c1: ["int", "const int&", "int&"]
compile:
  harness: |
    static_assert(median_of_3(9, 2, 4) == 4);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime
  - https://en.cppreference.com/w/cpp/language/reference#Dangling_references
---

`median_of_3` sorts a local copy of its three arguments and hands back
the middle one. Choose the return type so the caller can use the result.

```cpp
#include <algorithm>
#include <array>
constexpr {{c1::int}} median_of_3(int x, int y, int z) {
    std::array<int, 3> v{x, y, z};
    std::sort(v.begin(), v.end());
    return v[1];
}
```

---

`v` dies when the function returns. Returning `int` copies the middle
value out first. Either reference type binds to `v[1]` itself, so the
caller receives a **dangling reference** and reading it is undefined
behaviour; GCC rejects that in the `static_assert` (`accessing 'v'
outside its lifetime`).
