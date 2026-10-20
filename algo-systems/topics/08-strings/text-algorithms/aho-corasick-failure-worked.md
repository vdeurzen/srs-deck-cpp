---
id: str-aho-corasick-failure-worked
kind: basic
version: 1
level: 4
tags: [strings, automata, worked-example]
requires:
  - str-aho-corasick
refs:
  - https://doi.org/10.1145/360825.360855
---

Failure links for the trie of `he` and `she`, built breadth-first. A
node's link is the longest proper suffix of its string that is also a
trie node (0 is the root, the empty string).

```
node  string  link  found how
1     h       0     depth 1: always the root
3     s       0     depth 1: always the root
2     he      0     link of h is root; no e
4     sh      1     link of s is root; has h
5     she     2     link of sh is h; has e
```

## Row 5: why is `she`'s link found by looking at `h`, the link of its parent `sh`?

---

**A suffix of `she` in the trie is a trie suffix of `sh`, plus `e`.**

So the candidates for `she` are the link chain of `sh`, tried longest
first, each extended by `e`: `h` has an `e` child, giving `he`. That is
why parents are linked before children: the BFS order.
