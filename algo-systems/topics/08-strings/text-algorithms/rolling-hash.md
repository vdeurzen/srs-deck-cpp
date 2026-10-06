---
id: str-rolling-hash
kind: basic
version: 1
level: 4
tags: [strings, hashing, storage]
refs:
  - https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm
  - https://en.wikipedia.org/wiki/Rolling_hash
---

## What makes a hash "rolling", and what is it used for beyond Rabin–Karp?

---

The hash of a window can be updated in O(1) when the window slides: for
a polynomial hash `H = Σ s[i]·B^(k−1−i) mod M`, sliding one character
right is `H = (H − s[out]·B^(k−1))·B + s[in]`, all mod M. No re-reading
of the window — which is what turns "hash every k-length substring"
from O(nk) into O(n).

**Rabin–Karp** is the direct application: compare hashes, and on a hash
match verify the actual characters. Expected O(n + m); worst case
O(nm) if an adversary produces collisions, which is why `M` should be
large and, for untrusted input, randomly chosen per run.

The two applications that matter more in systems work:

- **Content-defined chunking.** Slide a rolling hash (Rabin
  fingerprint, or the cheaper Gear/FastCDC variants) over a file and
  cut a chunk boundary wherever the low `n` bits of the hash are zero.
  Boundaries then depend on *content*, not offset, so inserting a byte
  at the start shifts only one chunk instead of every chunk — which is
  exactly what makes borg, restic, casync and most backup systems
  efficient. Fixed-size blocks would re-transmit everything after the
  insertion. rsync uses a rolling hash differently: it keeps
  fixed-size blocks of the old file and searches for them at every byte
  offset of the new one, so an insertion costs one shifted match rather
  than a full re-transmit.
- **Substring equality in O(1) after O(n) preprocessing.** Precompute
  prefix hashes and powers, and any substring's hash is a subtraction
  and a multiply — the basis of suffix comparison, longest-common-prefix
  binary search, and deduplication of repeated segments in a log or a
  column.

Two pitfalls. Modular arithmetic in 64 bits overflows unless you use
`unsigned` (defined wrap-around) or a Mersenne prime with careful
reduction — signed overflow is undefined behaviour, and this is one of
the places it actually bites. And single-hash comparison without
verification is a **probabilistic** equality test: at 64 bits and a
billion comparisons, collisions are rare but not impossible, so decide
deliberately whether your use can tolerate one.
