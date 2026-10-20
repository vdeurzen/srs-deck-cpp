---
id: raii-exchange-intro
kind: basic
version: 1
level: 1
tags: [utility, standard-library]
requires:
  - std-names-and-headers
elaborate: Say aloud one place in your own code where you read a variable and then reset it, and how one call would replace those two lines.
refs:
  - https://en.cppreference.com/w/cpp/utility/exchange
  - https://eel.is/c++draft/utility.exchange
---

## In C++23, what do `old` and `a` hold after the last line?

```cpp
#include <utility>
int a = 3;
int old = std::exchange(a, 5);
```

---

**`old` is 3 and `a` is 5: it stores the new value, returns the old.**

`std::exchange(obj, v)` from `<utility>` assigns `v` to `obj` and
returns `obj`'s previous value, in one expression. It replaces the
two-line "read it, then reset it" pattern.
