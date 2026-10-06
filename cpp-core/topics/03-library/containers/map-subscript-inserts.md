---
id: containers-map-subscript-inserts
kind: trace
version: 1
level: 2
tags: [containers, misconception]
elaborate: In Go, `m["pear"]` on a missing key returns the zero value and leaves the map alone. Where in your own C++ would `[]` have quietly grown a map instead?
requires:
  - containers-map-vs-unordered-map
  - initialization-default-value-zero
probes:
  1: { pears: "0" }
  2: { listed: "true", n: "2" }
refs:
  - https://en.cppreference.com/w/cpp/container/map/operator_at
---

```cpp
std::map<std::string, int> stock{{"apple", 3}};
int pears = stock["pear"];               // @1
bool listed = stock.contains("pear");
auto n = stock.size();                   // @2
```

---

`operator[]` never fails on a missing key: it **inserts** one with a
value-initialised mapped value (`0` for `int`) and returns a reference to
it. Reading `stock["pear"]` therefore added `"pear"`, and the map now holds
two entries. That is why `operator[]` has no `const` overload. To ask
without changing the map, use `contains`, `find` or `at`. Verified with
GCC 16.2 (`g++ -std=c++23`).
