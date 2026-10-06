---
id: lambda-capture-trace
kind: trace
version: 1
level: 1
tags: [lambdas, tracing]
requires:
  - lambda-closure-type
  - trace-copy-vs-reference
probes:
  1: { a: "1", b: "5" }
  2: { c: "8" }
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
---

```cpp
int n = 1;
auto byVal = [n] { return n; };
auto byRef = [&n] { return n; };
n = 5;
int a = byVal();
int b = byRef();             // @1
n = 7;
int c = byVal() + byRef();   // @2
```

---

`[n]` copies `n` into the closure **when the lambda is created**, so
`byVal` returns 1 forever. `[&n]` stores a reference, so `byRef` reads
whatever `n` holds at the call: 5, then 7. Verified with GCC 16.2
(`g++ -std=c++23`).
