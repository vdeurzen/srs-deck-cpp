---
id: variadic-recursive-peel
kind: code
version: 1
level: 2
tags: [templates, variadic]
requires:
  - variadic-expansion-placement
input: chips
choices:
  c1: ["rest...", "rest", "first, rest...", "Rest..."]
compile:
  harness: |
    static_assert(sum(1, 2, 3) == 6);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/pack
  - https://en.cppreference.com/w/cpp/language/fold
---

Pre-C++17 style: complete the recursive call so `sum` peels off one
argument per step.

```cpp
constexpr int sum() { return 0; }
template<typename T, typename... Rest>
constexpr int sum(T first, Rest... rest) { return first + sum({{c1::rest...}}); }
```

---

Before folds, a pack was consumed by recursion: take `first`, recurse on
the expanded tail, stop at a non-template base case. Passing `first`
again never shrinks the pack; `rest` alone is unexpanded. Each step is a
separate instantiation, which is why C++17's one-expression
`(0 + ... + rest)` replaced the pattern.
