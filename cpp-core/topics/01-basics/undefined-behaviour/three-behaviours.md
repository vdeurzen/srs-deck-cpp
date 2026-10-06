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

The standard leaves an implementation three kinds of freedom, and only one
of them is dangerous. `sizeof(int)` is
{{c1::implementation-defined::the vendor's call}}: every conforming
compiler chooses a value and writes it down. Whether `f(g(), h())` calls
`g` or `h` first is {{c2::unspecified::a known set of outcomes, nothing to
document}}: each call behaves as one of the allowed orders, and a correct
program is correct under either. Indexing one past the end of an array is
{{c3::undefined::the standard washes its hands}}: nothing about the whole
run is promised any more.
