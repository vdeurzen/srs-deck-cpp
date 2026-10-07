---
id: db-count-min-relative-error
kind: basic
version: 1
level: 4
tags: [databases, sketches, probabilistic, streaming]
requires:
  - db-count-min-sketch
refs:
  - http://dimacs.rutgers.edu/~graham/pubs/papers/cm-full.pdf
---

## A count-min sketch over 10 M events overestimates by at most εN with probability 1 − δ, with ε = 0.001. Why is it accurate for heavy hitters but not for rare keys?

---

**The bound is 10 000 events for every key: tiny beside a heavy hitter, swamping a rare one.**

εN scales with the whole stream, not the key. A key with 500 000 events
is within 2 %; a key seen 10 times may read 10 010. Width `⌈e/ε⌉` sets
ε; depth `⌈ln 1/δ⌉` sets the failure odds δ.
