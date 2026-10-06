---
id: coroutines-cannot-be-cloze
kind: cloze
version: 1
level: 3
tags: [coroutines]
requires:
  - coroutines-what-makes-a-coroutine
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Restrictions
  - https://eel.is/c++draft/dcl.fct.def.coroutine
---

Some functions can never become coroutines, however many `co_` keywords
they contain. A function whose return type is {{c1::deduced::`auto f()
{ co_return; }` is rejected}} cannot, because the return type is what
names the `promise_type`, and deduction would come too late to supply
it. Neither can {{c2::constexpr or consteval::there is no frame at
compile time}} functions, constructors, destructors or `main`. And a
C-style {{c3::`...` varargs list::the C way of taking any number of
arguments}} is forbidden too — a variadic *template* is fine.
