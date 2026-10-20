---
id: spaceship-less-from-three-way
kind: basic
version: 1
level: 3
tags: [comparisons]
requires:
  - spaceship-basics
  - operator-overloading-basics
  - const-member-on-const-ref
elaborate: Say in one sentence why a type in C++20 code declares `<=>` once rather than `<`, `<=`, `>` and `>=` separately.
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Call_to_an_overloaded_operator
  - https://eel.is/c++draft/over.match.oper#3.4
---

`Money` declares a hand-written `operator<=>` and no `operator<`;
`std::strong_ordering` is the type that `<=>` on two `int`s gives.

```cpp
struct Money {
    int cents;
    std::strong_ordering operator<=>(const Money& o) const {
        return cents <=> o.cents;
    }
};
bool cheaper(Money a, Money b) { return a < b; }
```

## In C++20, what does the compiler turn `a < b` into?

---

**`(a <=> b) < 0`: a *rewritten candidate* built from `operator<=>`.**

Overload resolution for `a < b` adds a candidate that compares the
result of any usable `<=>` with `0`; likewise for `<=`, `>` and `>=`. So the four ordering operators never need writing by hand.
