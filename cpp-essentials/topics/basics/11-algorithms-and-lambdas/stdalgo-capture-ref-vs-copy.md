---
id: stdalgo-capture-ref-vs-copy
kind: trace
version: 1
level: 1
tags: [lambdas, tracing]
requires:
  - stdalgo-lambda-syntax
  - ptr-reference-must-bind
probes:
  1: { a: "2" }
  2: { b: "0" }
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
---

```cpp
int hits = 0;
auto record = [&hits] { ++hits; };
auto snapshot = [hits] { return hits; };
record();
record();
int a = hits;          // @1
int b = snapshot();    // @2
```

---

`[&hits]` captures by **reference**: `record` changes the caller's `hits`,
so it is 2. `[hits]` captures by **copy**, taken when the lambda is
created; `hits` was 0 then, and later changes never reach the copy. (A
by-copy capture is also read-only in the body unless the lambda is marked
`mutable`.) Verified with GCC 16.2 (`g++ -std=c++23`).
