---
id: hash-keyed-hash
kind: basic
version: 1
level: 4
requires:
  - hash-avalanche
  - algo-basics/hashing-average-vs-worst
tags: [hashing, security]
refs:
  - https://www.usenix.org/legacy/events/sec03/tech/full_papers/crosby/crosby.pdf
  - https://www.aumasson.jp/siphash/siphash.pdf
elaborate: "Which of your services hash something a client chose: a header name, a JSON key, a query parameter?"
---

## A server hashes request parameter names with a strong mixer such as `fmix64`. Why can an attacker still make every name collide?

---

**The mixer is public and fixed, so colliding keys can be computed offline.**

`fmix64` is even invertible. Defence needs a **keyed** hash with a
per-process random seed (SipHash, the default in Python and Rust), so
the attacker cannot predict which keys collide.
