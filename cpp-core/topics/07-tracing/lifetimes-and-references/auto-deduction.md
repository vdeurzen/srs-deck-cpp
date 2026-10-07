---
id: trace-auto-deduction
kind: trace
version: 2
level: 2
tags: [tracing, auto]
probes:
  1: { x: "1", y: "99" }
  2: { x: "7", y: "99" }
requires:
  - trace-copy-vs-reference
  - ptr-auto-drops-ref
refs:
  - https://en.cppreference.com/w/cpp/language/auto
---

```cpp
int x = 1;
int& ref = x;
auto y = ref;
auto& z = ref;
y = 99;            // @1
z = 7;             // @2
```

---

Both declarations start from the same `int&`, but plain `auto` drops the
reference: `y` is a new `int`, so writing it never reaches `x`. `auto&`
keeps it: `z` is one more name for `x`, so `z = 7` changes `x`, and the
copy `y` is unaffected. Verified by running an instrumented copy under
GCC 16.2 (`g++ -std=c++23`).
