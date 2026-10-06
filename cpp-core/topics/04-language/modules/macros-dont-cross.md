---
id: modules-macros-dont-cross
kind: basic
version: 1
level: 2
tags: [modules, misconception]
elaborate: Which of your headers export a macro their users rely on (a version number, a logging shorthand)? What would replace it in a module?
requires:
  - modules-import-vs-include
refs:
  - https://en.cppreference.com/w/cpp/language/modules
---

## `geometry`'s interface unit has `#define PI 3.14159` and exports `area`. In `main.cpp`, after `import geometry;`, what does `PI` refer to?

---

**Nothing: importing a module brings in no macros, so `PI` is undeclared.**

It is tempting because `#include` pastes the `#define` along with
everything else. Export a constant instead:
`export inline constexpr double pi = 3.14159;`.
