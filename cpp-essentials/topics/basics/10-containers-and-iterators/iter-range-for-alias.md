---
id: iter-range-for-alias
kind: code
version: 1
level: 1
tags: [iterators, range-for]
input: chips
choices:
  c1: ["int&", "int", "const int&"]
compile:
  harness: |
    static_assert(doubled_sum() == 12);
    int main() {}
requires:
  - range-for-loop-variable
  - ptr-reference-must-bind
  - constexpr-fn-static-assert
elaborate: Say which loop-variable type you reach for by default when reading a vector of large structs, and why.
refs:
  - https://en.cppreference.com/w/cpp/language/range-for
---

`for (T x : v)` runs its body once per element of `v`. The first loop
must double the elements of `v`. Complete the type of its
loop variable.

```cpp
#include <vector>
constexpr int doubled_sum() {
    std::vector<int> v{1, 2, 3};
    for ({{c1::int&}} x : v)
        x *= 2;
    int sum = 0;
    for (int x : v) sum += x;
    return sum;
}
```

---

A range-for declares its variable afresh for each element, initialised
from the element. As a plain `int` it is a **copy**: doubling it leaves `v`
untouched (sum stays 6). As `int&` it names the element itself. `const
int&` also avoids the copy but forbids the assignment. Rule of thumb:
`auto&` to modify, `const auto&` to read large elements, a value for
cheap ones.
