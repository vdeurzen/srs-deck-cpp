---
id: spaceship-rewritten-not-equal
kind: code
version: 1
level: 2
tags: [comparisons]
input: chips
choices:
  c1: ["= default", "= delete", "{ return true; }", "noexcept"]
compile:
  harness: |
    static_assert(check());
    int main() {}
requires:
  - spaceship-basics
refs:
  - https://en.cppreference.com/w/cpp/language/overload_resolution#Call_to_an_overloaded_operator
---

`Point` declares only `operator==`, no `operator!=` at all. Make
`a != b` work anyway.

```cpp
struct Point {
    int x, y;
    constexpr bool operator==(const Point&) const {{c1::= default}};
};
constexpr bool check() {
    return Point{1,2} != Point{1,3} && !(Point{1,2} != Point{1,2});
}
```

---

Since C++20, `a != b` is a **rewritten candidate**: if no `operator!=` is
found, the compiler tries `!(a == b)` instead. This works for *any*
usable `operator==`, defaulted or hand-written — the rewrite rule, not
the `= default`, is what gives you `!=`. `= default` is only needed here
to give `Point` a working `operator==` in the first place.
