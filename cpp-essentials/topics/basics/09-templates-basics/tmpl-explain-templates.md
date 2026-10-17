---
id: tmpl-explain-templates
kind: explain
version: 1
level: 2
tags: [templates, deduction, instantiation, concepts]
requires:
  - tmpl-deduction-conflict
  - tmpl-distinct-types
  - tmpl-concept-error
refs:
  - https://en.cppreference.com/w/cpp/language/templates
  - https://en.cppreference.com/w/cpp/language/function_template
---
A newcomer writes `template <typename T> T larger(T a, T b)` and calls it a few times. Explain what the compiler does with it, from the definition to the code that runs.
---
- [ ] A template is a pattern, not a function: no code exists for it until it is used with concrete types
- [ ] At each call `T` is deduced from the arguments, and every argument must deduce the same `T`: `larger(1, 2.5)` does not compile
- [ ] Each distinct set of template arguments instantiates a separate function or class: `larger<int>` and `larger<double>` (or `Box<int>` and `Box<long>`) are unrelated, with their own statics
- [ ] The body is checked against the real type only at instantiation, so an operation the type lacks errors inside the template
- [ ] A constraint (`template <std::integral T>`) moves that check to the call, with an error naming the unmet concept
