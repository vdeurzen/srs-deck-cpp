---
id: str-suffix-array-vs-trie
kind: basic
version: 1
level: 4
tags: [strings, indexing, tries, contrast]
requires:
  - str-suffix-array
  - ordered-radix-trie
refs:
  - https://doi.org/10.1137/0222058
  - https://en.wikipedia.org/wiki/Trie
---

## A trie over a set of words and a suffix array over one text both answer prefix queries. What decides which one an index needs?

---

**The query: whole keys by prefix (trie), or any substring of one text (suffix array).**

A trie stores each key once and finds keys *starting* with a prefix. A
suffix array indexes every position of a text, so "contains `ana`"
becomes a prefix query on suffixes. Words → trie or inverted index;
DNA, logs, code search → suffix array.
