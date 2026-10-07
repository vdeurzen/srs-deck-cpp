---
id: str-regex-redos
kind: basic
version: 1
level: 4
tags: [strings, automata, security, misconception]
requires:
  - str-dfa-lexing
refs:
  - https://swtch.com/~rsc/regexp/regexp1.html
  - https://github.com/google/re2/wiki/WhyRE2
elaborate: Which regex in your services runs on user-supplied input — and which engine evaluates it?
---

## In CPython 3.14, `re.match(r'(a+)+b', 'a' * n)` takes twice as long for every extra `a`. Go's `regexp` answers the same match in microseconds. What is the difference?

---

**CPython backtracks through exponentially many splits; Go simulates the automaton in O(n·m).**

A backtracking engine tries every way to divide the `a`s between the
two `+`s before failing. Go and RE2 track the set of NFA states per
byte, never rereading input. The price: no backreferences or
lookaround. Run untrusted input through an automaton engine.
