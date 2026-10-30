---
id: fn-by-value-vs-reference
kind: trace
version: 1
level: 1
tags: [functions, parameters, references, tracing]
probes:
  1: { a: "15", r: "10" }
requires:
  - fn-ref-param-intro
  - fn-param-change-intro
elaborate: How does a reader of a C++ call site tell whether an argument may be changed?
refs:
  - https://en.cppreference.com/w/cpp/language/function
  - https://en.cppreference.com/w/cpp/language/reference
---

```cpp
int mix(int first, int& second) {
    second += 5;
    return first;
}

int main() {
    int a = 10;
    int r = mix(a, a);    // @1
}
```

---

`a` is passed twice, two ways. `int first` is a **new local object**
initialised from `a` at the call, so it holds 10 and nothing done to `a`
later reaches it. `int& second` is **another name for `a` itself**, so
`second += 5` changes `a` to 15. Which one you get is decided by the
parameter's type; the call site looks the same. Verified by running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`).
