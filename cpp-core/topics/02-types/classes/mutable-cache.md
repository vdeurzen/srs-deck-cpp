---
id: class-mutable-cache
kind: code
version: 1
level: 3
tags: [classes, const]
input: chips
choices:
  c1: ["mutable", "static", "const", "volatile"]
compile:
  harness: |
    constexpr int twice() {
        const Polygon p{6};
        return p.diagonals() + p.diagonals();
    }
    static_assert(twice() == 18);
    int main() {}
requires:
  - class-const-member-function
refs:
  - https://en.cppreference.com/w/cpp/language/cv#mutable_specifier
---

`diagonals()` is a `const` observer, yet it remembers its result after the
first call. Complete the cache member declarations.

```cpp
class Polygon {
    int sides_;
    {{c1::mutable}} int cached_ = -1;
public:
    constexpr explicit Polygon(int n) : sides_(n) {}
    constexpr int diagonals() const {
        if (cached_ < 0) cached_ = sides_ * (sides_ - 3) / 2;
        return cached_;
    }
};
```

---

`mutable` exempts one member from the object's constness: `diagonals()` may
write `cached_` even on a `const Polygon`. That is **logical constness**:
the observable value (the shape) never changes, only an internal detail
does. A `static` member would be one cache shared by every polygon (and here
needs `inline` even to compile); `const` and `volatile` still forbid the
write. In threaded code a `mutable` cache needs its own
synchronisation, since `const` callers may run concurrently.
