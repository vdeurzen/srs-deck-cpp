---
id: err-pick-a-channel
kind: cloze
version: 1
level: 2
tags: [error-handling, exceptions, assert]
requires:
  - err-assert-vanishes-ndebug
  - err-throw-jumps-to-catch
refs:
  - https://en.cppreference.com/w/cpp/error/assert
  - https://en.cppreference.com/w/cpp/language/exceptions
---

Three failures, three tools. `pop()` on an empty stack means the calling
code has a bug: state the precondition with {{c1::`assert`::a macro}}. The
config file is missing, and the only function that can react is ten calls
up: {{c2::throw an exception::needs no code in the frames between}}. A
lookup where "not found" is a normal result the caller checks on the next
line: {{c3::return it as a value::part of the function's signature}}, for
example a `bool`, an error code or an empty `std::optional`.
