---
id: err-throw-jumps-to-catch
kind: trace
version: 1
level: 1
tags: [exceptions, control-flow, tracing]
requires:
  - err-throw-catch-intro
  - types-char-is-integer
  - string-basics
probes:
  1: { total: "4", log: "4!" }
refs:
  - https://en.cppreference.com/w/cpp/language/throw
  - https://en.cppreference.com/w/cpp/language/try
elaborate: Say in one sentence what a Go version of `digit` would return instead, and what its caller would have to check after each call.
---

`std::invalid_argument` is a standard exception type for bad arguments.

```cpp
std::string log;
int digit(char c) {
    if (c < '0' || c > '9') throw std::invalid_argument("not a digit");
    log += c;
    return c - '0';
}

int total = 0;
try {
    total += digit('4');
    total += digit('x');
    total += digit('2');
} catch (const std::invalid_argument&) {
    log += '!';               // @1
}
```

---

`throw` abandons everything after it: the rest of `digit('x')` (so no `x`
is logged and nothing is returned), the `+=` waiting for that result, and
the remaining statements of the `try` block, so `digit('2')` never runs.
Control lands in the first `catch` whose type matches. Values from running
an instrumented copy built with GCC 16.2 (`g++ -std=c++23`).
