---
id: stdalgo-comparator-strict
kind: basic
version: 1
level: 2
tags: [algorithms, sorting, misconception]
elaborate: Where in your own code does a comparator use `<=` or `>=`, perhaps to "keep equal items in order"?
requires:
  - stdalgo-sort-basics
refs:
  - https://en.cppreference.com/w/cpp/named_req/Compare
  - https://en.cppreference.com/w/cpp/algorithm/sort
---

## Many expect `<=` to sort like `<`, just keeping equal items in their old order. What does the standard say happens when `std::sort` is given this comparator?

```cpp
std::sort(v.begin(), v.end(), [](int a, int b) { return a <= b; });
```

---

**Undefined behaviour: `sort` requires `comp(x, x) == false`, and `<=` breaks that.**
The comparator answers "must `a` come before `b`?". For two equal
elements, `5 <= 5` is `true`: it claims each 5 must precede the other,
which no order satisfies. The range may end up unsorted, or the program
may crash. Use `<`.
