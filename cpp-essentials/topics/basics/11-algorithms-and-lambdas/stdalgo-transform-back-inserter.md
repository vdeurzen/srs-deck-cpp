---
id: stdalgo-transform-back-inserter
kind: code
version: 1
level: 2
tags: [algorithms, iterators]
input: chips
choices:
  c1: ["std::back_inserter(out)", "out.begin()", "out.end()"]
compile:
  harness: |
    static_assert(squares_sum() == 14);
    int main() {}
requires:
  - stdalgo-lambda-syntax
  - iter-size-vs-capacity
refs:
  - https://en.cppreference.com/w/cpp/algorithm/transform
  - https://en.cppreference.com/w/cpp/iterator/back_inserter
---

Complete the call so `out` receives the square of each element of `in`.

```cpp
#include <algorithm>
#include <iterator>
#include <vector>
constexpr int squares_sum() {
    std::vector<int> in{1, 2, 3};
    std::vector<int> out;
    std::transform(in.begin(), in.end(), {{c1::std\::back_inserter(out)}},
                   [](int x) { return x * x; });
    return out.size() == 3 ? out[0] + out[1] + out[2] : -1;
}
```

---

`transform` writes each result through its output iterator and **never
grows the destination**. Writing through `out.begin()` of an empty vector
writes to elements that do not exist: undefined behaviour, a compile
error in a constant expression. `std::back_inserter(out)` turns each write
into `out.push_back(...)`. The alternative is to size `out` first.
