---
id: ranges-views-composition-cloze
kind: cloze
version: 2
level: 2
tags: [ranges]
requires:
  - ranges-what-is-a-view
refs:
  - https://en.cppreference.com/w/cpp/ranges/filter_view
---

`v | std::views::filter(pred) | std::views::transform(fn)` chains view
adaptors with the {{c1::pipe operator::a name}}. It is equivalent to
`std::views::transform(std::views::filter(v, pred), fn)`, where the
adaptor applied first is written {{c2::innermost::a position in the
nesting}}.
