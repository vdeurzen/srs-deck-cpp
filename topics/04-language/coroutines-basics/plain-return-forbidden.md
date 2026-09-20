---
id: coroutines-plain-return-forbidden
kind: basic
version: 1
level: 3
tags: [coroutines]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---

## Why can a coroutine never contain a plain `return` statement — and what else is a coroutine not allowed to be?

---

Because the compiler rewrites the body so that **every** way out goes
through the promise: `co_return;` calls `promise.return_void()`,
`co_return expr;` calls `promise.return_value(expr)`, and then the
coroutine awaits `promise.final_suspend()`. A plain `return` would leave
the frame without running that protocol, so the grammar simply forbids
mixing the two — a function that contains `return` and `co_await` is
ill-formed, not a coroutine with a shortcut.

The same protocol rules out a few kinds of function outright. A
coroutine cannot be:

- `constexpr` or `consteval` — there is no frame at compile time;
- a constructor or destructor;
- `main`;
- a function with a C-style `...` varargs list (a variadic *template* is
  fine);
- a function with a deduced return type — `auto f() { co_return; }` is
  rejected, because the return type is what names the `promise_type`,
  and deduction happens too late to supply it.
