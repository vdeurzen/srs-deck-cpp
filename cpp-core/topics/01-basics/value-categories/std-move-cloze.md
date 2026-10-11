---
id: value-categories-std-move-cloze
kind: cloze
version: 1
level: 2
tags: [value-categories]
requires:
  - value-categories-taxonomy
refs:
  - https://en.cppreference.com/w/cpp/utility/move
---

`std::move(x)` does {{c1::not move anything}}: it is a
{{c2::static_cast to an rvalue reference}} of `x`. The result is an
{{c3::xvalue::a primary value category}}, so overload resolution now picks
`T&&` overloads.
