---
id: const-constexpr-consteval-template-argument
kind: code
version: 2
level: 3
tags: [const-constexpr-consteval, templates]
input: chips
choices:
  c1: ["consteval", "constexpr", "inline", "static"]
compile:
  harness: |
    template<int V> struct Box { static constexpr int value = V; };
    static_assert(Box<volume(3)>::value == 27);
    int main() {}
requires:
  - const-constexpr-consteval-immediate-function-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/consteval
  - https://timsong-cpp.github.io/cppwp/n4950/expr.const#15
---

`cube` is an immediate function. Complete the specifier on `volume` so it
may pass its own parameter to `cube`.

```cpp
consteval int cube(int n) { return n * n * n; }
{{c1::consteval}} int volume(int side) { return cube(side); }
```

---

`cube(side)` is not a constant expression, since `side` is a run-time
parameter. Outside an **immediate function context** that is an error, even
inside a `constexpr` function: a `constexpr` body must also make sense at
run time. Inside a `consteval` function the call is fine, because
`volume` itself only ever runs during translation.
