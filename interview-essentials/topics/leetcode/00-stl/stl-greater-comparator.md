---
id: stl-greater-comparator
kind: basic
version: 1
level: 1
tags: [stl, sorting, comparators]
requires:
  - cpp-essentials/stdalgo-sort-basics
refs:
  - https://en.cppreference.com/w/cpp/utility/functional/greater
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort
elaborate: Where else would you pass a ready-made comparator object instead of writing a lambda expression, and what does it save the reader?
---

`std::ranges::sort(v, cmp)`, from `<algorithm>`, sorts all of `v`, like
`std::sort(v.begin(), v.end(), cmp)`.

```cpp
#include <functional>
std::vector<int> v{3, 9, 4};
std::ranges::sort(v, std::greater{});
```

## What order does `v` end in?

---

**`9 4 3`: `std::greater{}` is a comparator object whose call computes `a > b`.**

`sort` puts `a` before `b` when the comparator returns true, so `>`
puts larger values first. The default, `std::less`, computes `a < b`.
The `{}` creates the object; with no `<int>` it compares any two values.
