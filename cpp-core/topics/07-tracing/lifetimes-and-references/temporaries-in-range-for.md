---
id: trace-temporaries-in-range-for
kind: trace
version: 1
level: 3
tags: [tracing, ranges]
probes:
  1: { total: "0", seen: "0" }
  2: { total: "60", seen: "3", result: "60" }
requires:
  - value-categories-temporary-materialization
refs:
  - https://en.cppreference.com/w/cpp/language/range-for
---

```cpp
int total = 0;
int seen = 0;          // @1
for (int v : {10, 20, 30}) {
  total += v;
  ++seen;
}
int result = total;    // @2
```

---

`{10, 20, 30}` is a temporary `std::initializer_list<int>`, but a
range-based `for` binds its range expression to a hidden reference for
the whole loop, extending that temporary's lifetime to match — it does
not get destroyed after the first iteration, or ever go stale mid-loop.
The loop runs all three iterations and `total`/`seen` end up reflecting
all of them. Verified against GCC 13.3 (`g++ -std=c++23`), including a
clean run under `-fsanitize=address`.
