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
  - lambda-syntax-intro
  - iter-end-one-past
  - constexpr-fn-static-assert
elaborate: Say what you would call on `out` first if you wanted to write through `out.begin()` instead.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/transform
  - https://en.cppreference.com/w/cpp/iterator/back_inserter
---

`std::transform(first, last, out, f)` writes `f(x)` for each element `x`
of `[first, last)` through the output position `out`. Complete the call so
`out` receives the square of each element of `in`.

```cpp
#include <algorithm>
#include <iterator>
#include <vector>
constexpr int squares_sum() {
    std::vector<int> in{1, 2, 3};
    std::vector<int> out;
    std::transform(in.begin(), in.end(), {{c1::std\::back_inserter(out)}},
                   [](int x) { return x * x; });
    if (out.size() != 3) return -1;
    return out[0] + out[1] + out[2];
}
```

---

`transform` writes each result through its output iterator and **never
grows the destination**. Writing through `out.begin()` of an empty vector
writes to elements that do not exist: undefined behaviour.
`std::back_inserter(out)` turns each write
into `out.push_back(...)`. The alternative is to size `out` first.
