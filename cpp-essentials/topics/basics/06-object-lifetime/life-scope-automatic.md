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
elaborate: Say where a local in your own code stops existing when it is declared inside an `if`, and what that means for a pointer to it.
---

## `f(3)` creates a `Tag` named `t`. At which marked brace does `t` stop existing?

```cpp
struct Tag { int id; };
int count = 0;

void f(int x) {
  if (x > 0) {
    Tag t{x};
    ++count;
  }              // A
}                // B
```

---

**At `A`: the closing brace of the block that declared it.** A local has
*automatic storage duration*: it lives from its declaration to the end of
its enclosing block, however control leaves it (`}`, `return`, `break`).
Each call gets a fresh `t` that dies at `A`; unlike Go, nothing
referring to it keeps it alive.
