---
id: srch-contains-code
kind: code
version: 1
level: 3
tags: [algorithms, searching]
input: chips
choices:
  c1:
    - "it != v.end() && *it == x"
    - "*it == x"
    - "it != v.end()"
    - "*it == x && it != v.end()"
compile:
  harness: |
    static_assert(contains(8));
    static_assert(!contains(1));
    static_assert(!contains(9));
    static_assert(contains(5));
    static_assert(!contains(4));
    int main() {}
requires:
  - srch-steps-cloze
  - constexpr-fn-static-assert
elaborate: Say which keys for this `v` would make each wrong check misbehave, and how.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.cppreference.com/w/cpp/language/operator_logical
---

Searching a sorted vector: *sort first · search · check the miss · read
the position*. `v` is sorted and searched; complete the check so
`contains(x)` is true exactly when `x` is in `v`.

```cpp
#include <algorithm>
#include <vector>
constexpr bool contains(int x) {
    std::vector<int> v{3, 5, 5, 8};
    auto it = std::lower_bound(v.begin(), v.end(), x);
    return {{c1::it != v.end() && *it == x}};
}
```

---

**Rule out `end()` first; `&&` then reads `*it` only for a real element.**
`*it == x` alone reads `*v.end()` for 9, undefined behaviour, which fails
constant evaluation; the reversed order does the same. `it != v.end()`
alone says 4 is present, since `it` lands on the 5.
