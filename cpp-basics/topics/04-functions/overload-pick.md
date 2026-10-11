---
id: fn-overload-pick
kind: trace
version: 1
level: 2
tags: [functions, overloading, conversions, tracing]
requires:
  - fn-overload-ranking
  - types-promotion-rule
probes:
  1: { calls: "i" }
  2: { calls: "id" }
  3: { calls: "idi" }
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Ranking_of_implicit_conversion_sequences
  - https://en.cppreference.com/w/cpp/language/implicit_conversion#Integral_promotion
---

```cpp
#include <string>
std::string calls;

void show(int)    { calls += 'i'; }
void show(long)   { calls += 'L'; }
void show(double) { calls += 'd'; }

int main() {
    show('A');      // @1
    show(2.5f);     // @2
    show(true);     // @3
}
```

---

No overload takes `char`, `float` or `bool` exactly, so overload resolution
ranks the conversions. A **promotion** beats a plain **conversion**:
`char` and `bool` promote to `int` (not to `long`, which is a conversion),
and `float` promotes to `double`. So `'A'` and `true` pick `show(int)` and
`2.5f` picks `show(double)`. Verified by running an instrumented copy under
GCC 16.2 (`g++ -std=c++23`).
