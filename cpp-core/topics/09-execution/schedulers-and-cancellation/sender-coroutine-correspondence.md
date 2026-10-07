---
id: execution-sender-coroutine-correspondence
kind: cloze
version: 1
level: 5
tags: [execution, async, c++26, coroutines]
refs:
  - https://eel.is/c++draft/exec.connect
  - https://eel.is/c++draft/exec.task
requires:
  - execution-senders-and-coroutines
  - coroutines-frame-allocation
---

Senders and coroutines are two spellings of one model. A sender is a
coroutine that has not been called yet; its operation state plays the
role of {{c1::the coroutine frame::where the suspended state lives}};
`start(op)` is {{c2::the first resume()::what gets a lazy coroutine
going?}}; and the receiver is the continuation, with its environment, answering
queries, in the place of {{c3::the promise::what an awaiter reads
through h.promise()}}.
