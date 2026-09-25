---
id: chunks-sender-pipeline
kind: chunk
version: 1
level: 4
tags: [idioms, execution, async, c++26]
expose_ms: 9000
compile: null
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

```cpp
auto work = schedule(pool)
          | then([] { return load(); })
          | continues_on(ui)
          | then([](Data d) { show(d); });
auto result = std::this_thread::sync_wait(std::move(work));
```

---

The canonical sender pipeline, and a map of the whole vocabulary in
five lines: a **factory** that arrives on a context (`schedule`), value
**adaptors** that transform it (`then`), a **transition** that moves
the rest of the chain elsewhere (`continues_on`), and a **consumer**
that finally connects, starts and waits (`sync_wait`).

Read the first four lines as pure description — nothing has run when
`work` is constructed, and `work` could be stored, wrapped in
`when_all`, or thrown away. The last line is where an operation state
comes into existence on this thread's stack and the work actually
starts.

This Deck cannot compile-check this Card: `std::execution` is C++26
(P2300) and is not implemented by the Compiler Explorer configuration
the Deck targets, so reproduction is graded by whitespace-normalised
equality (SPEC §4.7). The equivalent against the reference
implementation, `stdexec`, differs only in the namespace.
