---
id: trace-coroutine-hook-order-worked
kind: basic
version: 1
level: 4
tags: [coroutines, worked-example]
requires:
  - coroutines-eager-vs-lazy-start
  - coroutines-co-return-forms
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
---

`Eager`'s promise appends a letter to `hooks` in each hook: `get_return_object` `G`,
`initial_suspend` `I` (returns `std::suspend_never`), `return_void` `R`,
`final_suspend` `F` (returns `std::suspend_always`).

```cpp
Eager go() { hooks += 'B'; co_return; }

Eager e = go();
```

| step | what runs | `hooks` |
| --- | --- | --- |
| 1 | `get_return_object()` | `G` |
| 2 | `initial_suspend()`: no suspension | `GI` |
| 3 | the body | `GIB` |
| 4 | `co_return;` calls `return_void()` | `GIBR` |
| 5 | `final_suspend()` suspends; `go()` returns | `GIBRF` |

## Step 3 runs the body before `go()` has returned to its caller. Why?

---

**`initial_suspend()` returned `suspend_never`, so nothing paused before the first statement.**

The call itself builds the return object and asks `initial_suspend()`
whether to stop. Told not to, it carries straight on through the body,
on the caller's thread, until the first real suspension: here the final
one.
