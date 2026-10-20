---
id: initialization-mixed-shared-table
kind: basic
version: 1
level: 3
tags: [lifetime, mixed-recognition]
requires:
  - initialization-magic-statics
  - raii-owner-in-destructor
  - ptr-lifetime-extension
elaborate: Say aloud one object in your own code whose lifetime should be "from first use to program end", and what would go wrong if it were a plain local.
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration#Static_local_variables
  - https://timsong-cpp.github.io/cppwp/n4950/stmt.dcl#3
---

Situation: one expensive lookup table, built the first time any thread
asks for it, then shared by every caller until the program ends.

Candidates: a named local owner object; a function-local `static`; a
`const&` bound to a temporary.

## In C++23, which candidate fits?

---

**A function-local `static`.**

Its lifetime runs from the first call to program exit, and its
initialization happens once even when threads race. A named local, or a
temporary kept alive by a `const&`, dies when its enclosing scope ends.
