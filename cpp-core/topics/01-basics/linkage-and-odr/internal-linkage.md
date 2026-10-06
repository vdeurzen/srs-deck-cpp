---
id: linkage-internal-linkage
kind: basic
version: 1
level: 2
tags: [linkage, headers]
requires:
  - linkage-translation-unit
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration#Linkage
  - https://eel.is/c++draft/basic.link#3
---

## A header declares `static int hits = 0;` at namespace scope, and three `.cpp` files include it. How many `hits` objects does the program have?

---

**Three: `static` gives `hits` internal linkage, a private copy per
translation unit.** It links cleanly, but an increment in one file is
invisible to the others. An unnamed namespace does the same, and so does
a namespace-scope `const` variable that is not `extern` or `inline`.
