---
id: types-auto-copy-drops-const
kind: basic
version: 1
level: 1
tags: [types, auto, const]
requires:
  - types-auto-deduces
  - const-no-modify
elaborate: Say in one sentence why it is safe for `auto` to leave the `const` behind on a copy.
refs:
  - https://en.cppreference.com/w/cpp/language/auto
  - https://eel.is/c++draft/dcl.type.auto.deduct
---

## Which of the last two lines fail to compile: the first, the second, both or neither?

```cpp
const int limit = 3;
auto left = limit;
left = 4;
limit = 4;
```

---

**Only `limit = 4;`: `left` is a plain, modifiable `int`.**

`auto` deduces from the initializer's type but drops a top-level `const`,
the one on `limit` itself. `left` is a new object holding a copy, so
changing it cannot touch `limit`, and nothing needs protecting.
