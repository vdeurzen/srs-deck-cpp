---
id: vocab-explain-signatures
kind: explain
version: 1
level: 3
tags: [vocabulary-types, error-handling]
requires:
  - vocab-expected-and-then
  - cpp-essentials/vocab-span-parameter
  - cpp-essentials/vocab-visit-missing-handler
elaborate: Pick a function in your own code that returns `-1`, `nullptr` or a `bool` flag; which vocabulary type would its signature use instead?
refs:
  - https://en.cppreference.com/w/cpp/utility
---
A colleague asks how C++23's vocabulary types let a function signature say
what the caller gets back or lends. Explain it to them.
---
- [ ] `std::optional<T>` says "a value or nothing", replacing sentinels like `-1` a caller could mistake for data
- [ ] `std::expected<T, E>` says "a value or a typed error"; the error, built with `std::unexpected`, can't pass for a value
- [ ] Callers chain `expected`-returning steps with `and_then`, and the first error skips the rest
- [ ] `std::span<const T>` lends any contiguous range without a copy; it owns nothing, so the caller keeps the data alive
- [ ] `std::variant<A, B, C>` returns one of a closed set; `std::visit` makes an unhandled alternative a compile error
