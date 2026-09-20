---
id: ranges-views-composition-cloze
kind: cloze
version: 1
level: 2
tags: [ranges]
refs:
  - https://en.cppreference.com/w/cpp/ranges/filter_view
---

`v | std::views::filter(pred) | std::views::transform(fn)` chains view
adaptors with the {{c1::pipe operator::`operator|`}}, read left to right
as "take `v`, then filter it, then transform the result". This mirrors
shell pipelines and is equivalent to the more nested
{{c2::std\::views\::transform(std\::views\::filter(v, pred), fn)::function-call
form}}, which is why the pipe syntax exists at all: it reads in the same
order the data actually flows.
