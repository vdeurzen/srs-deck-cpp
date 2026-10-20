---
id: ordered-skip-list-search-trace
kind: trace
version: 2
level: 4
tags: [trees, randomised, tracing]
requires:
  - ordered-skip-list-search-worked
  - ordered-skip-list
probes:
  1: { at: "12" }
  2: { at: "12" }
  3: { at: "19" }
refs:
  - https://dl.acm.org/doi/10.1145/78973.78977
elaborate: Where would an insert of 22 splice in on level 0, and which node tells you?
---

The node heights are fixed here, not drawn at random. `walk(at, lvl, key)`
moves right along level `lvl` while the next node's key is smaller than
`key`, and returns the node it stops on. Trace a search for 25, writing
`at` as the key of the node it points to.

```cpp
// level 2:  head ---------> 12 -----------------> 31
// level 1:  head --> 7 ---> 12 ---------> 25 ---> 31
// level 0:  head --> 7 ---> 12 --> 19 --> 25 ---> 31
Node* at = head;
at = walk(at, 2, 25);   // @1
at = walk(at, 1, 25);   // @2
at = walk(at, 0, 25);   // @3
```

---

Level 2 jumps straight to 12; 31 is not smaller than 25. Probe 2 is the
step people get wrong: on level 1 the next node *is* 25, which is not
smaller than the key, so the search drops a level without moving. Level
0 moves to 19 and stops in front of 25, which is `at->next[0]`.

Verified by compiling and running an instrumented copy (same heights)
under GCC 16.2 (`g++ -std=c++23 -Wall -Wextra`).
