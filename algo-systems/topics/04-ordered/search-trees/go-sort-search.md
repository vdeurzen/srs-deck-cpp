---
id: ordered-go-sort-search
kind: code
version: 2
level: 3
requires:
  - ordered-lower-bound-loop
  - interview-essentials/search-first-true-predicate
tags: [binary-search, invariants]
input: chips
choices:
  c1: ["o.px < limit", "o.px <= limit", "o.px >= limit", "o.px == limit"]
compile:
  harness: |
    constexpr std::array<Order, 6> book{{{10, 1}, {20, 1}, {20, 2}, {20, 3}, {30, 1}, {40, 1}}};
    constexpr long at(int limit) { return first_at_or_above(book, limit) - book.begin(); }
    static_assert(at(20) == 1);   // first of a run of duplicates
    static_assert(at(40) == 5);   // the last element
    static_assert(at(5) == 0);    // below every price
    static_assert(at(50) == 6);   // above every price: end
    static_assert(at(25) == 4);   // absent, between prices
    int main() {}
elaborate: Name a yes/no question in your own work, about something other than an array element, that you could binary-search with `partition_point`.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition_point
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
---

`std::partition_point(first, last, pred)` needs `pred` true for a prefix
and false after it, and returns the first element where it is false.
`book` is sorted by `px`. Complete the predicate so the call returns the
first order with `px >= limit`.

```cpp
#include <algorithm>
#include <array>
struct Order { int px; int qty; };
constexpr auto first_at_or_above(const std::array<Order, 6>& book, int limit) {
    return std::partition_point(book.begin(), book.end(),
        [&](const Order& o) { return {{c1::o.px < limit}}; });
}
```

---

**`o.px < limit` is true exactly on the prefix before the answer.** The
predicate names the part to skip, so it is the negation of the target.
`<=` also skips equal prices (upper bound); `>=` is false-then-true,
breaking the precondition; `==` is not a prefix at all.
