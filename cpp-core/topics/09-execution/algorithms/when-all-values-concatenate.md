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
completion — what are its arguments?}}. So `when_all` compiles only if
each child has {{c2::at most one value completion signature::how many
ways to succeed}}.
