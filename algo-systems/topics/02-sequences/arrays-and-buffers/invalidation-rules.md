---
id: seq-invalidation-rules
kind: cloze
version: 1
level: 3
requires:
  - seq-vector-vs-deque
tags: [containers, lifetime]
refs:
  - https://en.cppreference.com/w/cpp/container#Iterator_invalidation
  - https://en.cppreference.com/w/cpp/container/unordered_map
---

Iterator and reference invalidation are two different guarantees, and the
standard containers deliberately differ on both.

A `std::vector` invalidates {{c1::everything::all iterators, pointers and
references}} whenever it reallocates, and from the point of an insert or
erase onwards when it does not. A `std::deque` invalidates all iterators
on a push at either end but leaves {{c2::references and pointers to the
existing elements::the elements themselves never move}} valid. A
`std::list` invalidates only what you actually erased.

The node-based associative containers are the reason the distinction is
worth knowing: `std::map` and `std::set` invalidate nothing but the
erased node, and `std::unordered_map` invalidates {{c3::iterators::on a
rehash}} when it rehashes, while pointers and references to elements
survive — the standard requires the elements to live in separately
allocated nodes, which is precisely what forbids an implementation from
being a flat open-addressed table.

That requirement is why `absl::flat_hash_map` and other open-addressed
tables are not drop-in replacements: they move elements on rehash, so
they trade the {{c4::reference stability::pointer-into-the-container
guarantee}} for one cache miss per lookup instead of two. When code needs
both, the answer is a flat table of {{c5::handles or indices::into a
stable arena, rather than pointers into the table}}.
