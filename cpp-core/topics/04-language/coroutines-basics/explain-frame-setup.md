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
elaborate: A lazy coroutine takes a `const std::string&`; what would you tell its caller, and how would you change the signature?
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
---
A colleague asks what happens between calling a coroutine and the first
statement of its body. Explain it to them.
---
- [ ] The return type must provide a nested `promise_type`, or the function is ill-formed as a coroutine
- [ ] The compiler allocates a frame holding the promise, the parameter copies and every local that survives a suspension
- [ ] Parameters are copied or moved into the frame; a reference parameter copies only the reference, not the referent
- [ ] The promise is constructed, then `get_return_object()` runs; its result is set aside before `initial_suspend()` is awaited
- [ ] With `suspend_always` the caller gets that object before any statement runs; `suspend_never` runs the body immediately
