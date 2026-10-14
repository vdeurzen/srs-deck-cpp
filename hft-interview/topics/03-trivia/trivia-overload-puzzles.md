---
id: trivia-overload-puzzles
kind: trace
version: 1
level: 3
tags: [hft-trivia, overloading, conversions, tracing]
requires:
  - cpp-basics/fn-overload-pick
  - cpp-basics/ptr-nullptr-overload
probes:
  1: { r: "int" }
  2: { r: "void*" }
  3: { r: "string" }
  4: { r: "bool" }
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Ranking_of_implicit_conversion_sequences
  - https://timsong-cpp.github.io/cppwp/n4950/over.ics.rank#2
  - https://timsong-cpp.github.io/cppwp/n4950/over.ics.rank#4.1
elaborate: A colleague adds `f(std::string_view)` to fix the last call. Does `f("hi")` change, and why?
---

```cpp
#include <string>
const char* f(int)         { return "int"; }
const char* f(void*)       { return "void*"; }
const char* f(bool)        { return "bool"; }
const char* f(std::string) { return "string"; }

int main() {
    int n = 0;
    const char* r;
    r = f(0);                 // @1
    r = f(&n);                // @2
    r = f(std::string("x"));  // @3
    r = f("hi");              // @4
}
```

---

`0` is an `int`: exact match. `&n` is an `int*`, which converts to both
`void*` and `bool`, but a conversion that doesn't produce `bool` from a
pointer ranks better ([over.ics.rank]/4.1), so `void*` wins. A
`std::string` is an exact match for `f(std::string)`.

**`"hi"` is the trap.** The array decays to `const char*`, which cannot
become `void*` (that drops `const`) but can become `bool`, a standard
conversion. Any standard conversion sequence beats a user-defined one such
as `const char*` → `std::string` ([over.ics.rank]/2), so `bool` wins. The
fix is a `const char*` overload, an exact match after the array decays.

Values from compiling and running an instrumented copy with GCC 16.2
(`g++ -std=c++23`) and with g142 on Compiler Explorer; both agree.
