---
id: fn-namespace-clash
kind: basic
version: 1
level: 1
tags: [functions, namespaces]
refs:
  - https://en.cppreference.com/w/cpp/language/namespace
---

## Two libraries each define `void init() { ... }` at global scope. What does wrapping one in `namespace audio { }` and the other in `namespace video { }` fix?

---

**The name clash: `audio::init` and `video::init` become two different functions.**

At global scope both definitions name the same function `::init`, so
linking both libraries fails with a multiple-definition error. Inside a
namespace the full name includes the namespace, and callers say which one
they mean.
