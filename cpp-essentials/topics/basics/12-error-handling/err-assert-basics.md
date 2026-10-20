---
id: err-assert-basics
kind: basic
version: 1
level: 1
tags: [assert, error-handling, foundations]
refs:
  - https://en.cppreference.com/w/cpp/error/assert
  - https://en.cppreference.com/w/cpp/utility/program/abort
---

```cpp
int average(int sum, int n) {
    assert(n > 0);
    return sum / n;
}
```

## The program, built with a plain `g++ app.cpp`, calls `average(10, 0)`. What happens at the `assert`?

---

**The program stops: it prints the failed condition, file and line, then aborts.**

`assert(cond)` checks a condition a correct program always meets. When
it is false, `std::abort()` ends the program at once: no return, no
clean-up. Use it to catch your own bugs, not bad input.
