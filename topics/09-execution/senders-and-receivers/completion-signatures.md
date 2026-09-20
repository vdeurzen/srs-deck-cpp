---
id: execution-completion-signatures
kind: cloze
version: 1
level: 5
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

A sender's type carries its contract: `get_completion_signatures(sndr,
env)` yields a `completion_signatures<...>` listing every way the work
can finish, written as function types —
{{c1::set_value_t(int)::one entry per distinct set of value types the
sender may complete with}}, `set_error_t(std::exception_ptr)`,
`set_stopped_t()`. Adaptors compute their own list from their
predecessor's, so `then(sndr, f)` replaces the value signature with one
built from {{c2::f's return type::and adds an error signature if the
call can throw}} while passing the error and stopped entries through.

It is a compile-time contract, so two things fall out. A receiver that
cannot handle one of the listed completions is a
{{c3::compile error at connect::not a run-time surprise on the error
path}} — the mismatch is caught where the two are joined. And
`sync_wait` can name its own return type,
{{c4::std\::optional<std\::tuple<Vals...>>::nullopt meaning the
operation completed on the stopped channel}}, because the value types
were known before anything ran.

The environment is a parameter for a reason: a sender may complete
differently depending on what the consumer provides — most often
whether a stop token is present at all.
