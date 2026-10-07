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

`v | std::views::filter(pred)` with an lvalue `std::vector v` wraps `v` in
a `std::ranges::ref_view`: the view {{c1::refers to `v`'s elements without
owning them::an ownership relation}}. Copying the view copies no elements,
and `v` must outlive it.
