---
id: str-dfa-step
kind: basic
version: 1
level: 2
tags: [strings, automata]
refs:
  - https://doi.org/10.1147/rd.32.0114
  - https://swtch.com/~rsc/regexp/regexp1.html
elaborate: A hand-written `switch (state)` parser is a DFA in disguise. Where in your code does one hide?
---

## This DFA over bytes is in state `s` and reads byte `b`. How much work does that one step take?

```
          'a'   'b'
  s0  →   s1    s0
  s1  →   s1    s2     s2 accepts: input ends in "ab"
  s2  →   s1    s0
```

---

**One table lookup, `s = delta[s][b]`: exactly one next state, never a choice.**

Deterministic means every (state, byte) pair has a single successor, so
a run is one pass with no backtracking: a lookup per byte, accept if
the last state accepts. An NFA may be in several states at once and
must track them all.
