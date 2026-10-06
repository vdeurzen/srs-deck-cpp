---
id: class-const-member-function
kind: code
version: 1
level: 2
tags: [classes, const]
input: chips
choices:
  c1: ["const", "noexcept", "&&", "final"]
compile:
  harness: |
    constexpr int peek(const Counter& c) { return c.value(); }
    static_assert(peek(Counter{}) == 0);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/member_functions#Member_functions_with_cv-qualifiers
---

The harness's `peek` receives a read-only reference to a `Counter`.
Qualify `value()` so `peek` may call it, while `bump()` stays off-limits
there.

```cpp
class Counter {
    int n_ = 0;
public:
    constexpr void bump() { ++n_; }
    constexpr int value() {{c1::const}} { return n_; }
};
```

---

A trailing `const` makes `this` a pointer to `const Counter`: the function
promises not to modify the object, and in exchange it is callable on
`const` objects and through `const&`. `bump()` stays non-`const`, so
`peek` cannot call it. Without the qualifier, every observer you forget to
mark becomes unusable from any `const&` parameter. `noexcept` and `final`
say nothing about the object's constness, and `&&` restricts the call to
rvalues, so a `const&` still cannot reach it.
