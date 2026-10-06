---
id: variadic-sizeof-pack
kind: trace
version: 1
level: 1
tags: [templates, variadic, tracing]
requires:
  - variadic-what-is-a-pack
probes:
  1: { a: "0" }
  2: { b: "3" }
  3: { c: "2" }
refs:
  - https://en.cppreference.com/w/cpp/language/sizeof...
---

```cpp
template<typename... Ts>
constexpr std::size_t n_args(Ts... args) { return sizeof...(args); }

auto a = n_args();               // @1
auto b = n_args(1, 'c', 2.0);    // @2
auto c = n_args("hello", 'c');   // @3
```

---

`sizeof...` counts the **elements** of a pack, at compile time; it says
nothing about their sizes in bytes. An empty pack counts 0, and a
string literal is still one argument. Verified with GCC 16.2
(`g++ -std=c++23`).
