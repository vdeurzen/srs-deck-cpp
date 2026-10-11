---
id: iter-at-checks-bounds
kind: trace
version: 1
level: 1
tags: [containers, vector, tracing]
probes:
  1: { got: "-1", threw: "true" }
refs:
  - https://en.cppreference.com/w/cpp/container/vector/at
  - https://en.cppreference.com/w/cpp/container/vector/operator_at
---

```cpp
std::vector<int> v{4, 5, 6};
int got = -1;
bool threw = false;
try {
    got = v.at(3);
} catch (const std::out_of_range&) {
    threw = true;
}                          // @1
```

---

Valid indices are 0 to `size() - 1`, so 3 is out of range. `at` checks the
index and throws `std::out_of_range`; the assignment never happens, so
`got` keeps -1. `v[3]` does **no** check: reading past the end is undefined
behaviour, which may return garbage, crash, or appear to work. Use `[]`
when the index is known valid, `at` when it may not be. Verified with
GCC 16.2 (`g++ -std=c++23`).
