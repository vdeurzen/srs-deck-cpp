---
id: execution-trace-when-all-stop-worked
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, worked-example]
requires:
  - execution-when-all
  - execution-stop-still-completes
refs:
  - https://eel.is/c++draft/exec.when.all
  - https://eel.is/c++draft/exec.read.env
---

All children complete inline, in the order `when_all` starts them.
`read_env(get_stop_token)` sends the stop token `when_all` gives `c`.

```cpp
bool saw_stop = true;
auto c = read_env(get_stop_token)
       | then([&](auto tok) { saw_stop = tok.stop_requested(); return 2; });
auto b = just() | then([]() -> int { throw std::runtime_error("b"); });
try { std::this_thread::sync_wait(when_all(c, b)); }
catch (const std::runtime_error&) {}
```

| step | what happens | stop requested |
| --- | --- | --- |
| 1 | `when_all` starts `c` first | no |
| 2 | `c` runs: `saw_stop = false` | no |
| 3 | `b` starts and throws | no |
| 4 | `when_all` requests stop | yes |
| 5 | completes with `b`'s error; rethrown | yes |

## At step 2, `saw_stop` is `false` although `b` fails in the same `when_all`. Why?

---

**`when_all` requests stop only after a child fails, and `c` ran before `b` started.**

Children start left to right. A stop request reaches only work that runs
after it, so `c`, already finished, saw a clean token; `when_all` still
waited for both before completing with `b`'s error.
