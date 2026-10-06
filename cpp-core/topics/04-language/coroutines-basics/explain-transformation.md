---
id: coroutines-explain-transformation
kind: explain
version: 2
level: 4
tags: [coroutines]
requires:
  - coroutines-explain-frame-setup
  - coroutines-explain-body-lowering
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---
Put it together: the setup and the body rewriting of a coroutine
constrain each other. Name five things that follow from how the two
parts fit, not the parts themselves.
---
- [ ] Because the body is lowered into calls on the promise, the return type must be fixed before anything runs — which is why a deduced return type and a plain `return` are both impossible
- [ ] Because `initial_suspend` is awaited after `get_return_object` but before the body, a lazy coroutine returns to its caller with no user code run — which is exactly why a reference parameter copied into the frame can dangle later
- [ ] Because a suspension returns to the resumer and `resume()` is an ordinary call, every local live across a `co_await` must sit in the allocated frame, not on any stack: the frame is the coroutine's only stack
- [ ] Because every exit — `co_return`, running off the end, `unhandled_exception()` — funnels into `co_await final_suspend()`, whether the frame outlives the body is one promise decision, not one per exit path
- [ ] Because `co_yield` is `co_await yield_value(e)` and every `co_await` passes through `await_transform`, a promise decides at compile time what its body may say: a generator forbids awaiting with one deleted overload
