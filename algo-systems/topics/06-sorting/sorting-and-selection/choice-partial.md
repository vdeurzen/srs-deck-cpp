---
id: sort-choice-partial
kind: cloze
version: 1
level: 4
tags: [sorting, selection]
requires:
  - sort-quickselect
refs:
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
  - https://en.cppreference.com/w/cpp/algorithm/partial_sort
---

Only part of the output is needed, so don't sort it all. The k-th
element, with its neighbours left unordered: {{c1::std\::nth_element::a
standard algorithm, expected O(n)}}. The smallest k, themselves in
order: {{c2::std\::partial_sort::a standard algorithm, O(n log k)}}.
