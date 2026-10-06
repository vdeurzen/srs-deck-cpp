---
id: types-int-width
kind: basic
version: 1
level: 1
tags: [types, integers]
refs:
  - https://en.cppreference.com/w/cpp/language/types#Properties
  - https://en.cppreference.com/w/cpp/types/integer
elaborate: Go's `int` is 32 or 64 bits depending on the platform; which Go types play the role of `std::int32_t`?
---

## A wire format needs a field exactly 32 bits wide. Is `int` guaranteed to be that size?

---

**No: `int` is only guaranteed at least 16 bits wide.** The standard fixes
minimum widths (`short` ≥ 16, `long` ≥ 32, `long long` ≥ 64), not exact
ones. For an exact width write `std::int32_t` from `<cstdint>`; it exists
on every platform that has such a type, and the build fails where it does not.
