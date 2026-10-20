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

- [ ] Problem: a sentinel such as `-1` is an ordinary value the caller can forget to check
- [ ] Mechanism: `std::optional<T>` holds a `T` in place or nothing, so "maybe absent" is in the type
- [ ] Example: a parser returning `std::expected<int, PortError>` hands back the port or an error saying why
- [ ] Trade-off: every caller must check the result before using the value
- [ ] Contrast: `throw` instead when only code many calls up can react to the failure
