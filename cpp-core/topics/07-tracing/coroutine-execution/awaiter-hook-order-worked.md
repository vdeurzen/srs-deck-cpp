---
id: trace-awaiter-hook-order-worked
kind: basic
version: 1
level: 4
tags: [coroutines, worked-example]
requires:
  - coroutines-await-suspend-return-types
  - coroutines-eager-vs-lazy-start
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

Each hook appends a letter to `hooks`. `Step{r}`'s `await_ready()`
appends `R` and returns `r`;
`await_suspend` (returns `void`) appends `S`; `await_resume` appends `V`.
`Task` starts eagerly and holds its handle in `handle`.

```cpp
Task one() {
    co_await Step{false};
    hooks += 'E';
}
Task t = one();
t.handle.resume();
```

| step | what runs | `hooks` |
| --- | --- | --- |
| 1 | `one()` starts the body at once | `""` |
| 2 | `await_ready()` returns `false` | `R` |
| 3 | `await_suspend`; `one()` returns to caller | `RS` |
| 4 | `resume()`: `await_resume()` | `RSV` |
| 5 | rest of the body | `RSVE` |

## At step 3, `one()` returns to its caller although the body has not finished. Why?

---

**`await_ready()` said "not ready", so the coroutine suspended, and a `void` `await_suspend` keeps it suspended.**

Suspending hands control back to whoever is running the coroutine, here
the caller of `one()`. The body continues only when someone calls
`resume()`, and it picks up inside the same `co_await` with
`await_resume()`.
