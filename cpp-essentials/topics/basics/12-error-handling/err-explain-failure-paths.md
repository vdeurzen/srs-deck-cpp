---
id: err-explain-failure-paths
kind: explain
version: 4
level: 2
tags: [exceptions, error-handling]
requires:
  - err-unwind-runs-destructors
  - err-noexcept-broken-promise
  - err-channel-return-value
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
  - https://eel.is/c++draft/except.handle
elaborate: Which failure in code you have written would you now report with `throw`, and which with a return value?
---
A colleague new to C++ asks what happens between a `throw` and the
`catch` that handles it. Explain it to them as you would in an interview.
---
- [ ] `throw` abandons the current function at once, then each caller in turn, up to the nearest matching `catch`
- [ ] Functions in between need no error-handling code of their own
- [ ] Unwinding runs every fully constructed local's destructor, so a file-closing object still closes its file
- [ ] An exception escaping a `noexcept` function on the way calls `std::terminate`, whatever the callers catch
- [ ] (empty: tick this)
