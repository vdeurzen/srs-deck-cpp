---
id: tree-insert-order-trace
kind: trace
version: 1
level: 2
tags: [trees, tracing, complexity]
requires:
  - tree-bst-insert-trace
probes:
  1: { h1: "3" }
  2: { h2: "7" }
  3: { h3: "4" }
refs:
  - https://en.wikipedia.org/wiki/Binary_search_tree
---

`insert(t, k)` adds `k` to a plain (unbalanced) BST and returns the new
node's depth, the root being depth 1. Each loop builds a fresh tree from
the same seven keys. What height does each tree reach?

```cpp
Bst a, b, c;
int h1 = 0, h2 = 0, h3 = 0;

for (int k : {4, 2, 6, 1, 3, 5, 7}) h1 = std::max(h1, insert(a, k));
// @1
for (int k : {1, 2, 3, 4, 5, 6, 7}) h2 = std::max(h2, insert(b, k));
// @2
for (int k : {2, 1, 4, 3, 6, 5, 7}) h3 = std::max(h3, insert(c, k));
// @3
```

---

Probe 1: the median first, then the quartiles, builds the perfect tree:
height 3, the minimum for 7 nodes. Probe 2: sorted input makes each key
the right child of the previous one: height 7, a list.

Probe 3 is the surprise: swapping neighbouring pairs is *almost* sorted,
yet the tree is still a right spine with one left leaf per step:

      2
     / \
    1   4
       / \
      3   6
         / \
        5   7

Its height grows as n/2 + 1 (501 for 1000 keys). Nearly sorted is as bad
as sorted, up to a constant.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
