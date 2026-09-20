---
id: execution-just-and-then
kind: cloze
version: 1
level: 3
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

The two starter pieces of every pipeline: `just(1, 'a')` is a **sender
factory** producing a sender that completes immediately with
{{c1::those values on the value channel::one set_value completion,
carrying copies of the arguments}}, and `then(sndr, f)` is a **sender
adaptor** wrapping a sender so that `f` is applied to
{{c2::the values its predecessor completed with::not to the sender, and
not to an error}}, with `f`'s return value becoming the new value
completion.

Two rules keep `then` honest. If `f` throws, the operation completes on
{{c3::the error channel::set_error with the exception_ptr, so the
exception never escapes into the caller's stack}}, and the error and
stopped completions of the predecessor are
{{c4::forwarded unchanged::an adaptor only transforms the channel it is
about}}. And `f` runs on whatever context the predecessor completed on,
which is why a chain that must change threads says so explicitly with
`continues_on` rather than hoping.

The pipe spelling is equivalent: `just(1, 'a') | then(f)`.
