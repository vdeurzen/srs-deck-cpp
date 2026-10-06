---
id: vocab-optional-vs-expected
kind: basic
version: 1
level: 2
tags: [vocabulary-types, optional, expected, error-handling]
requires:
  - vocab-expected-carries-error
refs:
  - https://en.cppreference.com/w/cpp/utility/optional
  - https://en.cppreference.com/w/cpp/utility/expected
---

## `cache.get(key)` misses about half the time, and a miss is normal. `std::optional<V>` or `std::expected<V, E>`?

---

**`std::optional<V>`: a miss is absence, not an error, and has no reason to
report.**

`expected` would force an error type whose only value is "not found", and
callers would read every miss as a failure. Reach for `expected` when there
are several reasons and the caller acts on them.
