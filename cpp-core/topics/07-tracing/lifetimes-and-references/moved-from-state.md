---
id: trace-moved-from-state
kind: trace
version: 1
level: 3
tags: [tracing, move-semantics]
probes:
  1: { a: "", b: "hello" }
  2: { a: "world", b: "hello" }
requires:
  - move-semantics-moved-from-state
refs:
  - https://en.cppreference.com/w/cpp/utility/move
---

```cpp
std::string a = "hello";
std::string b = std::move(a);   // @1
a = "world";                     // @2
```

---

The standard only guarantees `a` is left **valid but unspecified** after
`std::move(a)` is used to construct `b` — it does not promise `a` becomes
empty. This trace's expected values are `libstdc++`'s actual behaviour,
not a language guarantee: GCC 13.3's `std::string` (`g++ -std=c++23`)
resets a moved-from short string to empty via its small-string
optimisation, so `a` prints as `""` at Probe 1. A different standard
library is free to leave `a` holding something else entirely, as long as
destroying or reassigning it (as Probe 2 does) is still safe.
