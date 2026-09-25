---
id: ranges-views-borrowed-range-cloze
kind: cloze
version: 1
level: 4
tags: [ranges]
refs:
  - https://en.cppreference.com/w/cpp/ranges/borrowed_range
---

Returning a view built from a local container by value is a classic
dangling-iterator trap: `std::ranges::filter_view(std::vector{1,2,3},
pred)` returns a view whose iterators point into a temporary that is
{{c1::destroyed at the end of the full expression}}. The
`std::ranges::borrowed_range` concept marks range types — like `std::span`
and `std::string_view` — whose iterators stay valid even after the range
object itself is {{c2::destroyed::because the iterators do not depend on
the range object's own storage}}, so algorithms can safely return an
iterator from a borrowed rvalue range but not from an ordinary one.
