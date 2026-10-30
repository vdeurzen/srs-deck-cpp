---
id: coroutines-explain-transformation
kind: explain
version: 3
level: 4
tags: [coroutines]
requires:
  - coroutines-explain-frame-setup
  - coroutines-explain-body-lowering
  - coroutines-generator-no-co-await
elaborate: What would go wrong if a local that lives across a `co_await` were kept on the stack of whoever called the coroutine?
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---
An interviewer asks why a coroutine needs an allocated frame and a promise
type, when an ordinary function needs neither. Explain it to them.
---
- [ ] A suspension returns control to the resumer, so the coroutine's locals cannot stay on the caller's stack
- [ ] So every local live across a suspension sits in the allocated frame, the coroutine's only stack
- [ ] The body is lowered into calls on the promise, so the promise type must come from the declared return type
- [ ] Every exit funnels into `co_await final_suspend()`, so one promise decision says whether the frame outlives the body
- [ ] The promise also limits what the body may say: a deleted `await_transform` forbids `co_await` in a generator
