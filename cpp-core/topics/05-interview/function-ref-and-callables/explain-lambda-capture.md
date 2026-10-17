---
id: callables-explain-lambda-capture
kind: explain
version: 2
level: 4
tags: [callables, lambdas, lifetime]
requires:
  - callables-explain-capture-modes
  - cpp-essentials/callables-explain-capture-lifetime
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
  - https://en.cppreference.com/w/cpp/memory/weak_ptr/lock
---
`Session::start()` posts `[&] { send(reply); }` to a thread pool and
returns at once; `reply` is a local `std::string`, `send` is a member
function, and every `Session` is owned by a `std::shared_ptr`. Reason
through what goes wrong, and what each of three fixes changes: `[=]`,
`[reply = std::move(reply)]`, and capturing a `shared_ptr` or `weak_ptr`
to the `Session`.
---
- [ ] Because `[&]` captures `reply` by reference and `start` returns before the task runs, the task reads a destroyed local: undefined behaviour that can pass every test by timing alone
- [ ] Because `send` is a member, the body also captures `this`, so the task still dangles if the `Session` is destroyed before the pool runs it, even once `reply` is fixed
- [ ] Switching to `[=]` copies `reply` but still captures `this` as a bare pointer, so the second bug survives; that hidden pointer is why C++20 deprecates implicit `this` capture by `[=]`
- [ ] With `[reply = std::move(reply)]` the closure owns the string, but because the call operator is `const`, `send(std::move(reply))` in the body still copies; moving it out needs `mutable`
- [ ] Capturing a `shared_ptr` to the `Session` keeps it alive until the task runs; a `weak_ptr` that the body `lock()`s instead skips the send if the session has closed: the choice is whether the work must still happen
