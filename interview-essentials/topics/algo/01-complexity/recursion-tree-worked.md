---
id: complexity-recursion-tree-worked
kind: basic
version: 1
level: 2
tags: [complexity, recurrences, worked-example]
requires:
  - technique-call-stack-worked
refs:
  - https://en.wikipedia.org/wiki/Recursion_tree
---

```cpp
void split(int n) { if (n > 1) { split(n / 2); split(n / 2); } }
```

`split(4)`, its calls drawn level by level:

| level | calls on this level | count |
| --- | --- | --- |
| 0 | `split(4)` | 1 |
| 1 | `split(2)`, `split(2)` | 2 |
| 2 | `split(1)` × 4, each returns at once | 4 |

7 calls in total.

## Why does each level hold twice as many calls as the one above it?

---

**Every call with n > 1 makes exactly two calls, one level down.**

So a level's count doubles until n reaches 1, where calls stop
branching. The calls form a tree: one root, each call a node, its two
calls its children.
