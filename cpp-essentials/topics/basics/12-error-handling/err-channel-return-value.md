---
id: err-channel-return-value
kind: cloze
version: 1
level: 2
tags: [error-handling, optional]
requires:
  - err-pick-a-channel
refs:
  - https://en.cppreference.com/w/cpp/language/exceptions
  - https://en.cppreference.com/w/cpp/utility/optional
---

`find_user(id)` is often asked for an id that does not exist, and its
caller checks for "not found" on the very next line. `find_user` reports
that outcome through its {{c1::return value::a channel}}.

---

**The caller handles "not found" at once, so it belongs in what the call
returns**, e.g. a `std::optional<User>` the caller must check. An exception
suits a failure handled many calls up; here it would turn an ordinary
answer into a jump the very next line has to catch.
