---
id: linear-adt-vs-implementation
kind: basic
version: 1
level: 1
tags: [foundations, adt]
refs:
  - https://doi.org/10.1145/942572.807045
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 10
---

## A program uses a library's `IdSet` only through `add(id)` and `contains(id)`. Which of these library changes can alter what the program computes?

```text
(a) the ids move from an array into a chain of linked nodes
(b) add(id) now silently ignores ids above 1000
(c) contains(id) becomes ten times slower
```

---

**Only (b): it changes what an operation promises.**

The operations and their promised results form an *abstract data type*
(ADT). (a) swaps the *implementation* and (c) changes a cost; neither
changes a result, so the caller's code stays correct untouched.
