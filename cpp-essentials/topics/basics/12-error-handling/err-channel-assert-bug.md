---
id: err-channel-assert-bug
kind: cloze
version: 2
level: 2
tags: [error-handling, preconditions, channels]
requires:
  - err-assert-vanishes-ndebug
  - err-throw-catch-intro
refs:
  - https://en.cppreference.com/w/cpp/error/assert
elaborate: Find a check in your own code that guards something a correct program can hit (a missing file, bad user input). Which channel should it use, and what would the release build do with each?
---

A stack class's member function `pop()` must not be called on an empty
stack: that is its precondition (what the caller must guarantee before
calling), and only a caller with a bug breaks it. Of `assert`, `throw`
and a return value, `pop` states that precondition with
{{c1::`assert`::one of the three}}.

---

**`assert` checks for bugs in debug builds only.** Under `NDEBUG` the
line vanishes, so it suits a precondition no correct caller breaks. A
failure a correct program can meet (an empty input queue, a missing file)
needs a report the release build keeps: a return value or `throw`.
