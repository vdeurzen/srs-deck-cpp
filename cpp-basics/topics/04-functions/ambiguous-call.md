---
id: fn-ambiguous-call
kind: code
version: 1
level: 2
tags: [functions, overloading, conversions]
input: chips
choices:
  c1: ["4L", "4", "4u", "4.0f"]
compile:
  harness: |
    int main() {}
requires:
  - fn-overload-pick
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Ranking_of_implicit_conversion_sequences
---

`scale(4)` does not compile here. Pick the argument that compiles and
calls the first overload.

```cpp
constexpr int scale(long)   { return 1; }
constexpr int scale(double) { return 2; }

static_assert(scale({{c1::4L}}) == 1);
```

---

`4` is an `int`. `int` → `long` and `int` → `double` are both plain
conversions, the same rank, so neither overload is better: the call is
**ambiguous**. `4u` (`unsigned`) has the same problem. `4.0f` compiles, but
`float` → `double` is a promotion, so it picks `scale(double)`. `4L` is a
`long`: an exact match. Other fixes: add a `scale(int)` overload, or write
`scale(long{4})`.
