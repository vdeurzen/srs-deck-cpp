---
id: coroutines-promise-type-cloze
kind: cloze
version: 1
level: 4
tags: [coroutines]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Promise
---

Every coroutine's return type must have a nested {{c1::promise_type}},
which the compiler uses to customize the coroutine's behaviour. The
promise object's {{c2::get_return_object::called once, at the very start,
to produce the value returned to the caller}} builds the handle the
caller actually receives, and its `initial_suspend` method decides
whether the coroutine {{c3::starts suspended or runs
immediately::eager vs lazy start}} when first called.
