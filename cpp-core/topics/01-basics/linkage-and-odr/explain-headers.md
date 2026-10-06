---
id: linkage-explain-headers
kind: explain
version: 1
level: 3
tags: [linkage, headers, inline, odr]
requires:
  - linkage-extern-declaration
  - linkage-header-static-trace
  - linkage-odr-no-diagnostic
refs:
  - https://en.cppreference.com/w/cpp/language/definition#One_Definition_Rule
  - https://en.cppreference.com/w/cpp/language/storage_duration#Linkage
---

A new teammate asks what may go in a header and what may not. Explain the
rules and the reason behind each.

---

- [ ] Each `.cpp` plus its includes is one translation unit, compiled alone; only the linker sees them all
- [ ] A non-inline definition with external linkage in a header is a duplicate in every includer, so headers hold `extern` declarations and prototypes, and one `.cpp` holds the definition
- [ ] `inline` functions and variables, class definitions and templates may be defined in every translation unit, because the linker keeps one
- [ ] `static`, an unnamed namespace, or namespace-scope `const` gives internal linkage: every translation unit gets its own private copy
- [ ] Definitions of the same entity that differ between translation units violate the ODR: no diagnostic required, undefined behaviour
