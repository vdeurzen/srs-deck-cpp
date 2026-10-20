---
id: trace-coroutine-lazy-generator-worked
kind: basic
version: 1
level: 3
tags: [coroutines, worked-example]
requires:
  - coroutines-generator-yield-value
  - coroutines-eager-vs-lazy-start
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_yield
---

`IntGen` is a lazy generator: `initial_suspend`, `yield_value` and
`final_suspend` all return `std::suspend_always`. `g.next()` resumes the
body and returns `!done()`; `g.value()` is the last yielded value.

```cpp
int stage = 0;
IntGen one() { stage = 1; co_yield 5; stage = 2; }

auto g = one();
bool more = g.next();
more = g.next();
```

| step | what runs | `stage` | `more` |
| --- | --- | --- | --- |
| 1 | `one()`: nothing, suspended at start | 0 | – |
| 2 | 1st `next()`: up to `co_yield 5` | 1 | `true` |
| 3 | 2nd `next()`: rest, final suspend | 2 | `false` |

## Step 3 runs code, yet `next()` returns `false`. Why?

---

**It ran the body's tail, then stopped at the final suspend point: `done()` is `true`.**

`false` means "the coroutine has finished", not "nothing ran". Each
`next()` runs from where the body last paused to its next pause; after
the last `co_yield` that next pause is `final_suspend`, and no new value
is produced.
