---
id: trace-auto-deduction
kind: trace
version: 1
level: 2
tags: [tracing, auto]
probes:
  1: { x: "1", y: "1" }
  2: { x: "1", y: "99" }
requires:
  - trace-copy-vs-reference
refs:
  - https://en.cppreference.com/w/cpp/language/auto
---

```cpp
int x = 1;
int& ref = x;
auto y = ref;      // @1
y = 99;             // @2
```

---

`auto` deduces from the **type of the initialising expression**, not from
how that expression was declared: `ref` is `int&`, but `auto y = ref;`
strips the reference and deduces plain `int`, giving `y` its own storage.
Assigning to `y` afterwards therefore never touches `x` — to keep the
reference, the declaration needs `auto&`. Verified against GCC 13.3
(`g++ -std=c++23`).
