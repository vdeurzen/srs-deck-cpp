---
id: rng-two-arg-projection
kind: basic
version: 1
level: 3
tags: [algorithms, ranges]
requires:
  - rng-projection-intro
elaborate: Say how you would tell, reading a ranges call, which argument is the comparator and which the projection.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort
  - https://en.cppreference.com/w/cpp/iterator/projected
---

```cpp
struct Order { int id; int qty; };
std::vector<Order> orders{{1, 30}, {2, 10}};
std::ranges::sort(orders, {},
                  [](Order a, Order b) { return a.qty < b.qty; });
```

## The `sort` call fails to compile. Why?

---

**The third argument is the projection, called with one element; this closure object takes two.**

A closure object taking two parameters and returning `bool` is a comparator, and the
comparator goes second:

```cpp
std::ranges::sort(orders, [](Order a, Order b) { return a.qty < b.qty; });
```
