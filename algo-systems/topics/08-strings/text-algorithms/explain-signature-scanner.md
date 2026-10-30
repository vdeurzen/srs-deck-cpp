---
id: str-explain-signature-scanner
kind: explain
version: 2
level: 5
tags: [strings, security, interview]
requires:
  - str-aho-corasick-linear
  - str-aho-corasick-output-links
  - str-regex-redos
refs:
  - https://doi.org/10.1145/360825.360855
  - https://swtch.com/~rsc/regexp/regexp1.html
elaborate: Where could a SIMD scan for rare bytes sit in front of the automaton, and when would it pay?
---
An intrusion-detection box must check a 10 Gb/s stream against 50 000
literal signatures plus a few hundred regexes written by customers. An
interviewer asks how you would build the matcher so that its cost per
byte stays bounded. Answer aloud.
---
- [ ] One Aho–Corasick automaton over all literals: one pass, the input pointer never moves back
- [ ] Its cost per byte does not grow with the signature count: one goto step plus amortised failure steps
- [ ] Output links report every signature ending at a byte, suffixes included, so the total is O(n + matches)
- [ ] A 50 000-signature trie outgrows the cache, so a step can be a miss: linear is not cheap
- [ ] Customer regexes run on an automaton engine like RE2, never a backtracker, which `(a+)+b`-shaped input makes exponential
