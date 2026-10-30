---
id: coroutines-explain-promise-protocol
kind: explain
version: 3
level: 5
tags: [coroutines]
requires:
  - coroutines-explain-promise-hooks
  - coroutines-explain-promise-extensions
  - coroutines-symmetric-transfer
  - coroutines-generator-pull-is-blocking
elaborate: A fire-and-forget type returns `suspend_never` from both ends; why may nobody then keep a handle to its frame?
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Promise
---
An interviewer asks how a generator type and a task type, built from the
same promise hooks, end up behaving differently. Explain it to them.
---
- [ ] They differ in who resumes: a generator's consumer through `operator++`, a task its stored continuation from `final_suspend`
- [ ] So `yield_value` is the generator's channel out, while a task hands back its result through `return_value`
- [ ] Both start lazily: `suspend_always` from `initial_suspend` lets the caller choose when the body begins
- [ ] Both suspend at the end, so the frame survives for reading the result, and the return type must `destroy()` it
- [ ] Both store an exception in `unhandled_exception()`; the consumer rethrows it at `operator++` or at the awaiting `co_await`
