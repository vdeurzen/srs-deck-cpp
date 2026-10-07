---
id: str-aho-corasick-output-links
kind: basic
version: 1
level: 4
tags: [strings, automata]
requires:
  - str-aho-corasick
refs:
  - https://doi.org/10.1145/360825.360855
---

## Patterns `he` and `she`, text `she`. The scan ends in the trie node for `she`. Which match is lost if the node only reports its own pattern?

---

**`he`: it ends at the same position, on a different trie branch.**

Every pattern that is a suffix of the current node's string ends here
too. Each node's output link points to the nearest node on its failure
chain that ends a pattern, so reporting walks only matches, not the
whole failure chain.
