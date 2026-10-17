---
id: variadic-expansion-placement
kind: trace
version: 1
level: 2
tags: [templates, variadic, tracing]
requires:
  - variadic-what-is-a-pack
probes:
  1: { a: "14" }
  2: { b: "36" }
refs:
  - https://en.cppreference.com/w/cpp/language/pack#Pack_expansion
---

```cpp
int add3(int a, int b, int c) { return a + b + c; }
int sq(int x) { return x * x; }

template<typename... Ts>
void run(Ts... args) {
    int a = add3(sq(args)...);   // @1
    int b = sq(add3(args...));   // @2
}
// called as run(1, 2, 3)
```

---

`...` repeats the **whole pattern to its left**. `sq(args)...` becomes
`sq(1), sq(2), sq(3)`, so `a = 1 + 4 + 9`. `args...` alone becomes
`1, 2, 3`, so `b = sq(6)`. Verified with GCC 16.2 (`g++ -std=c++23`).
