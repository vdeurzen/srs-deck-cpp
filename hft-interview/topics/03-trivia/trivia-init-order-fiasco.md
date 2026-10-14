---
id: trivia-init-order-fiasco
kind: basic
version: 1
level: 3
tags: [hft-trivia, initialization, linkage]
requires:
  - cpp-core/initialization-static-zero
  - cpp-core/linkage-translation-unit
refs:
  - https://en.cppreference.com/w/cpp/language/siof
  - https://timsong-cpp.github.io/cppwp/n4950/basic.start.dynamic#3.3
  - https://timsong-cpp.github.io/cppwp/n4950/basic.start.static#2
elaborate: If `rate` were a `std::string`, what would reading it "too early" mean, and is that still just an unspecified value?
---

```cpp
// a.cpp
int read_rate();              // defined in another file; returns 21 at run time
int rate = read_rate();

// b.cpp
extern int rate;
int doubled = rate * 2;
```

## What can `doubled` hold once both initializations have run?

---

**42 or 0; which one is unspecified.** Both are dynamically initialized
globals in different translation units, so their initializations are
indeterminately sequenced. `rate` is zero-initialized before any dynamic
initialization, so an early read sees 0, never garbage. Fix: a
function-local `static` (initialized on first use). `constinit` only works
when the initializer is a constant expression (next Card).
