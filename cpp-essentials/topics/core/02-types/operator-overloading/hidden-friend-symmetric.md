---
id: operators-hidden-friend-symmetric
kind: code
version: 1
level: 2
tags: [operators, friend]
input: chips
choices:
  c1:
    - "friend Rational operator+(Rational l, Rational r)"
    - "Rational operator+(Rational l, Rational r)"
    - "friend Rational operator+(Rational l, Rational r) const"
compile:
  harness: |
    int both() {
      return (2 + Rational(1, 2)).num() + (Rational(1, 2) + 2).num();
    }
    int main() {}
requires:
  - operators-member-vs-free
  - class-friend-basics
  - fn-default-argument-intro
elaborate: Where else would a hidden friend serve better than a member, for example `==` or `<<` on one of your own types, and why?
refs:
  - https://en.cppreference.com/w/cpp/language/friend
  - https://en.cppreference.com/w/cpp/language/operators#Binary_arithmetic_operators
---

Every `int` is exactly a `Rational`, so `Rational(int)` is deliberately
implicit. Write `+` inside the class so `2 + r` and `r + 2` both compile.

```cpp
class Rational {
    int n_, d_;
public:
    Rational(int n, int d = 1) : n_(n), d_(d) {}
    int num() const { return n_; }
    {{c1::friend Rational operator+(Rational l, Rational r)}} {
        return Rational(l.n_ * r.d_ + r.n_ * l.d_, l.d_ * r.d_);
    }
};
```

---

Implicit is right here because the conversion is lossless. A `friend` defined in the class is a
**non-member**, so both operands are ordinary parameters and `2` converts on
either side. Without `friend`, two parameters make an ill-formed member;
a trailing `const` is allowed only on a member.
