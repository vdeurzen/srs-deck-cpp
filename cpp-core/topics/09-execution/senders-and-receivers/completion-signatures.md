---
id: execution-completion-signatures
kind: cloze
version: 1
level: 5
tags: [execution, async, c++26]
elaborate: Say in one sentence, as to an interviewer, what bug a sender's completion signatures turn into a compile error.
refs:
  - https://eel.is/c++draft/exec.getcomplsigs
  - https://eel.is/c++draft/exec.cmplsig
  - https://wg21.link/p3557
requires:
  - execution-three-channels
---

A sender's type lists every way it can finish, as function types in a
`completion_signatures<...>`. For `just(42)` the value entry is
{{c1::set_value_t(int)::a function type}}. `then(sndr, f)` replaces the
value signature with one built from {{c2::f's return type::and adds an
error signature if the call can throw}}, passing the error and stopped
entries through. A receiver that cannot handle a listed completion is a
{{c3::compile error at connect::when is it caught?}}.

---

The list comes from `get_completion_signatures<Sndr, Env>()`, a
`consteval` function in C++26. The environment is a parameter because a
sender may complete differently depending on what the consumer
provides, most often whether a stop token is present at all.
