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
  - err-no-handler-terminates
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
  - https://eel.is/c++draft/except.handle
elaborate: Which failure in code you have written would you now report with `throw`, and which with a return value?
---
A colleague new to C++ asks what happens between a `throw` and the
`catch` that handles it. Explain it to them as you would in an interview.
---
- [ ] `throw` carries the failure to a handler many calls up, with no new code in the functions between
- [ ] It abandons each function on the way to the nearest `try` whose `catch` type matches
- [ ] Unwinding runs every fully constructed local's destructor, so a file-closing object still closes its file
- [ ] If no `catch` anywhere matches, `std::terminate` is called and the program ends
- [ ] An exception escaping a `noexcept` function also calls `std::terminate`, whatever the callers catch
