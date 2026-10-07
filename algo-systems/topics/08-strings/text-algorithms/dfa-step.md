---
id: str-dfa-step
kind: basic
version: 2
level: 2
tags: [strings, automata]
refs:
  - https://doi.org/10.1147/rd.32.0114
  - https://swtch.com/~rsc/regexp/regexp1.html
elaborate: A hand-written `switch (state)` parser is a DFA in disguise. Where in your code does one hide?
---

## This DFA starts in `s0` and reads the input `ab`. Which state is it in afterwards?

```
          'a'   'b'
  s0  →   s1    s0
  s1  →   s1    s2     s2 accepts: input ends in "ab"
  s2  →   s1    s0
```

---

**`s2`, an accepting state: `s0 –a→ s1 –b→ s2`.**

Each step is one table lookup, `s = delta[s][byte]`. Deterministic means
every (state, byte) pair has a single successor, so a run is one pass
with no backtracking. An NFA may be in several states at once and
must track them all.
