---
id: vc-plain-ref-rejects-temporary
kind: basic
version: 2
level: 1
tags: [value-categories, references, temporaries]
requires:
  - vc-lvalue-has-identity
  - ptr-reference-must-bind
  - string-basics
  - life-temporary-intro
elaborate: Say why the rule that a plain `T&` refuses a temporary protects the caller rather than the function.
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization
  - https://eel.is/c++draft/dcl.init.ref#5
---

## Given `void shout(std::string& s);`, why is `shout(std::string{"hey"})` a compile error?

---

**The argument is a temporary, and a non-const `T&` cannot bind to a
temporary.** `std::string{"hey"}` is a prvalue: an unnamed string that
dies at the end of the statement. Anything `shout` wrote into it would
vanish unseen, so the language refuses. Passing a named `std::string`
works: its name is an lvalue expression.
