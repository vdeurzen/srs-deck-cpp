---
id: sort-bubble-bound-code
kind: code
version: 1
level: 2
tags: [foundations, sorting, bubble-sort]
input: chips
choices:
  c1:
    - "j + pass < n"
    - "j + 1 < n - pass"
    - "j < n"
    - "j + pass <= n"
compile:
  harness: |
    static_assert(bubble_sort({3, 5, 1, 4, 2}) == std::array{1, 2, 3, 4, 5});
    static_assert(bubble_sort({2, 3, 4, 5, 1}) == std::array{1, 2, 3, 4, 5});
    int main() {}
requires:
  - sort-bubble-invariant
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Bubble_sort
---

Passes are numbered from 1. Complete the inner condition so pass `pass`
compares every pair that may still be out of order, and no other.

```cpp
#include <array>
#include <cstddef>
#include <utility>
constexpr std::array<int, 5> bubble_sort(std::array<int, 5> a) {
  const std::size_t n = a.size();
  for (std::size_t pass = 1; pass < n; ++pass)
    for (std::size_t j = 0; {{c1::j + pass < n}}; ++j)
      if (a[j] > a[j + 1]) std::swap(a[j], a[j + 1]);
  return a;
}
```

---

Before pass `pass`, the last `pass − 1` slots are final, so the last
pair to compare is `(n − pass − 1, n − pass)`: `j < n − pass`. One less
leaves the pass's maximum one slot short; `j < n` and `<=` read
`a[n]`, which a constant expression rejects.
