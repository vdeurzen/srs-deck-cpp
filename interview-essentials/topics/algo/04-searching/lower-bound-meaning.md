---
id: search-lower-bound-meaning
kind: basic
version: 1
level: 2
tags: [binary-search, lower-bound]
requires:
  - search-half-open-invariant
  - cpp-essentials/iter-end-one-past
elaborate: "Say in one sentence why returning 'where the key would go' is more useful than a plain yes or no."
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
---

## `std::lower_bound` on `{1, 3, 3, 3, 5, 8}` for 3 returns index 1 (it returns an iterator; its index is the distance from `begin()`). What does it return for 4, which is absent?

---

**Index 4 (the 5): the first element not less than the key.**

It never answers "absent"; it returns where the key *would* go to keep
the order, so check `i != n && a[i] == key` for membership. With
duplicates it lands on the first copy.
