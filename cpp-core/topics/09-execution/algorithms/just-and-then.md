---
id: execution-just-and-then
kind: cloze
version: 1
level: 3
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec.just
  - https://eel.is/c++draft/exec.then
  - https://wg21.link/p2300
requires:
  - execution-three-channels
---

The two starter pieces of every pipeline: `just(1, 'a')` is a **sender
factory** producing a sender that completes immediately with
{{c1::those values on the value channel::which channel, carrying
what}}, and `then(sndr, f)` is a **sender adaptor** wrapping a sender so
that `f` is applied to {{c2::the values its predecessor completed
with::not to the sender, and not to an error}}, with `f`'s return value
becoming the new value completion.

If `f` throws, the operation completes on {{c3::the error channel::so
the exception never escapes into the caller's stack}}; the
predecessor's error and stopped completions pass through unchanged. And
`f` runs on whatever context the predecessor completed on. The pipe
spelling is equivalent: `just(1, 'a') | then(f)`.
