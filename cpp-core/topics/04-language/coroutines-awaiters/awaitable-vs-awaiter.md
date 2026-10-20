---
id: coroutines-awaitable-vs-awaiter
kind: cloze
version: 2
level: 4
tags: [coroutines]
requires:
  - coroutines-suspension-points-cloze
elaborate: Where would you give a type an `operator co_await` rather than the three hooks directly, and why?
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

The compiler derives the **awaiter**, the object carrying `await_ready`,
`await_suspend` and `await_resume`, from the operand of `co_await` in a
fixed order. First, if the promise declares {{c1::await_transform::any
declaration of it captures every co_await in that coroutine}}, the
operand is replaced by its result. Then, if that result has a member or
non-member {{c2::operator co_await}}, its result is the awaiter;
otherwise {{c3::the object is its own awaiter::what happens when there
is no such operator}}.

---

So "awaitable" (what you wrote after `co_await`) and "awaiter" are not
synonyms: a `task` is an awaitable that returns a *separate* awaiter
holding the continuation handle, while `std::suspend_always` is both at
once.
