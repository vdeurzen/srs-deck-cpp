---
id: ub-three-behaviours
kind: cloze
version: 1
level: 1
tags: [undefined-behaviour]
requires:
  - ub-definition
  - types-size-minimums
elaborate: For each of the three, say aloud whether a test suite that passes today protects you on the next compiler.
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/defns.undefined
  - https://timsong-cpp.github.io/cppwp/n4950/defns.unspecified
  - https://timsong-cpp.github.io/cppwp/n4950/defns.impl.defined
---

In the standard's own terms, `sizeof(int)` is
{{c1::implementation-defined::one of three categories}} behaviour. Whether `f(g(), h())` calls `g`
or `h` first is {{c2::unspecified::one of three categories}} behaviour. Reading `a[8]` from
`int a[8];` is {{c3::undefined::one of three categories}} behaviour.
