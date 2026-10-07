---
id: db-late-materialisation
kind: basic
version: 1
level: 4
tags: [databases, execution, layout]
requires:
  - db-columnar-encodings
refs:
  - https://www.cs.umd.edu/~abadi/papers/abadiicde2007.pdf
---

## A column engine filters on `a`, then on `b`, and returns `c`. When should it read `c` and stitch rows together?

---

**Last: carry the surviving row ids through the filters, then fetch `c` only for those.**

Each filter reads one narrow column and shrinks the id list. Building
rows first would read `c` for rows the filters then discard, and lose
the compact column format for every step after.
