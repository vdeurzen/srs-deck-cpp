---
id: execution-completion-signatures
kind: cloze
version: 1
level: 5
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.getcomplsigs
  - https://eel.is/c++draft/exec.cmplsig
  - https://wg21.link/p3557
requires:
  - execution-three-channels
---

A sender's type carries its contract: `get_completion_signatures<Sndr,
Env>()` (a `consteval` function in C++26) yields a
`completion_signatures<...>` listing every way the work can finish,
written as function types. For `just(42)` the value entry is
{{c1::set_value_t(int)::a function type: tag(arguments)}}; other
senders add entries such as `set_error_t(std::exception_ptr)` and
`set_stopped_t()`. Adaptors compute their own list from their
predecessor's, so `then(sndr, f)` replaces the value signature with one
built from {{c2::f's return type::and adds an error signature if the
call can throw}} while passing the error and stopped entries through.

Because the contract is a type, a receiver that cannot handle one of
the listed completions is a {{c3::compile error at connect::not a
run-time surprise on the error path}}. The environment is a parameter
because a sender may complete differently depending on what the
consumer provides — most often whether a stop token is present at all.
