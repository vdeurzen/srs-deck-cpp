---
id: ranges-views-lazy-cloze
kind: cloze
version: 1
level: 2
tags: [ranges]
refs:
  - https://en.cppreference.com/w/cpp/ranges
---

A view, unlike a container, does not {{c1::own its elements::no allocation,
no copy of the data}}. Adapting a range with `std::views::filter` or
`std::views::transform` is {{c2::lazy}}: no element is actually touched
until the view is iterated, so building a long pipeline of adaptors costs
{{c3::O(1)::constant time, regardless of the underlying range's size}}
before any iteration begins.
