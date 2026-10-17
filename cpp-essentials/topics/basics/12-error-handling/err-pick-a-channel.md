---
id: err-pick-a-channel
kind: cloze
version: 1
level: 2
tags: [error-handling, exceptions]
requires:
  - err-throw-jumps-to-catch
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
  - https://en.cppreference.com/w/cpp/language/throw
---

`read_port()` finds the config file missing. The only code that can react
is in `main`, ten calls up, and the nine functions in between should need
no new code to pass the failure on. `read_port` reports it with
{{c1::`throw`::a keyword}}.
