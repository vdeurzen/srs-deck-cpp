---
id: tmpl-explain-templates
kind: explain
version: 2
level: 2
tags: [templates, deduction, instantiation, concepts]
requires:
  - tmpl-explicit-argument
  - tmpl-distinct-types
  - tmpl-definition-in-header
  - tmpl-constrained-auto
elaborate: Say one place in code you use daily where you pass a type rather than a value, such as `std::vector<int>`, and what the compiler generates from it.
refs:
  - https://en.cppreference.com/w/cpp/language/templates
  - https://en.cppreference.com/w/cpp/language/function_template
---
A newcomer asks why `template <typename T> T larger(T a, T b)` exists and what the compiler does with it. Explain function templates to them.
---
- [ ] Problem: one body serves many types, instead of a copy of the function per type
- [ ] Mechanism: the compiler generates a separate function for each distinct `T` the calls deduce
- [ ] Example: `larger(1, 2.5)` fails to compile, because `T` would be both `int` and `double`
- [ ] Cost: the body must be visible where it is used, so template definitions live in headers
- [ ] Pitfall: without a concept, a type lacking an operation errors deep inside the template's body
