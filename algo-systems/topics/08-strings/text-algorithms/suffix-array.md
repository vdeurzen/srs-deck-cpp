---
id: str-suffix-array
kind: basic
version: 1
level: 5
tags: [strings, indexing, databases]
requires:
  - ordered-lower-bound-loop
refs:
  - https://en.wikipedia.org/wiki/Suffix_array
  - https://en.wikipedia.org/wiki/LCP_array
---

## What is a suffix array, why did it displace the suffix tree, and what does the LCP array add?

---

A suffix array is the list of **all starting positions of a string's
suffixes, sorted lexicographically** — one integer per position, and
nothing else. Searching for a pattern is then a binary search over the
suffixes: O(m log n) with plain comparisons, O(m + log n) with the LCP
array.

It displaced the suffix tree for engineering reasons, not asymptotic
ones. A suffix tree answers more queries in O(m), but costs 20+ bytes
per character in pointers and nodes, with terrible locality; a suffix
array is 4 bytes per character in one contiguous block, and its binary
search touches a handful of cache lines. Linear-time constructions
exist for both (SA-IS is the practical one for arrays, and it is
simple enough to fit on a page).

The **LCP array** stores the longest common prefix of each pair of
adjacent suffixes. With it you can:

- Skip re-comparing known-equal prefixes during the binary search,
  giving O(m + log n).
- Find the **longest repeated substring** in O(n) — it is the maximum
  LCP entry.
- Count distinct substrings, find the longest common substring of
  several strings, and simulate most suffix-tree traversals by treating
  LCP intervals as nodes.

Kasai's algorithm computes the LCP array in O(n) from the suffix array,
which is the reason the pair is always built together.

Where these appear outside bioinformatics: full-text search indexes
where the query is a substring rather than a word (so an inverted index
will not do), `grep`-like tooling over a fixed corpus, code clone and
plagiarism detection, and compression — the **Burrows–Wheeler
transform** is the character preceding each suffix, read in
suffix-array order, which is what makes
bzip2 and the FM-index work. The FM-index in turn gives you a
*compressed* self-index: substring search in space close to the
compressed text, which is how modern read aligners and some
column-store text indexes are built.
