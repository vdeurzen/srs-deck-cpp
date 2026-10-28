---
id: algmix-count-in-range
kind: basic
version: 1
level: 3
tags: [algorithms, choosing]
requires:
  - srch-upper-vs-lower
  - srch-cost
elaborate: Say what you would do first if the prices arrived unsorted, and when that one-off cost pays for itself.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/upper_bound
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
---

## A sorted `std::vector<int> p` holds 10⁶ prices, and 10⁵ queries each ask how many prices lie in `[a, b]`. What does one query compute?

---

**`upper_bound(p.begin(), p.end(), b) - lower_bound(p.begin(), p.end(), a)`.**

Cue: sorted data and many count queries. `lower_bound(a)` is the first
price ≥ a and `upper_bound(b)` the first > b, so the prices between are
`[a, b]`: about 40 comparisons per query. A `find_if` or loop per query
reads up to 10⁶ prices each time.
