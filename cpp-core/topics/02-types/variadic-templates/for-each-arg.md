---
id: variadic-for-each-arg
kind: chunk
version: 1
level: 3
tags: [templates, variadic, idioms]
requires:
  - variadic-fold-order
expose_ms: 7000
compile:
  harness: |
    constexpr int total() {
      int s = 0;
      for_each_arg([&](int x) { s += x; }, 1, 2, 3);
      return s;
    }
    static_assert(total() == 6);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/fold
---

```cpp
template<typename F, typename... Ts>
constexpr void for_each_arg(F f, const Ts&... args) {
  (f(args), ...);
}
```

---

The **comma fold**: "do this for each element of the pack", in order,
left to right. The comma operator sequences each `f(args)` call, and
`,` is one of the three operators whose fold over an empty pack is
allowed (it yields `void()`). Before C++17 this needed a recursive
template peeling one argument per call.
