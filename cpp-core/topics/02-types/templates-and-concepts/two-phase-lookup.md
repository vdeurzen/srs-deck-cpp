---
id: templates-two-phase-lookup
kind: basic
version: 1
level: 4
tags: [templates]
refs:
  - https://en.cppreference.com/w/cpp/language/dependent_name
---

## Why does calling a member function through a dependent type sometimes need the `template` keyword, as in `obj.template method<T>()`?

---

Template code is checked in two phases. At **definition time**, names
that do not depend on a template parameter are looked up immediately;
names that do depend on one (a **dependent name**) are deferred to
**instantiation time**, because which declaration they mean can change
per specialization.

When a dependent name is followed by `<`, the parser cannot tell — before
instantiation — whether `<` starts a template argument list or means
"less than". It assumes "less than" unless told otherwise, so `template`
disambiguates: `obj.template method<T>()` says "the `<` here starts
template arguments". The same ambiguity for a dependent *type* name is
resolved with `typename`.
