---
id: linkage-explain-headers
kind: explain
version: 2
level: 3
tags: [linkage, headers, inline, odr]
requires:
  - linkage-extern-declaration
  - linkage-header-static-trace
  - linkage-odr-no-diagnostic
elaborate: Open a header from your own code; which line in it would break the link if its `inline` or `extern` were removed?
refs:
  - https://en.cppreference.com/w/cpp/language/definition#One_Definition_Rule
  - https://en.cppreference.com/w/cpp/language/storage_duration#Linkage
---

A new teammate asks which definitions may go in a header that several
`.cpp` files include, and why. Explain it to them.

---

- [ ] `#include` pastes the header's text, so every including `.cpp` compiles its own copy of each definition
- [ ] A plain function or global variable defined in a header is then defined repeatedly, and the link fails
- [ ] So the header holds `extern` declarations and prototypes; exactly one `.cpp` holds each definition
- [ ] Class definitions and `inline` functions may be defined in every translation unit; differing copies are ill-formed, no diagnostic required
- [ ] A `static` definition in a header links, but gives each translation unit its own private copy
