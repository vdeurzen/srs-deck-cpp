---
id: ranges-views-lazy-cloze
kind: cloze
version: 1
level: 2
tags: [ranges]
refs:
  - https://en.cppreference.com/w/cpp/ranges
---

Adapting a range with `std::views::filter` or `std::views::transform` is
{{c2::lazy::an evaluation strategy}}: no predicate or function runs, and
no element is touched, until something iterates the view.
