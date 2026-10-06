---
id: modules-import-vs-include
kind: basic
version: 1
level: 2
tags: [modules]
requires:
  - linkage-odr-class-repeat
refs:
  - https://en.cppreference.com/w/cpp/language/modules
---

## A header turned into a module: which of its names does `import` make visible?

---

**Only the declarations marked `export`.**

`import` doesn't paste text the way `#include` does. The module is compiled
once into a binary interface that each importer reads, so internal helpers
stay internal, import order doesn't matter, and nothing is re-parsed per
translation unit.
