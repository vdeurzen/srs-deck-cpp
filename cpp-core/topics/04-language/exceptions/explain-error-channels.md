---
id: exceptions-explain-error-channels
kind: explain
version: 2
level: 3
tags: [exceptions, error-handling]
requires:
  - exceptions-far-away-failure
  - vocab-optional-vs-expected
  - strings-from-chars
elaborate: Pick a function in your own code that can fail; which channel does it use now, and would you change it?
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
  - https://en.cppreference.com/w/cpp/utility/expected
---
An interviewer asks how you decide the way a C++23 function reports failure
to its caller. Explain it to them.
---
- [ ] An exception suits a rare failure handled far away: no caller in between writes anything
- [ ] `std::expected<T, E>` suits failure the direct caller handles: it must check, and the signature names the error
- [ ] `std::optional<T>` suits absence that is not an error, such as a cache miss, with no reason to report
- [ ] An error code, like `from_chars`'s `std::errc`, also reports at the call, without throwing or allocating
- [ ] So the deciding questions are how far away the failure is handled, and how often it happens
