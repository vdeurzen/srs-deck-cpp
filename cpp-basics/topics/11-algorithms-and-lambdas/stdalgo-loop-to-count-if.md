---
id: stdalgo-loop-to-count-if
kind: code
version: 1
level: 2
tags: [algorithms, refactoring]
input: chips
choices:
  c1: ["count_if", "count", "find_if", "accumulate"]
compile:
  harness: |
    static_assert(above({1, 7, 3, 9}, 4) == 2);
    int main() {}
requires:
  - cpp-essentials/stdalgo-find-vs-find-if
  - cpp-essentials/stdalgo-capture-ref-vs-copy
refs:
  - https://en.cppreference.com/w/cpp/algorithm/count
---

Replace the hand-written loop `int n = 0; for (int x : v) if (x > limit) ++n;`
with one standard algorithm call.

```cpp
#include <algorithm>
#include <vector>
constexpr long above(const std::vector<int>& v, int limit) {
    return std::{{c1::count_if}}(v.begin(), v.end(),
                                 [limit](int x) { return x > limit; });
}
```

---

The loop's job is "how many elements satisfy a condition", which is
`count_if` with the condition as a predicate. The lambda captures `limit`
by copy to use it. `count` compares each element with a **value** using
`==`; `find_if` returns an iterator to the first match, not a number.
Naming the algorithm states the intent and leaves no counter to get wrong.
