---
id: hash-perfect-hashing
kind: basic
version: 1
level: 4
requires:
  - hash-chaining-vs-open-addressing
tags: [hashing, compilers, static-sets]
refs:
  - https://www.gnu.org/software/gperf/manual/gperf.html
  - https://cmph.sourceforge.net/papers/esa09.pdf
---

## Your key set is fixed at build time — the 100 keywords of a language. What can you do that a general hash table cannot?

---

Build a **perfect hash function**: one that maps those exact keys to
distinct slots with *no* collisions. Since the keys are known, the
collision resolution can be moved from run time to build time.

- **Perfect**: no collisions, so a lookup is one hash, one array read
  and one comparison to confirm the key (still needed — a key *outside*
  the set can map anywhere).
- **Minimal perfect**: additionally maps `n` keys onto exactly
  `0..n−1`, so the table has no empty slots. Modern constructions (CHD,
  BBHash, PTHash) reach ~2–3 bits of index per key, are built in linear
  time, and are the standard tool for static dictionaries with millions
  of keys.

The compiler-flavoured version is `gperf`, which is how a lexer
recognises keywords: it searches for a function of the form
"length plus a few character positions, looked up in a small
associative array" that separates the keyword set, and emits it as C.
Distinguishing `while` from `whiel` then costs a length check, two
table lookups and one `strcmp` — no probing, no branches on the hash,
and the tables live in read-only memory shared between processes.

Where it pays elsewhere: static routing tables, SQL keyword sets,
opcode tables in an interpreter, and any read-only index shipped as a
build artefact (a search engine's term dictionary, a spell checker).

The constraints are the obvious ones. The key set must be known and
*fixed* — one new keyword means regenerating the function — and
construction is randomised, so build times have a tail. For a set that
changes at run time you are back to an ordinary table; for one that
changes once per release, you are compiling a data structure the same
way you compile code.
