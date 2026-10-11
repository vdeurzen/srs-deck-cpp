---
id: stdalgo-find-vs-find-if
kind: basic
version: 1
level: 1
tags: [algorithms]
requires:
  - stdalgo-lambda-syntax
  - iter-end-one-past
refs:
  - https://en.cppreference.com/w/cpp/algorithm/find
---

## You need an iterator to the first element of `std::vector<int> v` that is greater than 10. Which algorithm do you call: `std::find` or `std::find_if`?

---

**`std::find_if`: the test is a condition, not a single value.**
`std::find(first, last, value)` can only compare each element with `value`
using `==`. `find_if` calls a predicate, a callable returning `bool`:

```cpp
auto it = std::find_if(v.begin(), v.end(), [](int x) { return x > 10; });
```
