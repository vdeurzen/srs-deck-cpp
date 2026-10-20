---
id: execution-just-and-then
kind: cloze
version: 1
level: 3
tags: [execution, async, c++26]
elaborate: Say in one sentence, as to an interviewer, why an exception thrown inside `then` cannot escape into the caller's stack.
refs:
  - https://eel.is/c++draft/exec.just
  - https://eel.is/c++draft/exec.then
  - https://wg21.link/p2300
requires:
  - execution-three-channels
---

`just(1, 'a')` is a **sender factory**: its sender completes immediately
with {{c1::those values on the value channel::which channel, carrying
what}}. `then(sndr, f)` is a **sender adaptor**: it applies `f` to
{{c2::the values its predecessor completed with::not to the sender, and
not to an error}}, and `f`'s return value becomes the new value
completion. If `f` throws, the operation completes on {{c3::the error
channel::where does the exception go?}}.

---

The predecessor's error and stopped completions pass through `then`
unchanged, and `f` runs on whatever context the predecessor completed
on. The pipe spelling is equivalent: `just(1, 'a') | then(f)`.
