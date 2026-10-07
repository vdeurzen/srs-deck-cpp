---
id: tree-avl-balance-factor
kind: trace
version: 1
level: 2
tags: [trees, avl, invariants, tracing]
requires:
  - tree-avl-invariant
probes:
  1: { b5: "1", b3: "1" }
  2: { b5: "2", b3: "2", b1: "1" }
refs:
  - https://en.wikipedia.org/wiki/AVL_tree#Balance_factor
---

`bf(t, k)` is the balance factor of node k: height of its left subtree
minus height of its right. `insert` is a plain BST insert, no repair.

```cpp
//         5
//        / \
//       3   8
//      /
//     1
Bst t;
for (int k : {5, 3, 8, 1}) insert(t, k);
int b5 = bf(t, 5), b3 = bf(t, 3);                  // @1
insert(t, 0);
b5 = bf(t, 5);  b3 = bf(t, 3);  int b1 = bf(t, 1); // @2
```

---

An AVL tree allows only −1, 0 and +1. At probe 1 both 5 and 3 lean left
by one: legal. Inserting 0 under 1 adds a level on the path 5 → 3 → 1,
so every factor on that path grows by one, and **two** nodes reach +2.

Only the nodes on the insert path can change, so the repair walks back up
that path and fixes the **lowest** +2 or −2 node, here 3. A right
rotation there gives 1(0, 3), the subtree's old height, and 5 is back to
+1 without being touched.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
