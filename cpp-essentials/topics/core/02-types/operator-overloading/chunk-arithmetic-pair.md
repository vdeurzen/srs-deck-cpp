---
id: operators-chunk-arithmetic-pair
kind: chunk
version: 1
level: 2
tags: [operators, idioms]
expose_ms: 10000
compile:
  harness: |
    #include <type_traits>
    #include <utility>
    static_assert(std::is_same_v<decltype(std::declval<Vec2&>() += Vec2{}), Vec2&>);
    static_assert(std::is_same_v<decltype(Vec2{} + Vec2{}), Vec2>);
    int main() { Vec2 a{1, 2}; Vec2 b = a + Vec2{3, 4}; b += a; }
requires:
  - operators-compound-returns-ref
  - operators-hidden-friend-symmetric
refs:
  - https://en.cppreference.com/w/cpp/language/operators#Canonical_implementations
---

```cpp
struct Vec2 {
    int x, y;
    Vec2& operator+=(const Vec2& r) { x += r.x; y += r.y; return *this; }
    friend Vec2 operator+(Vec2 l, const Vec2& r) { return l += r; }
};
```

---

The canonical arithmetic pair. `+=` is the member that does the work and
returns `*this` by reference. `+` is a hidden friend (symmetric
conversions, found only by ADL) that takes its left operand **by value**:
that copy is the result, so `+` reuses `+=` and the logic lives in one
place.
