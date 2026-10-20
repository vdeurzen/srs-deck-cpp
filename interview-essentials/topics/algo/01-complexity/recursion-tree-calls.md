---
id: complexity-recursion-tree-calls
kind: basic
version: 2
level: 2
tags: [complexity, recurrences]
requires:
  - complexity-recursion-tree-worked
  - complexity-log-halvings
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

n halves log₂ 16 = 4 times: 5 levels. With one recursive call the
tree is a path of 5 calls, O(log n); two children fill it out to n
leaves, O(n).
(Run under GCC 16.2.)
