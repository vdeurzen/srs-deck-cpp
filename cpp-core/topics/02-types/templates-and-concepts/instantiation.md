---
id: templates-instantiation
kind: basic
version: 1
level: 2
tags: [templates]
refs:
  - https://en.cppreference.com/w/cpp/language/template_instantiation
---

## What is template instantiation, and what triggers it implicitly?

---

Instantiation is the compiler generating an actual function or class from
a template by substituting concrete template arguments for its
parameters. **Implicit instantiation** happens the first time a
particular set of arguments is used in a context that needs a complete
definition — calling a function template, or naming a class template
specialization in a way that requires its layout or members.

Only the parts actually used are instantiated for a class template: an
unused member function of an instantiated class template is never
compiled at all, which is why a class template can have a member that
would not compile for some `T`, as long as nothing ever calls it for that
`T`.
