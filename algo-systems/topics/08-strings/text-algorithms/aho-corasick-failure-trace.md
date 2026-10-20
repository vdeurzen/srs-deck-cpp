---
id: str-aho-corasick-failure-trace
kind: trace
version: 2
level: 4
tags: [tracing, strings, automata]
probes:
  1: { f: "0" }
  2: { "fail[3]": "5" }
requires:
  - str-aho-corasick-failure-worked
  - str-aho-corasick
refs:
  - https://doi.org/10.1145/360825.360855
elaborate: Where else is a value computed from its parent's finished value, so that the order of the walk is forced?
---

The trie of `abc`, `b` and `c`. `go[s][c]` is the child of node `s` on
letter `c`, or 0; `fail[]` is already built for every node but 3.
Write nodes as their numbers.

```cpp
// nodes: 0 root, 1 a, 2 ab, 3 abc, 4 b, 5 c
// fail[1] = 0, fail[2] = 4, fail[4] = 0, fail[5] = 0
const int s = 2, c = 'c' - 'a', t = go[s][c];   // t == 3, "abc"
int f = fail[s];
while (f && !go[f][c]) f = fail[f];             // @1
fail[t] = go[f][c];                             // @2
```

---

`abc`'s link comes from its parent `ab`, whose link is `b` (node 4).
`b` has no `c` child, so the loop falls back once more, to the root,
and stops there. The root does have a `c` child, so `abc` links to
`c`, node 5: the longest suffix of `abc` that is in the trie.

Verified by compiling and running this code, with the trie built by
insertion, under GCC 16.2.
