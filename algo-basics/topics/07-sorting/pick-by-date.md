---
id: sort-pick-by-date
kind: basic
version: 1
level: 3
tags: [sorting, mixed]
requires:
  - interview-essentials/sort-std-sort-vs-stable
  - interview-essentials/sort-heap-sort-unstable
elaborate: Where does code you own sort by one column after another, and would it break if equal keys were reordered?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
  - https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
---

## 10⁵ orders are already sorted by customer. Re-sort them by date so that, within one date, they stay in customer order. Which sort would you use?

---

**A stable sort: merge sort, as `std::stable_sort` does.**

Stable means equal keys, here equal dates, keep their input order,
which is customer order. Heap sort and `std::sort` may move a record
past others with the same date, shuffling the customers.
