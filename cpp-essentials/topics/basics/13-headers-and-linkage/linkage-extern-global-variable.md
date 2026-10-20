---
id: linkage-extern-global-variable
kind: basic
version: 1
level: 2
tags: [linkage, headers, declarations]
requires:
  - linkage-inline-header-fix
refs:
  - https://en.cppreference.com/w/cpp/language/definition
  - https://en.cppreference.com/w/cpp/language/storage_duration#Linkage
elaborate: Say when you would pick the one-definition `extern` form over `inline int verbosity = 1;`, or the other way round.
---

## `config.h` contains `int verbosity = 1;`, and three `.cpp` files include it. The link fails with `multiple definition of 'verbosity'`. What should the header say, so that exactly one `.cpp` file holds the definition?

---

**`extern int verbosity;`: a declaration that defines nothing.** One
`.cpp` then writes `int verbosity = 1;`. Every file can use the variable,
and the program has one object. (`extern` with an initializer would be a
definition again.) The header-only alternative, since C++17, is
`inline int verbosity = 1;`.
