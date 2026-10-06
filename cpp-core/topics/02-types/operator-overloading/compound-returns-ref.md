---
id: operators-compound-returns-ref
kind: code
version: 1
level: 2
tags: [operators]
input: chips
choices:
  c1: ["Vec2&", "Vec2", "void", "const Vec2&"]
compile:
  harness: |
    constexpr int chained() {
        Vec2 a{1, 1};
        (a += Vec2{2, 0}) += Vec2{0, 3};
        return a.x * 10 + a.y;
    }
    static_assert(chained() == 34);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/operators#Canonical_implementations
---

Give `operator+=` the canonical return type, so it behaves like `+=` on
`int`: `(a += b) += c` updates `a` twice.

```cpp
struct Vec2 {
    int x, y;
    constexpr {{c1::Vec2&}} operator+=(const Vec2& r) {
        x += r.x;
        y += r.y;
        return *this;
    }
};
```

---

Assignment operators, compound ones included, return `*this` **by
reference**, as built-in types do. Returning `Vec2` by value compiles, but
the second `+=` then updates a temporary copy and `a` misses the `+3`; `void`
cannot be chained at all; `const Vec2&` cannot be modified by the next `+=`.
