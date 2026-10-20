---
id: err-channel-return-value
kind: cloze
version: 1
level: 2
tags: [error-handling, optional]
requires:
  - err-pick-a-channel
  - vocab-optional-maybe-value
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
  - https://en.cppreference.com/w/cpp/utility/optional
elaborate: Go returns `(value, err)` for this case; say what a C++ caller can forget that a Go caller cannot, or the other way round.
---

A channel is the route by which a function hands a failure to its caller.
`price_of(sku)` is often asked for a product code that does
not exist, and its caller checks for "unknown" on the very next line.
`price_of` reports that outcome through its {{c1::return value::a channel}}.

---

**The caller handles "unknown" at once, so it belongs in what the call
returns**, e.g. a `std::optional<int>` the caller must check. An exception
suits a failure handled many calls up; here it would turn an ordinary
answer into a jump the very next line has to catch.
