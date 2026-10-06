---
id: coroutines-generator-element-references
kind: cloze
version: 1
level: 4
tags: [coroutines, ranges, lifetimes]
requires:
  - coroutines-generator-is-a-view
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---

`std::generator<T>` never copies what the body yields: the iterator's
`operator*` returns {{c1::a reference to the yielded object::not a
copy — the member type `reference` says so}}, which usually lives in
the coroutine frame. Read it in the loop body; a reference kept across
`++it` is {{c2::dangling::the body has resumed and moved on}}, so store
a copy whenever a value must outlive the step.
