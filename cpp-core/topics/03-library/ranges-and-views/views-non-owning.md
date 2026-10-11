---
id: ranges-views-non-owning
kind: cloze
version: 1
level: 2
tags: [ranges, lifetime]
requires:
  - ranges-views-lazy-cloze
refs:
  - https://en.cppreference.com/w/cpp/ranges/ref_view
  - https://en.cppreference.com/w/cpp/ranges/all_view
---

With an lvalue `std::vector<int> v`, the view `f` in
`auto f = v | std::views::filter(pred);` {{c1::refers to `v`'s elements
without owning them::its relation to `v`'s elements}}.
