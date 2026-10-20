---
id: fn-namespace-clash
kind: basic
version: 2
level: 1
tags: [functions, namespaces]
refs:
  - https://en.cppreference.com/w/cpp/language/namespace
---

## Two libraries each define `void init() { ... }`, one inside `namespace audio { }` and the other inside `namespace video { }`. How does a caller run the audio one?

---

**`audio::init();`: a namespace's name, then `::`, then the member's name.**

Inside a namespace the function's full name includes the namespace, so
`audio::init` and `video::init` are two different functions. At global
scope both would be `::init`, and linking both libraries would fail with a
multiple-definition error.
