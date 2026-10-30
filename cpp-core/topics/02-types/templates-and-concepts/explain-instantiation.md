---
id: templates-explain-instantiation
kind: explain
version: 1
level: 3
tags: [templates]
requires:
  - templates-lazy-member-instantiation
  - templates-two-phase-lookup
  - templates-typename-disambiguator
elaborate: What would change for your users if a template you wrote checked every member function body for every `T`?
refs:
  - https://en.cppreference.com/w/cpp/language/template_instantiation
  - https://en.cppreference.com/w/cpp/language/dependent_name
---
A colleague asks when the compiler checks the code inside a template.
Explain it to them.
---
- [ ] A template is not code; each distinct set of template arguments, when used, is instantiated into a specialization
- [ ] Non-dependent names are looked up at the definition, so an undeclared non-dependent call errors even if unused
- [ ] Names that depend on `T`, such as `t.flush()`, are looked up only at instantiation, since they differ per `T`
- [ ] A class template's member function bodies are instantiated only when used, so a type that breaks one member still works
- [ ] A dependent qualified name like `C::value_type` is parsed as a value until `typename` marks it a type
