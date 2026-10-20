---
id: technique-backtracking-worked
kind: basic
version: 1
level: 2
tags: [backtracking, recursion, worked-example]
requires:
  - technique-backtracking-undo
refs:
  - https://doi.org/10.1145/321296.321300
  - https://en.wikipedia.org/wiki/Backtracking
---

Every ordering of {a, b}. At each level: **choose** a free letter (mark
it, append it), **explore** (recurse), **un-choose** (unmark it, remove
it).

| step | built so far | marked | next |
| --- | --- | --- | --- |
| choose a | a | a | explore |
| choose b | ab | a, b | full: output ab |
| un-choose b, then a | (empty) | none | try the next letter |
| choose b | b | b | explore |
| choose a | ba | a, b | full: output ba |

## Why can the last row choose `a`, though the first row marked it?

---

**The third row un-chose it: each branch unmarks what it marked before returning.**

So the branch starting with b sees the same free letters the branch
starting with a saw. One shared set of marks serves the whole search,
because every return restores it.
