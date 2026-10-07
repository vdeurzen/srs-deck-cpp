---
id: str-explain-signature-scanner
kind: explain
version: 1
level: 5
tags: [strings, automata, simd, security]
requires:
  - str-aho-corasick-linear
  - str-aho-corasick-output-links
  - str-regex-redos
refs:
  - https://doi.org/10.1145/360825.360855
  - https://swtch.com/~rsc/regexp/regexp1.html
---
An intrusion-detection box must check a 10 Gb/s stream against 50 000
literal signatures plus a few hundred regexes written by customers.
Walk through the matcher you would build and what bounds its cost per
byte.
---
- [ ] One Aho–Corasick automaton over all literals: one pass, the input pointer never moves back, cost independent of the signature count
- [ ] Output links report every signature ending at a position, including ones that are suffixes of others
- [ ] A dense goto table gives one lookup per byte but outgrows the cache at this size; a compressed trie trades lookups for misses, so measure
- [ ] Customer regexes go to an automaton engine (RE2-style), never a backtracking one, since `(a+)+b`-shaped input costs exponential time
- [ ] Optional SIMD prefilter: scan for rare bytes into a bitmask and wake the automaton only near candidates, with padded or scalar tails
