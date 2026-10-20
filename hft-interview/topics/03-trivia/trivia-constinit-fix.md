---
id: trivia-constinit-fix
kind: code
version: 1
level: 3
tags: [hft-trivia, initialization, const-constexpr-consteval]
requires:
  - trivia-init-order-fiasco
  - cpp-essentials/const-constexpr-const-vs-constexpr-cloze
input: chips
choices:
  c1: ["constinit", "constexpr", "const", "static"]
compile:
  harness: |
    int load_limit() { return 2000; }
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/constinit
  - https://timsong-cpp.github.io/cppwp/n4950/dcl.constinit#2
---

Other files' globals read `max_orders` while the program starts, and
`raise_limit` changes it later. Complete the definition so the build
breaks if anyone ever gives it an initializer that would run at start-up
instead of at compile time.

```cpp
constexpr int default_limit() { return 1000; }
int load_limit();                                    // reads the config file
extern int max_orders;                               // orders.h, included everywhere
{{c1::constinit}} int max_orders = default_limit();  // orders.cpp
void raise_limit() { max_orders = load_limit(); }
```

---

**`constinit` (C++20) demands constant initialization**: if the
initializer isn't a constant expression the program is ill-formed, so no
other file's global can ever read `max_orders` as zero before its default
is set. It does not add `const`, so `raise_limit` still writes it.
Changing the initializer to `std::atoi("1000")` would now fail to build:
it yields 1000 but isn't `constexpr`, so without `constinit` it would
silently become dynamic initialization, the fiasco again.

`constexpr` and `const` make the variable `const`: they contradict the
header's `int` and forbid the write. `static` gives internal linkage,
which contradicts the header's `extern` and hides it from the other files.
