---
id: tree-avl-balance-factor
kind: trace
version: 2
level: 2
tags: [trees, avl, invariants, tracing]
requires:
  - tree-avl-invariant
probes:
  1: { b5: "1", b3: "1" }
  2: { b5: "2", b3: "2" }
elaborate: Say in one sentence, as to an interviewer, why an insert can change balance factors only on its own search path.
refs:
  - https://en.wikipedia.org/wiki/AVL_tree#Balance_factor
---

`t` is the plain BST drawn below. `bf(t, k)` is the balance factor of
node k: height of its left subtree minus height of its right. `insert`
is a plain BST insert, no repair.

```cpp
//         5
//        / \
//       3   8
//      /
//     1
int b5 = bf(t, 5), b3 = bf(t, 3);   // @1
insert(t, 0);
b5 = bf(t, 5);  b3 = bf(t, 3);      // @2
```

---

An AVL tree allows only −1, 0 and +1. At probe 1 both 5 and 3 lean left
by one: legal. Inserting 0 under 1 adds a level on the path 5 → 3 → 1,
so every factor on that path grows by one, and **two** nodes reach +2.
8's side is untouched, so nothing off that path changes.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
