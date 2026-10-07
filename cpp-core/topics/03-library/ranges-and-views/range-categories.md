---
id: ranges-range-categories
kind: basic
version: 1
level: 3
tags: [ranges, concepts]
requires:
  - staticpoly-iterator-category
refs:
  - https://en.cppreference.com/w/cpp/ranges/input_range
  - https://en.cppreference.com/w/cpp/ranges/forward_range
---

## A `std::vector<int>` can be iterated twice; a `std::ranges::istream_view<int>` cannot. Which range concept guarantees that a range can be?

---

**`std::ranges::forward_range`: multi-pass. A plain `input_range` may be
single-pass, so iterating it consumes the elements.**

Each range concept refines the one after it: `contiguous_range` →
`random_access_range` → `bidirectional_range` → `forward_range` →
`input_range`, following the iterator's category. An algorithm asks for
the weakest it needs.
