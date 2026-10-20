---
id: vocab-mixed-load-config
kind: basic
version: 1
level: 3
tags: [vocabulary-types, error-handling, mixed-recognition]
requires:
  - vocab-expected-carries-error
  - err-pick-a-channel
elaborate: Say which of your own functions fails in ways its direct caller handles, and which in ways only code far up can handle.
refs:
  - https://en.cppreference.com/w/cpp/utility/expected
---

## `load_config(path)` fails when the file is missing, unreadable or malformed, and its caller retries only the first. Which C++23 return type?

---

**`std::expected<Config, LoadError>`: it carries which failure happened.**

Cue: several reasons, told apart by the very next caller. `std::optional`
would say only "no config"; an exception suits a failure that only code
many calls up can handle.
