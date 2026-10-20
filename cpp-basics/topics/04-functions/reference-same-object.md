---
id: fn-reference-same-object
kind: trace
version: 1
level: 1
tags: [functions, parameters, references, tracing]
probes:
  1: { a: "true" }
  2: { b: "false" }
requires:
  - cpp-essentials/const-ref-parameter
  - cpp-essentials/fn-by-value-vs-reference
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization
  - https://eel.is/c++draft/expr.call#7
---

```cpp
struct Record { int data[1000]; };
Record rec{};

bool by_ref(const Record& r) { return &r == &rec; }
bool by_val(Record r)        { return &r == &rec; }

int main() {
    bool a = by_ref(rec);     // @1
    bool b = by_val(rec);     // @2
}
```

---

A reference parameter is bound to the argument itself, so `&r` is the
address of `rec`: **no new object exists**. A by-value parameter is a
**separate object**, initialised as a 4000-byte copy, with its own address.
That address test is exactly the copy `const Record&` avoids. Verified by
running an instrumented copy under GCC 16.2 (`g++ -std=c++23`).
