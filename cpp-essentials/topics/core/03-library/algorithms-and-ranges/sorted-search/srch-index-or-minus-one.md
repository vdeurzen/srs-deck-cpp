---
id: srch-index-or-minus-one
kind: basic
version: 1
level: 3
tags: [algorithms, searching]
requires:
  - srch-absent-key
elaborate: Say why `std::binary_search`, which returns a `bool`, can't give the index, and when it is the right call after all.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/binary_search
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
---

A function must return the index of 7 in a sorted `std::vector<int> v`,
or −1 if 7 is absent. `std::binary_search(v.begin(), v.end(), 7)`
reports whether 7 is present.

## Which call, followed by which check, gives the index or −1?

---

**`it = std::lower_bound(v.begin(), v.end(), 7)`, then if `it != v.end() && *it == 7`, return `it - v.begin()`, else −1.**

`lower_bound` gives the first element not less than 7, which may be
`end()` or a larger value, so both checks come before the index is read,
`end()` first so that `*it` is never read there.
