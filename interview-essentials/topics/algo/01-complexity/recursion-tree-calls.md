---
id: complexity-recursion-tree-calls
kind: basic
version: 2
level: 2
tags: [complexity, recurrences]
requires:
  - complexity-log-halvings
  - technique-call-stack-worked
elaborate: "How would the count change with three recursive calls instead of two, and where have you met a recursion that branches like that?"
refs:
  - https://en.wikipedia.org/wiki/Recursion_tree
  - https://dl.acm.org/doi/10.1145/1008861.1008865
---

## How many calls does `split(16)` make in total, counting itself?

```cpp
void split(int n) { if (n > 1) { split(n / 2); split(n / 2); } }
```

---

**31 = 2n − 1: level k has 2ᵏ calls, 1 + 2 + 4 + 8 + 16.**

Small case: `split(2)` makes 3 calls. With one recursive call
instead, the tree is a path (16, 8, 4, 2, 1: 5 calls,
O(log n)); two children fill it out to n leaves, O(n).
(Run under GCC 16.2.)
