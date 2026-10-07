---
id: sort-choice
kind: cloze
version: 1
level: 4
tags: [sorting, databases]
requires:
  - sort-stability
  - sort-timsort-runs
refs:
  - https://en.cppreference.com/w/cpp/algorithm/sort
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
---

Choose the sort from the data, not from habit. Arbitrary comparable
values in memory: `std::sort`, an {{c1::introsort::a hybrid named for
checking its own recursion}}, O(n log n) worst case. Equal elements
whose input order must survive: {{c2::std\::stable_sort::a standard
algorithm}}. Data arriving as concatenated sorted pieces: an adaptive
sort that detects natural {{c3::runs::what it then merges}}, making
already-sorted input linear.
