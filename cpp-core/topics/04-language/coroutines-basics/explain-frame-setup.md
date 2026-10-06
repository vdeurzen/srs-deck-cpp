---
id: coroutines-explain-frame-setup
kind: explain
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-return-object-timing
  - coroutines-frame-allocation
  - coroutines-parameters-copied
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
---
A colleague asks what happens between calling a coroutine and the
first statement of its body. Explain the setup the compiler generates.
---
- [ ] The return type must provide a `promise_type` (directly or through `std::coroutine_traits`); without one the function is ill-formed
- [ ] A frame is allocated — by `promise_type::operator new` if declared, else global `operator new` — holding the promise, the parameter copies and every local that lives across a suspension
- [ ] Parameters are copied or moved into the frame; a *reference* parameter copies the reference, not the referent
- [ ] The promise is constructed, then `get_return_object()` runs and its result is set aside before `initial_suspend()` is awaited
- [ ] `co_await promise.initial_suspend()`: `suspend_always` returns the return object to the caller with no statement run; `suspend_never` runs the body immediately on the calling thread
