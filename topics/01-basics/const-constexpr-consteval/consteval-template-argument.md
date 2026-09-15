---
id: const-constexpr-consteval-template-argument
kind: code
version: 1
level: 3
tags: [const-constexpr-consteval, templates]
input: chips
choices:
  c1: ["consteval", "static", "inline", "typename"]
compile:
  harness: |
    static_assert(Box<cube(3)>::value == 27);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/consteval
---

Complete the specifier so `cube` can be used as a non-type template
argument, which requires a constant expression at every call site.

```cpp
{{c1::consteval}} int cube(int n) { return n * n * n; }
template<int V> struct Box { static constexpr int value = V; };
```

---

`Box<cube(3)>` needs `cube(3)` to be a constant expression. An ordinary or
`static` function is never one, no matter how simple its body; only
`consteval` (or `constexpr` in a context that forces compile-time
evaluation) qualifies. `consteval` goes further and makes *every* call to
`cube` a compile error unless it too is a constant expression — there is
no runtime fallback.
