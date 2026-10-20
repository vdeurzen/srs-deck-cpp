---
id: life-scope-automatic
kind: basic
version: 1
level: 1
tags: [lifetime, scope, storage-duration]
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration
  - https://eel.is/c++draft/stmt.jump#general-2
requires:
  - class-struct-members
---

## Each time the loop finds a positive `x`, it creates a `Tag` named `t`. At which marked brace does that `t` stop existing?

```cpp
struct Tag { int id; };

int count_positive() {
  int count = 0;
  for (int x = -1; x <= 2; ++x) {
    if (x > 0) {
      Tag t{x};
      ++count;
    }              // A
  }                // B
  return count;
}                  // C
```

---

**At `A`: the closing brace of the block that declared it.** A local has
*automatic storage duration*: it lives from its declaration to the end of
its enclosing block, however control leaves it (`}`, `return`, `break`).
Each positive `x` gets a fresh `t` that dies at `A`; unlike Go, nothing
referring to it keeps it alive.
