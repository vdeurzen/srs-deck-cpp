---
id: execution-when-all-values-concatenate
kind: cloze
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.when.all
  - https://eel.is/c++draft/exec.into.variant
requires:
  - execution-when-all
  - execution-completion-signatures
---

When every child succeeds, `when_all` of a sender of `int` and a sender
of `std::string` completes with {{c1::set_value(int, std\::string)::one
completion — what are its arguments?}}, the children's values in
order. So `when_all` compiles only if each child has
{{c2::at most one value completion signature::how many ways to succeed}};
for a child that can succeed in several shapes,
`when_all_with_variant` (or `into_variant` on that child) makes the
shape unambiguous again.
