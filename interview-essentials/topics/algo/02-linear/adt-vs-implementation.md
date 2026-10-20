---
id: linear-adt-vs-implementation
kind: basic
version: 2
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
(c) add(id) now keeps the stored ids sorted
```

---

**Only (b): it breaks the abstract data type (ADT), the operations' promised results.**

(a) and (c) change the *implementation*, how the ids are stored. No
promised result changes, so `contains` answers exactly as before and
the caller's code stays correct untouched.
