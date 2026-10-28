---
id: rng-member-pointer-search
kind: basic
version: 1
level: 3
tags: [algorithms, ranges, searching]
requires:
  - rng-two-arg-projection
  - srch-lower-bound-insert
elaborate: Say which other algorithm you would call with `&Trade::time` as its projection, and what it would give.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/ranges/lower_bound
  - https://en.cppreference.com/w/cpp/language/pointer#Pointers_to_data_members
---

`&Trade::time`, a pointer to data member, used as a projection maps each
`Trade` to its `time`.

```cpp
struct Trade { int id; int time; };
std::vector<Trade> trades{{7, 900}, {4, 930}, {9, 945}};  // sorted by time
auto it = std::ranges::lower_bound(trades, 935, {}, &Trade::time);
int found = (*it).id;
```

## What is `found`?

---

**9: lower_bound compares each trade's `time` with 935, not the whole `Trade`.**

The first `time` not less than 935 is 945, trade 9. The value 935 is a
key, not a `Trade`: the projection turns elements into keys, and the
range only needs to be sorted by that key.
