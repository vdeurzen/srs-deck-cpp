---
id: linkage-translation-unit
kind: basic
version: 1
level: 1
tags: [linkage, translation-units]
requires:
  - linkage-tu-contents
refs:
  - https://en.cppreference.com/w/cpp/language/translation_phases
  - https://en.cppreference.com/w/cpp/language/storage_duration#Linkage
elaborate: Say aloud where else in a build a mistake stays invisible until the link, and why.
---

## `a.cpp` and `b.cpp` both define `int counter = 0;` outside every function. Each compiles on its own. Which build step fails?

---

**The link: `counter` now has two definitions visible program-wide.**
Such a name has *external linkage*.
Each translation unit is compiled in isolation, so no compile step ever
sees both. Only the linker
does, and GNU ld reports `multiple definition of 'counter'`.
