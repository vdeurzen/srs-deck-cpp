---
id: coroutines-awaitable-vs-awaiter
kind: cloze
version: 1
level: 4
tags: [coroutines]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

"Awaitable" and "awaiter" are not synonyms. The **awaitable** is
whatever you wrote after `co_await`; the **awaiter** is the object that
actually carries the three hooks, and the compiler derives one from the
other in a fixed order. First, if the promise declares
{{c1::await_transform::any declaration of it captures every co_await in
that coroutine}}, the operand is replaced by its result. Then, if that
result has a member or non-member {{c2::operator co_await}}, it is
called and its result is the awaiter; otherwise the object is its own
awaiter. Only then are `await_ready`, `await_suspend` and
{{c3::await_resume::whose return type is the type of the whole co_await
expression}} looked up on it.

The distinction matters in practice: a `task` is an awaitable that
returns a *separate* awaiter holding the continuation handle, while
`std::suspend_always` is both at once. And because a single
`await_transform` declaration captures every `co_await` in the
coroutine, a promise that declares one must handle {{c4::every type that
coroutine awaits::there is no fall-back to the untransformed operand}}.
