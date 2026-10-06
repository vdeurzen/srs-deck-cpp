---
id: coroutines-frame-allocation
kind: basic
version: 1
level: 4
tags: [coroutines, performance]
requires:
  - coroutines-promise-type-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
  - https://wg21.link/p0981
---

## What lives in a coroutine frame?

---

**Everything that must survive a suspension.** The `promise_type`
object, the copied parameters, every local whose lifetime crosses a
suspension point, the awaiter of the current `co_await`, and the state
machine's bookkeeping: where to resume, plus the resume and destroy
function pointers. Locals that never cross a suspension can stay in
registers or ordinary stack slots.
