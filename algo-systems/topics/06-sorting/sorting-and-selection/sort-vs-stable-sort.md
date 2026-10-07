---
id: sort-vs-stable-sort
kind: cloze
version: 1
level: 3
tags: [sorting, memory]
requires:
  - sort-stable-sort-cost
refs:
  - https://en.cppreference.com/w/cpp/algorithm/sort
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
---

`std::sort` promises O(n log n) comparisons, leaves equal elements in
{{c1::unspecified order::what is promised about them}}, and needs no
buffer in practice. `std::stable_sort` keeps equal elements in input
order, at O(n log n) only when it can {{c2::allocate a buffer::where the
extra speed comes from}}, and {{c3::O(n log² n)::the bound}} when it
cannot.
