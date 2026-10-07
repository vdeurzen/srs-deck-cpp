---
id: str-string-interning
kind: basic
version: 1
level: 4
tags: [strings, compilers, memory]
requires:
  - hash-chaining-vs-open-addressing
refs:
  - https://llvm.org/docs/ProgrammersManual.html#llvm-adt-stringmap-h
  - https://clang.llvm.org/docs/InternalsManual.html#the-lexer-and-preprocessor-library
elaborate: Hash-consing interns whole expression trees the same way. What does it turn common-subexpression detection into?
---

## Why does every compiler intern its identifiers?

---

**Identifier equality becomes one integer or pointer compare instead of a `memcmp`.**

A front end compares names constantly: lookup, overload resolution,
type names. The interned id is also a trivial hash key and an index
into dense per-symbol arrays, and each spelling is stored once. Clang's
`IdentifierTable` hands out one `IdentifierInfo` per spelling.
