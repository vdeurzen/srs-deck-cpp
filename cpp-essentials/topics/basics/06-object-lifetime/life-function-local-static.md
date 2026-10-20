---
id: life-function-local-static
kind: basic
version: 1
level: 1
tags: [lifetime, storage-duration, static]
requires:
  - life-scope-automatic
elaborate: Say in one sentence what Go code you would write to get the same effect, and where its variable would live.
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration#Static_block_variables
  - https://eel.is/c++draft/stmt.dcl
---

## `step()` is called three times in a row. What does each call return?

```cpp
int step() {
    static int n = 0;
    n = n + 1;
    return n;
}
```

---

**1, 2, 3: a `static` local is initialized once, then lives until the program ends.**

Without `static`, `n` would be an ordinary local, created as 0 and
destroyed on every call, so each call would return 1. The `static` one
keeps its value between calls but is still visible only inside `step`.
