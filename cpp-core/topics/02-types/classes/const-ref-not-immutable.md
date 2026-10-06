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
requires:
  - class-const-member-function
refs:
  - https://en.cppreference.com/w/cpp/language/cv
  - https://en.cppreference.com/w/cpp/language/reference
elaborate: Which of your functions take a `const&` and a non-const reference of the same type? What would a caller passing the same object twice do to them?
---

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

A tempting belief: "`c` is `const&`, so the object cannot change while I
hold it." Wrong: `const` restricts this **access path**, not the object.
`other` aliases the same `k`, so `bump()` changes what `c` sees. The
optimiser must assume this too, which is why it reloads `c.value()`.
Verified by running an instrumented copy under GCC 16.2 (`g++ -std=c++23`).
