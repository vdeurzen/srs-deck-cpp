---
id: operators-hidden-friend-symmetric
kind: code
version: 1
level: 2
tags: [operators, friend]
input: chips
choices:
  c1:
    - "friend constexpr Rational operator+(Rational l, Rational r)"
    - "constexpr Rational operator+(this Rational l, Rational r)"
    - "constexpr Rational operator+(Rational l, Rational r)"
    - "static constexpr Rational operator+(Rational l, Rational r)"
compile:
  harness: |
    static_assert((2 + Rational(1, 2)).num() == 5);
    static_assert((Rational(1, 2) + 2).num() == 5);
    int main() {}
requires:
  - operators-member-vs-free
refs:
  - https://en.cppreference.com/w/cpp/language/friend
  - https://en.cppreference.com/w/cpp/language/operators#Binary_arithmetic_operators
---

Every `int` is exactly a `Rational`, so `Rational(int)` is deliberately
implicit (as `std::complex` converts from `double`). Write `+` inside the
class so `2 + r` and `r + 2` both compile.

```cpp
class Rational {
    int n_, d_;
public:
    constexpr Rational(int n, int d = 1) : n_(n), d_(d) {}
    constexpr int num() const { return n_; }
    {{c1::friend constexpr Rational operator+(Rational l, Rational r)}} {
        return Rational(l.n_ * r.d_ + r.n_ * l.d_, l.d_ * r.d_);
    }
};
```

---

Implicit here is right because the conversion is lossless and unsurprising,
unlike `Meters` from `double`. A `friend` defined in the class is a
**non-member**, so both operands are ordinary parameters and `2` converts on
either side. The explicit-object (`this Rational l`) version is still a
member: `2 + r` finds no candidate. Without `friend`, two parameters make an
ill-formed member; `static` is not allowed on `+`.
