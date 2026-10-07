---
id: tree-bst-insert-trace
kind: trace
version: 1
level: 2
tags: [trees, bst, tracing]
requires:
  - tree-bst-search-code
probes:
  1: { p: "40", d: "4" }
  2: { p: "40", d: "4" }
  3: { p: "45", d: "5" }
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Insertion
---

`insert(t, k)` is a plain BST insert. `parent(t, k)` is the key of k's
parent; `depth(t, k)` counts levels, the root being 1.

```cpp
Bst t;
for (int k : {50, 30, 70, 20, 40, 60, 80}) insert(t, k);

insert(t, 45);
int p = parent(t, 45), d = depth(t, 45);   // @1
insert(t, 35);
p = parent(t, 35);  d = depth(t, 35);      // @2
insert(t, 42);
p = parent(t, 42);  d = depth(t, 42);      // @3
```

---

Insert is a search that runs off the tree: the new key hangs from the
empty link where the search for it failed.

                50
              /    \
            30      70
           /  \    /  \
         20    40 60   80
              /  \
            35    45
                 /
               42

45 and 35 both turn left at 50 and right at 30, then split at 40. 42 goes
right at 40 and left at 45, a fifth level. Insert costs what a search
costs, O(h), and never moves an existing node.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
