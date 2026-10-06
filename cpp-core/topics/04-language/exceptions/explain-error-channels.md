---
id: exceptions-explain-error-channels
kind: explain
version: 1
level: 3
tags: [exceptions, error-handling]
requires:
  - exceptions-far-away-failure
  - vocab-optional-vs-expected
  - strings-from-chars
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
  - https://en.cppreference.com/w/cpp/utility/expected
---
A function can fail. Survey C++23's ways to report it (an exception,
`std::expected`, `std::optional`, an error code) by what the caller must do,
and say when you'd pick each.
---
- [ ] Exception: intermediate callers write nothing; the failure travels to a distant `catch`
- [ ] `std::expected<T, E>`: every caller must check, and the signature names the error type
- [ ] `std::optional<T>`: the caller must check but learns only "no value", which fits absence that isn't an error
- [ ] Error code (`std::errc` from `from_chars`, or a `bool` plus out-parameter): the caller must check and can silently forget unless it is `[[nodiscard]]`
- [ ] Picks by distance and frequency: exceptions for rare failures handled far away, value channels for expected ones handled by the caller
