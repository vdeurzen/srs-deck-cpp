---
id: search-half-open-invariant
kind: cloze
version: 1
level: 2
tags: [binary-search, invariants]
requires:
  - search-binary-search-trace
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://www.cs.utexas.edu/~EWD/ewd08xx/EWD831.PDF
---

A binary search over `a[0..n)` keeps `lo` and `hi` so that every element
in `a[0..lo)` is {{c1::less than `key`::compared with the key}} and every
element in `a[hi..n)` is not. When `a[mid] < key`, it sets
{{c2::`lo = mid + 1`::which bound, and to what?}}. It stops when `lo == hi`,
because then every element has been classified.

---

Example: `{2, 5, 8, 12}`, key 8. `mid = 2` and `a[2] = 8` is not less,
so `hi = 2`; `mid = 1` and `5 < 8`, so `lo = 2`. Now `lo == hi == 2`:
nothing is left unclassified, and `lo` is the first element not less
than the key.
