---
id: str-lexer-longest-match
kind: basic
version: 1
level: 4
tags: [strings, automata, compilers]
requires:
  - str-dfa-lexing
refs:
  - https://westes.github.io/flex/manual/Matching.html
---

## Tokens `<`, `<=` and `<=>`. On input `<=x` the lexer's DFA reads `<`, `=`, then has no move for `x`. How does it decide which token to emit?

---

**It remembers the last accepting state and position, and rewinds there: `<=`.**

It runs while transitions exist, then emits the last accept passed and
restarts after it. The rewind is bounded by the lookahead, not the
token: rules `a` and `a*b` on `aaaa…` rescan the run per token and go
quadratic. Equal-length ties go to the first rule.
