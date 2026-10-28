---
id: rng-projection-intro
kind: basic
version: 1
level: 2
tags: [algorithms, ranges]
requires:
  - rng-ranges-form-vocab
  - stdalgo-sort-basics
  - class-struct-members
elaborate: Say what the projection would be if you sorted the same orders by id instead.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/ranges/sort
  - https://en.cppreference.com/w/cpp/iterator/projected
---

The `{}` argument means "the default comparator, `<`".

```cpp
struct Order { int id; int qty; };
std::vector<Order> orders{{1, 30}, {2, 10}, {3, 20}};
std::ranges::sort(orders, {}, [](Order o) { return o.qty; });
```

## In what order do the ids end up?

---

**2, 3, 1: the orders are sorted by `qty`.**

The third argument is a *projection*: a callable taking one element and
mapping it to the key the comparator sees. Here `<` compares 10, 20 and
30, not whole `Order`s. The projection runs on every comparison, so keep
it cheap.
