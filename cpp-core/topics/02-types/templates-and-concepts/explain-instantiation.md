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
refs:
  - https://en.cppreference.com/w/cpp/language/template_instantiation
  - https://en.cppreference.com/w/cpp/language/dependent_name
  - https://en.cppreference.com/w/cpp/language/adl
---
Explain to a colleague how the compiler turns a template into code: when
code is generated, what is checked as soon as the template is defined,
and what waits.
---
- [ ] A template is not code: each distinct set of template arguments, first used where a definition is needed (a call, a complete object), is implicitly instantiated into a specialization
- [ ] Implicitly instantiating a class template instantiates its member declarations only; a member function body is instantiated when used, so a type that cannot support one member still works with the rest
- [ ] Non-dependent names are looked up at the template's definition, so a call to an undeclared non-dependent function is an error even if the template is never used
- [ ] Dependent names wait for instantiation; for an unqualified dependent call such as `f(t)`, ordinary lookup still happens at the definition, and argument-dependent lookup adds what it finds at instantiation
- [ ] A dependent qualified name such as `C::value_type` is assumed to name a value until `typename` says it is a type
