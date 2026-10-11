---
id: coroutines-promise-type-cloze
kind: cloze
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-what-makes-a-coroutine
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Promise
---

Every coroutine's return type must have a nested {{c1::promise_type}},
which the compiler uses to customize the coroutine's behaviour. The
promise object's {{c2::get_return_object::a factory method}} builds the
handle the caller actually receives, and another of its hooks decides
whether the coroutine {{c3::starts suspended or runs
immediately::its first scheduling decision}} when first called.
