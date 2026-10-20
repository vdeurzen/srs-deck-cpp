---
id: lambda-capture-trace
kind: trace
version: 1
level: 1
tags: [lambdas, tracing]
requires:
  - lambda-closure-type
  - stdalgo-capture-ref-vs-copy
probes:
  1: { a: "1", b: "5" }
  2: { c: "8" }
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
elaborate: Say in one sentence which of the two captures you would pick for a callback that runs after the local it reads has changed, and why.
---

```cpp
int n = 1;
auto f = [n] { return n; };
auto g = [&n] { return n; };
n = 5;
int a = f();
int b = g();             // @1
n = 7;
int c = f() + g();   // @2
```

---

`[n]` copies `n` into the closure **when the lambda is created**, so
`f` returns 1 forever. `[&n]` stores a reference, so `g` reads
whatever `n` holds at the call: 5, then 7. Verified with GCC 16.2
(`g++ -std=c++23`).
