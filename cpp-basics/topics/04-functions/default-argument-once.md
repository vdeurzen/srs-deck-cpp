---
id: fn-default-argument-once
kind: basic
version: 1
level: 2
tags: [functions, default-arguments, headers]
requires:
  - cpp-essentials/fn-declaration-vs-definition
  - cpp-essentials/fn-default-argument
refs:
  - https://eel.is/c++draft/dcl.fct.default#4
  - https://en.cppreference.com/w/cpp/language/default_arguments
---

## Why does `audio.cpp` fail to compile?

```cpp
// audio.h
void set_volume(int level = 50);

// audio.cpp
#include "audio.h"
void set_volume(int level = 50) { /* ... */ }
```

---

**The definition repeats a default argument the header already gave.**

After the `#include`, both declarations sit in one file, and a default
argument may not be redefined, even to the same value. Keep the default on
the header declaration, where callers see it, and define
`void set_volume(int level) { ... }`.
