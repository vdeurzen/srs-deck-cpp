---
id: compiler-hash-consing
kind: basic
version: 1
level: 5
tags: [compilers, ir, hashing]
requires:
  - compiler-gvn-hash-consing
refs:
  - https://en.wikipedia.org/wiki/Hash_consing
  - https://www.lri.fr/~filliatr/ftp/publis/hash-consing2.pdf
elaborate: Once structurally equal nodes are one object, a memo table keyed by node pointer serves any analysis. What must you do about table growth?
---

## An IR builds every node through a factory that looks `(op, children)` up in a hash table first. What happens to common-subexpression elimination?

---

**It happens at construction: identical expressions are the same node.**

Equality becomes a pointer comparison and shared subtrees are stored
once. The price: a hash lookup per construction, and nodes must be
immutable, since mutating a shared node would change every user.
