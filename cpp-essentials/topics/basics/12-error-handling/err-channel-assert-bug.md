---
id: err-channel-assert-bug
kind: cloze
version: 1
level: 2
tags: [error-handling, assert, preconditions]
requires:
  - err-assert-vanishes-ndebug
refs:
  - https://en.cppreference.com/w/cpp/error/assert
elaborate: Find a check in your own code that guards something a correct program can hit (a missing file, bad user input). Should it be an `assert`? What would the release build do?
---

A stack class's member function `pop()` is called on an empty stack.
That can only happen if the calling code has a bug, so `pop` states the precondition at its first
line (a precondition: what the caller must guarantee before calling) with {{c1::`assert`::a macro}}`(!empty());`.

---

**`assert` checks for bugs in debug builds only.** Under `NDEBUG` the
line vanishes, so it suits a precondition no correct caller breaks. A
failure a correct program can meet (an empty input queue, a missing file)
needs a report the release build keeps: a return value or `throw`.
