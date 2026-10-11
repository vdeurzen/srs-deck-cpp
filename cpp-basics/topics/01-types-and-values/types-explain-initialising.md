---
id: types-explain-initialising
kind: explain
version: 1
level: 2
tags: [types, initialization]
requires:
  - types-brace-checks-constant
  - types-constexpr-catches-uninit
  - types-double-to-int-trace
refs:
  - https://en.cppreference.com/w/cpp/language/initialization
  - https://en.cppreference.com/w/cpp/language/list_initialization
---

A colleague asks how to declare and initialise a local number in C++ so
that it cannot quietly hold the wrong value. Explain what can go wrong and
what you would write.
---
- [ ] A local with no initializer is indeterminate; reading it is undefined behaviour
- [ ] `=` from a `double` truncates toward zero without complaint
- [ ] Braces reject narrowing, so a value that does not fit is a compile error
- [ ] Empty braces `{}` value-initialize a number to zero
- [ ] `auto x = {5};` deduces `std::initializer_list<int>`; `auto x{5};` or `auto x = 5;` gives `int`
