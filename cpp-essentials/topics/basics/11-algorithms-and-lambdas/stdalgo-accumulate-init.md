---
id: stdalgo-accumulate-init
kind: code
version: 1
level: 2
tags: [algorithms]
input: chips
choices:
  c1: ["0.0", "0", "1.0", "v[0]"]
compile:
  harness: |
    static_assert(total() == 4.5);
    int main() {}
requires:
  - iter-end-one-past
refs:
  - https://en.cppreference.com/w/cpp/algorithm/accumulate
---

Complete the call so `total` returns the exact sum of `v`.

```cpp
#include <numeric>
#include <vector>
constexpr double total() {
    std::vector<double> v{1.5, 3.0};
    return std::accumulate(v.begin(), v.end(), {{c1::0.0}});
}
```

---

`accumulate` keeps its running total **in the type of the initial value**:
it computes `acc = acc + *it` with `acc` of that type. Starting from the
`int` `0`, each step truncates back to `int` (1.5 becomes 1), giving 4.
Starting from `1.0` or `v[0]` adds an extra term to the sum. Note `accumulate`
lives in `<numeric>`, not `<algorithm>`.
