---
id: db-encoded-predicates
kind: cloze
version: 1
level: 4
tags: [databases, compression, execution]
requires:
  - db-columnar-encodings
refs:
  - https://www.cidrdb.org/cidr2005/papers/P19.pdf
  - https://dl.acm.org/doi/10.1145/1142473.1142548
---

On a dictionary-encoded column, `WHERE country = 'NL'` looks up `'NL'`
once and then compares each row's {{c1::code::a small integer}}, many per
SIMD instruction. On a run-length-encoded column, a predicate is
evaluated once per {{c2::run::not per row}}, and `COUNT(*)` of the
matches is a sum of run lengths.
