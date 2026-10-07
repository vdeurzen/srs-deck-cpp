---
id: ranges-views-construction-cost
kind: cloze
version: 1
level: 3
tags: [ranges, complexity]
requires:
  - ranges-views-lazy-cloze
refs:
  - https://en.cppreference.com/w/cpp/ranges
  - https://en.cppreference.com/w/cpp/ranges/view
---

Building `v | std::views::filter(p) | std::views::transform(f)` over a
million-element `v` does work proportional to the {{c1::number of
adaptors::something you can count in the expression}}, and none
proportional to the number of elements: each adaptor stores its
underlying view and its function object, nothing more.
