---
id: ranges-views-borrowed-range-cloze
kind: cloze
version: 2
level: 4
tags: [ranges, lifetime]
requires:
  - ranges-views-non-owning
  - ptr-temporary-full-expression
refs:
  - https://en.cppreference.com/w/cpp/ranges/borrowed_range
  - https://en.cppreference.com/w/cpp/ranges/dangling
---

`std::ranges::find(std::vector{1, 2, 3}, 2)` returns `std::ranges::dangling`,
not an iterator: the temporary vector dies at the end of the
full-expression. Called on a temporary `std::string_view`, the same
algorithm returns a real iterator, because `std::string_view` models
{{c1::std\::ranges\::borrowed_range::a range concept}}: its iterators
point into storage the view never owned.
