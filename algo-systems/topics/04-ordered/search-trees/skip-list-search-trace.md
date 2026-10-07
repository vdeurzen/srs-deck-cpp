---
id: ordered-skip-list-search-trace
kind: trace
version: 1
level: 4
tags: [trees, randomised, tracing]
requires:
  - ordered-skip-list
probes:
  1: { at: "12", steps: "1" }
  2: { at: "12", steps: "1" }
  3: { at: "19", steps: "2" }
refs:
  - https://dl.acm.org/doi/10.1145/78973.78977
---

The node heights are fixed here, not drawn at random. `walk(at, lvl, key)`
moves right along level `lvl` while the next node's key is smaller than
`key`, counting each move in `steps`, and returns the node it stops on.
Trace a search for 25, writing `at` as the key of the node it points to.

```cpp
// level 2:  head ------------> 12 ----------------> 31
// level 1:  head -----> 7 ---> 12 ---------> 25 --> 31
// level 0:  head -> 3 -> 7 --> 12 -> 19 ---> 25 --> 31
int steps = 0;
Node* at = head;
at = walk(at, 2, 25);   // @1
at = walk(at, 1, 25);   // @2
at = walk(at, 0, 25);   // @3
// the answer is at->next[0]: 25
```

---

Probe 1: the top level jumps straight to 12; 31 is not smaller than 25.
Probe 2 is the step people get wrong: on level 1 the next node *is* 25,
which is not smaller than the key, so the search drops a level without
moving. Probe 3: level 0 moves to 19 and stops in front of 25. The search
stops one node *before* the key at every level, which is exactly the
node an insert would splice after.

Verified by compiling and running an instrumented copy (same heights,
array-based nodes) under GCC 16.2 (`g++ -std=c++23 -Wall -Wextra`).
