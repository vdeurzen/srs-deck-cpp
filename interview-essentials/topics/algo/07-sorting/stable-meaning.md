---
id: sort-stable-meaning
kind: basic
version: 1
level: 1
tags: [sorting, stability]
elaborate: A spreadsheet sorts by whichever column you click last. What would the user see if that sort were unstable?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
  - https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
---

## These rows, already in name order, are **stably** sorted by department. What order do the names within each department end up in?

`(Ann, Ops) (Bob, Dev) (Cat, Ops) (Dan, Dev)`

---

**Still name order: elements with equal keys keep their input order.**

Result: `(Bob, Dev) (Dan, Dev) (Ann, Ops) (Cat, Ops)`.

Equal means equal under the comparator, not identical rows. So a
stable sort on one key keeps an order built earlier on another key.
`std::sort` is free to output `Dan` before `Bob`.
