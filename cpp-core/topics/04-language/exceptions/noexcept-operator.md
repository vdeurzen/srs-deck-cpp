---
id: exceptions-noexcept-operator
kind: trace
version: 1
level: 2
tags: [exceptions, noexcept, tracing]
requires:
  - exceptions-noexcept-escape-terminates
probes:
  1: { a: "false", calls: "0" }
  2: { b: "true", calls: "0" }
refs:
  - https://en.cppreference.com/w/cpp/language/noexcept
---

```cpp
int calls = 0;
void save() { ++calls; }
void close() noexcept { ++calls; }
bool a = noexcept(save());      // @1
bool b = noexcept(close());     // @2
```

---

`noexcept(expr)` is the **operator**: its operand is unevaluated, like
`sizeof`'s, so neither function runs and `calls` stays `0`. It yields
`true` only when nothing in `expr` may throw, judged from declarations:
`save` lacks `noexcept`, so `a` is `false` even though its body never
throws. Verified with GCC 16.2 (`g++ -std=c++23`).
