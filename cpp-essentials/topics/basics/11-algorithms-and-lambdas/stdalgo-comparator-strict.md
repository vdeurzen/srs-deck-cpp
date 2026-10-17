---
id: stdalgo-comparator-strict
kind: basic
version: 1
level: 2
tags: [algorithms, sorting, misconception]
requires:
  - stdalgo-sort-by-length
elaborate: Where in your own code does a comparator use `<=` or `>=`, perhaps to "keep equal items in order"?
refs:
  - https://en.cppreference.com/w/cpp/named_req/Compare
  - https://en.cppreference.com/w/cpp/algorithm/sort
---

## What happens when `std::sort` is given this comparator?

```cpp
std::sort(v.begin(), v.end(), [](int a, int b) { return a <= b; });
```

---

**Undefined behaviour: `sort` requires `comp(x, x) == false`, and `<=` breaks that.**
The comparator answers "must `a` come before `b`?". For two equal
elements it claims each must precede the other:

```cpp
constexpr auto le = [](int a, int b) { return a <= b; };
static_assert(le(5, 5));   // "5 before 5": impossible
```

The range may end up unsorted, or the program may crash. Use `<`.
