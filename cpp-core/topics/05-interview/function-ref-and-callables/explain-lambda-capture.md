---
id: callables-explain-lambda-capture
kind: explain
version: 3
level: 4
tags: [callables, lambdas, lifetime]
requires:
  - callables-explain-capture-modes
  - cpp-essentials/callables-explain-capture-lifetime
  - cpp-essentials/smart-pointers-weak-ptr-lock
elaborate: With `[reply = std::move(reply)]`, why does `send(std::move(reply))` in the body still copy, and what fixes it?
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
  - https://en.cppreference.com/w/cpp/memory/weak_ptr/lock
---
`Session::start()` posts `[&] { send(reply); }` to a thread pool and
returns at once; `reply` is a local `std::string`, `send` is a member
function, and every `Session` is owned by a `std::shared_ptr`. An
interviewer asks how you would make this task safe. Explain it to them.
---
- [ ] `[&]` captures `reply` by reference, and `start` returns before the task runs: the task reads a destroyed local
- [ ] Calling the member `send` also captures `this`, so the task dangles if the `Session` dies first
- [ ] `[=]` copies `reply` but still captures `this` as a bare pointer, so that second bug survives
- [ ] `[reply = std::move(reply)]` makes the closure object own the string, fixing the first bug without a copy
- [ ] Capturing a `shared_ptr` to the `Session` keeps it alive until the task runs; a locked `weak_ptr` skips closed sessions
