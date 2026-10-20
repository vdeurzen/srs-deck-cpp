---
id: vocab-mixed-price-cache
kind: basic
version: 1
level: 3
tags: [vocabulary-types, mixed-recognition]
requires:
  - vocab-optional-maybe-value
  - ptr-dangling
elaborate: Say which lookup in your own code returns a pointer for "maybe", and what could make that pointer dangle.
refs:
  - https://en.cppreference.com/w/cpp/utility/optional
---

## `cache.get(key)` returns a copy of the cached `Price`, or nothing when the key was never cached; misses are routine and need no explanation. Which return type?

---

**`std::optional<Price>`: a miss is plain absence, with no reason to report.**

Cue: one kind of "nothing". A `Price*` into the cache would also say
"maybe", but it dangles once the entry is evicted; `std::expected` adds
an error the caller has no use for.
