---
id: fn-overload-trace
kind: trace
version: 1
level: 3
tags: [functions, overloading, conversions, tracing]
probes:
  1: { a: "1" }
  2: { b: "2" }
requires:
  - fn-overload-worked
  - fn-overload-integer-belief
elaborate: Which call in code you have read passes a `char` or `unsigned char` to an overloaded function, and which overload does it reach?
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Ranking_of_implicit_conversion_sequences
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Integral_promotion
---

Each call picks one of the three overloads; read the result at each probe.

```cpp
int f(int)      { return 1; }
int f(unsigned) { return 2; }
int f(double)   { return 3; }

int main() {
    unsigned char small = 5;
    unsigned big = 3;
    int a = f(small);   // @1
    int b = f(big);     // @2
}
```

---

At @1, `unsigned char` is narrower than `int`, so `small` → `int` is a
**promotion**; `small` → `unsigned` is only a conversion, although both
are unsigned. `f(int)` wins. At @2, `big` is already an `unsigned`: an
**exact match** for `f(unsigned)`, which beats everything. Verified by
running an instrumented copy under GCC 16.2 (`g++ -std=c++23`).
