---
id: trace-moved-from-state
kind: trace
version: 2
level: 3
tags: [tracing, move-semantics]
probes:
  1: { b: "hello" }
  2: { a: "world", b: "hello" }
requires:
  - move-semantics-moved-from-state
refs:
  - https://en.cppreference.com/w/cpp/utility/move
  - https://eel.is/c++draft/lib.types.movedfrom
---

```cpp
std::string a = "hello";
std::string b = std::move(a);   // @1
a = "world";                     // @2
```

---

`b` takes over `a`'s contents. `a` is left **valid but unspecified**: no
probe asks for its value at Probe 1 because the standard does not fix one
(libstdc++ happens to leave it empty). Assignment has no precondition, so
`a = "world"` is safe and gives `a` a known value again, while `b` is
untouched. Verified by running an instrumented copy under GCC 16.2
(`g++ -std=c++23`).
