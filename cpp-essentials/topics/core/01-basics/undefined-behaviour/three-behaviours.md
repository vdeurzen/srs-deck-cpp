---
id: ub-three-behaviours
kind: cloze
version: 1
level: 1
tags: [undefined-behaviour]
requires:
  - ub-definition
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/defns.undefined
  - https://timsong-cpp.github.io/cppwp/n4950/defns.unspecified
  - https://timsong-cpp.github.io/cppwp/n4950/defns.impl.defined
---

In the standard's own terms, `sizeof(int)` is
{{c1::implementation-defined}} behaviour. Whether `f(g(), h())` calls `g`
or `h` first is {{c2::unspecified}} behaviour. Reading `a[8]` from
`int a[8];` is {{c3::undefined}} behaviour.
