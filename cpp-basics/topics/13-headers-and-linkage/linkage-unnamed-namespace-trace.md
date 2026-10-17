---
id: linkage-unnamed-namespace-trace
kind: trace
version: 1
level: 2
tags: [linkage, namespaces, tracing]
requires:
  - cpp-essentials/linkage-private-helper
probes:
  1: { a: "2" }
  2: { b: "0" }
refs:
  - https://en.cppreference.com/w/cpp/language/namespace#Unnamed_namespaces
  - https://eel.is/c++draft/basic.link
---

```cpp
// counter.h, included by a.cpp and b.cpp
namespace { int hits = 0; }

// a.cpp:  void hit_a() { ++hits; }   int seen_a() { return hits; }
// b.cpp:  int seen_b() { return hits; }

// main.cpp
hit_a();
hit_a();
int a = seen_a();   // @1
int b = seen_b();   // @2
```

---

Everything in an unnamed namespace has **internal linkage**, and the
header is pasted into each `.cpp` separately, so `a.cpp` and `b.cpp` each
get their own private `hits`. The two increments touch only `a.cpp`'s
copy; `b.cpp`'s is still 0. It links cleanly, which is what makes
per-file state in a header easy to create by accident. Values from
building the three files with GCC 16.2 (`g++ -std=c++23`, `-O0` and
`-O2`) and running the result.
