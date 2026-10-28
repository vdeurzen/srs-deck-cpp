---
id: err-explain-failure-paths
kind: explain
version: 3
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
A colleague new to C++ asks how a failure reported with `throw` reaches
the code that handles it, and when to report a failure some other way.
Explain it to them as you would in an interview.
---
- [ ] Problem: report a failure to a handler many calls up, with no new code in the functions between
- [ ] Mechanism: `throw` abandons each function on the way to the nearest `try` whose `catch` type matches
- [ ] Example: unwinding runs every fully constructed local's destructor, so a file-closing object still closes it
- [ ] Trade-off: an outcome the caller checks at once belongs in the return value, such as `std::optional`
- [ ] Pitfall: an exception escaping a `noexcept` function calls `std::terminate`, whatever the callers catch
