---
id: err-explain-failure-paths
kind: explain
version: 1
level: 2
tags: [exceptions, error-handling]
requires:
  - err-unwind-runs-destructors
  - err-noexcept-broken-promise
  - err-channel-return-value
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
  - https://eel.is/c++draft/except.handle
---
A colleague new to C++ asks what happens between a `throw` and the
`catch` that handles it, when to return an error instead, and what
`noexcept` promises. Explain.
---
- [ ] `throw` skips the rest of the `try` block and of every function in between; control goes to the nearest enclosing `try` with a matching handler
- [ ] Unwinding runs the destructor of every fully constructed local on the way, in reverse order, so RAII objects clean up
- [ ] No matching handler anywhere, or an exception leaving a `noexcept` function, calls `std::terminate`
- [ ] Exceptions suit failures handled far away; a return value suits an outcome the caller handles at once
- [ ] `noexcept` is a promise the compiler does not check; callers and the standard library (`std::vector` choosing to move) rely on it
