---
id: ranges-views-borrowed-range-cloze
kind: cloze
version: 1
level: 4
tags: [ranges]
requires:
  - ranges-views-lazy-cloze
refs:
  - https://en.cppreference.com/w/cpp/ranges/borrowed_range
---

Running a range algorithm on a temporary container is a classic
dangling-iterator trap: in `auto it = std::ranges::find(std::vector{1,2,3},
2);` the vector is a temporary that is {{c1::destroyed at the end of the
full expression}}, so the algorithm returns `std::ranges::dangling`
instead of an iterator, and dereferencing `it` fails to compile. The
`std::ranges::borrowed_range` concept marks range types — like `std::span`
and `std::string_view` — whose iterators stay valid even after the range
object itself is {{c2::destroyed::because the iterators do not depend on
the range object's own storage}}, so algorithms return a real iterator
from a borrowed rvalue range and `dangling` from an ordinary one.
