---
id: err-channel-return-value
kind: cloze
version: 2
level: 2
tags: [error-handling, channels]
requires:
  - err-pick-a-channel
  - err-assert-basics
  - vocab-optional-maybe-value
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
  - https://en.cppreference.com/w/cpp/utility/optional
elaborate: Say what a caller can still get wrong with a returned `std::optional<int>`, and how that mistake would show up at run time.
---

A channel is the route by which a function hands a failure to its caller.
`price_of(sku)` is often asked for a product code that does
not exist, and its caller checks for "unknown" on the very next line.
Of `assert`, `throw` and the return value, `price_of` reports that
outcome with {{c1::the return value::one of the three}}.

---

**The caller handles "unknown" at once, so it belongs in what the call
returns**, e.g. a `std::optional<int>` the caller must check. A `throw`
would turn an ordinary answer into a jump the next line has to catch;
`assert` is for bugs, and an unknown code is ordinary input.
