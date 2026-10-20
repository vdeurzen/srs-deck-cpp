---
id: fn-param-change-intro
kind: basic
version: 1
level: 1
tags: [functions, parameters, foundations]
refs:
  - https://en.cppreference.com/w/cpp/language/function#Parameter_list
  - https://eel.is/c++draft/expr.call#7
---

```cpp
void reset(int n) {
    n = 0;
}

int main() {
    int x = 7;
    reset(x);
}
```

## What is `x` after `reset(x)`?

---

**Still 7: `n` is a copy of `x`, so `reset` changes only the copy.**

A parameter declared as a plain type (here `int n`) is passed *by value*:
it is a new local object, initialised from the argument when the call
starts and destroyed when the function returns. Writes to it never reach
the caller.
