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

`std::generator<T>`'s iterator hands out each yielded object as
{{c1::a reference::what `operator*` returns}} — the object itself
usually lives in the coroutine frame. Read it in the loop body; one kept
across `++it` is {{c2::dangling::a state of the reference}}, so
initialise a `T` from it whenever a value must outlive the step.
