---
id: vocab-explain-failure-as-value
kind: explain
version: 1
level: 3
tags: [vocabulary-types, optional, expected, error-handling]
requires:
  - vocab-optional-maybe-value
  - vocab-expected-carries-error
  - err-channel-return-value
  - err-pick-a-channel
refs:
  - https://en.cppreference.com/w/cpp/utility/optional
  - https://en.cppreference.com/w/cpp/utility/expected
elaborate: Pick a function of yours that returns `-1` or an empty value on failure; which return type would you give it now?
---

An interviewer asks how a C++23 function should tell its caller it found
nothing or failed. Answer them.

---

- [ ] A sentinel such as `-1` is an ordinary value the caller can forget to check
- [ ] `std::optional<T>` holds a `T` in place or nothing, so "maybe absent" is in the type
- [ ] `std::expected` holds the value or an error saying why, such as a parser's port or `PortError`
- [ ] Either way the caller must check the result before using the value, and the type shows it
- [ ] Use `throw` instead when only code many calls up can react to the failure
