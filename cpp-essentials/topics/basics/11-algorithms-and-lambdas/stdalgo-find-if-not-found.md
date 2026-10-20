---
id: stdalgo-find-if-not-found
kind: code
version: 1
level: 1
tags: [algorithms, iterators]
input: chips
choices:
  c1: ["it != v.end() ? *it : 0", "it != nullptr ? *it : 0", "*it < 0 ? *it : 0", "it ? *it : 0"]
compile:
  harness: |
    static_assert(first_negative({3, -1, -4}) == -1);
    static_assert(first_negative({3, 4}) == 0);
    int main() {}
requires:
  - stdalgo-find-if-no-match
  - expr-conditional-operator
  - constexpr-fn-static-assert
  - ptr-null-pointer
elaborate: Say why the standard algorithms report "not found" with an iterator rather than a special value such as `-1`.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/find
---

Return the first negative number in `v`, or `0` if there is none.

```cpp
#include <algorithm>
#include <vector>
constexpr int first_negative(std::vector<int> v) {
    auto it = std::find_if(v.begin(), v.end(), [](int x) { return x < 0; });
    return {{c1::it != v.end() ? *it : 0}};
}
```

---

The `find` family reports "no match" by returning the **end of the range
you passed**, the one position that is never an element. An iterator is
not a pointer, so it cannot be compared with `nullptr` or tested as a
`bool`, and `*it` on a miss dereferences `end()`: undefined behaviour.
