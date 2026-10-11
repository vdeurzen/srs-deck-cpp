---
id: vc-plain-ref-rejects-temporary
kind: basic
version: 1
level: 1
tags: [value-categories, references, temporaries]
requires:
  - vc-lvalue-has-identity
  - ptr-bump-by-reference
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization
  - https://eel.is/c++draft/dcl.init.ref#5
---

## Given `void shout(std::string& s);`, why is `shout("hey")` a compile error?

---

**The argument would be a temporary `std::string`, and a non-const
`T&` cannot bind to a temporary.** `"hey"` must first be converted, which
creates a prvalue string that dies at the end of the statement. Anything
`shout` wrote into it would vanish unseen, so the language refuses.
Passing a named `std::string` works: it is an lvalue.
