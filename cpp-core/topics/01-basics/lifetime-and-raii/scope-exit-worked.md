---
id: raii-scope-exit-worked
kind: basic
version: 1
level: 1
tags: [lifetime, raii, worked-example]
requires:
  - cpp-essentials/raii-storage-durations
refs:
  - https://en.cppreference.com/w/cpp/language/destructor#Destruction_sequence
  - https://timsong-cpp.github.io/cppwp/n4950/stmt.jump.general#2
---

Each `Tag`'s destructor appends its letter to `log`.

```cpp
void g() {
    Tag x{'x'};
    {
        Tag y{'y'};
    }
    Tag z{'z'};
}
```

| step | statement | effect | `log` |
| --- | --- | --- | --- |
| 1 | `Tag x{'x'};` | `x` constructed | `""` |
| 2 | `Tag y{'y'};` | `y` constructed | `""` |
| 3 | inner `}` | `y` destroyed | `"y"` |
| 4 | `Tag z{'z'};` | `z` constructed | `"y"` |
| 5 | `g`'s closing `}` | `z`, then `x` destroyed | `"yzx"` |

## At step 3, `y` is destroyed while `g` is still running. Why there?

---

**An automatic object dies when control leaves its own scope: `y`'s is the inner block.**

Each local's lifetime is tied to the block it is declared in, not to the
function. Leaving the inner `{ }` ends `y`; leaving `g` ends `z` and `x`,
in reverse order of construction.
