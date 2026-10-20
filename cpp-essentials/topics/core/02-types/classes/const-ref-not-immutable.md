---
id: class-const-ref-not-immutable
kind: trace
version: 1
level: 3
tags: [classes, const, tracing, misconception]
probes:
  1: { before: "0" }
  2: { after: "1" }
  3: { d: "1" }
refs:
  - https://en.cppreference.com/w/cpp/language/cv
  - https://en.cppreference.com/w/cpp/language/reference
requires:
  - const-member-on-const-ref
elaborate: Say aloud where in your own code a function takes a `const&` and a non-const reference of the same type, and what a caller passing one object to both would do.
---

Many expect a `const Counter&` parameter to see the same value for the
whole call. (`int n = 0;` gives every new `Counter` an `n` of 0.)

```cpp
struct Counter {
    int n = 0;
    int value() const { return n; }
    void bump() { ++n; }
};
int observe(const Counter& c, Counter& other) {
    int before = c.value();   // @1
    other.bump();
    int after = c.value();    // @2
    return after - before;
}
Counter k;
int d = observe(k, k);        // @3
```

---

**`const&` forbids writing through `c`; it does not freeze the object.**
`other` names the same `k`, so `bump()` changes what `c` sees: `d` is 1.
The belief is tempting because nothing in `observe` writes through `c`.
Verified by running an instrumented copy under GCC 16.2 (`g++ -std=c++23`).
