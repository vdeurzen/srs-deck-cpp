---
id: coroutines-co-return-forms
kind: cloze
version: 1
level: 3
tags: [coroutines]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_return
---

A coroutine that ends with `co_return;` — or that simply runs off the
end of its body — requires its promise to declare
{{c1::return_void()::the hook for a coroutine that produces no final
value}}. One that ends with `co_return expr;` instead requires
{{c2::return_value(expr)::the hook that receives the co_returned
expression}}. A promise that declares **both** is
{{c3::ill-formed::GCC says the promise "declares both return_value and
return_void"}}, so a coroutine type commits to one shape or the other —
which is why a generator-style promise, whose values all come out
through `co_yield`, declares the first and a task-style promise that
produces one result declares the second.
