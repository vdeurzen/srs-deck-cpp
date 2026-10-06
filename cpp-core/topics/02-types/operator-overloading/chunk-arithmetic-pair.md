---
id: operators-chunk-arithmetic-pair
kind: chunk
version: 1
level: 2
tags: [operators, idioms]
expose_ms: 10000
compile:
  harness: |
    static_assert((Vec2{1, 2} + Vec2{3, 4}).x == 4);
    static_assert((Vec2{1, 2} + Vec2{3, 4}).y == 6);
    int main() {}
requires:
  - operators-compound-returns-ref
  - operators-hidden-friend-symmetric
refs:
  - https://en.cppreference.com/w/cpp/language/operators#Canonical_implementations
---

```cpp
struct Vec2 {
    int x, y;
    constexpr Vec2& operator+=(const Vec2& r) { x += r.x; y += r.y; return *this; }
    friend constexpr Vec2 operator+(Vec2 l, const Vec2& r) { return l += r; }
};
```

---

The canonical arithmetic pair. `+=` is the member that does the work and
returns `*this` by reference. `+` is a hidden friend (symmetric
conversions, found only by ADL) that takes its left operand **by value**:
that copy is the result, so `+` reuses `+=` and the logic lives in one
place.
