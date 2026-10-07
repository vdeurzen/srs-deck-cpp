---
id: sort-stability
kind: basic
version: 1
level: 2
tags: [sorting, databases]
elaborate: A spreadsheet sorts by whichever column you click last. What would the user see if that sort were unstable?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
  - https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
---

## What does a stable sort guarantee? Rows already ordered by name are stably sorted by department.

---

**Comparator-equal elements keep their input order: each department stays ordered by name.**

Equal means equivalent under the comparator, not identical. That is
what makes stability useful: sorting on one key preserves an order
built earlier on another. `std::sort` may scramble each department's
names.
