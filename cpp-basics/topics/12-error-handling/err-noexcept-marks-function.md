---
id: err-noexcept-marks-function
kind: code
version: 1
level: 2
tags: [exceptions]
requires:
  - cpp-essentials/err-noexcept-broken-promise
input: chips
choices:
  c1: ["noexcept", "const", "noexcept(false)"]
compile:
  harness: |
    #include <utility>
    static_assert(noexcept(swap_coords(std::declval<Point&>())));
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/noexcept_spec
  - https://en.cppreference.com/w/cpp/language/noexcept
---

`swap_coords` only copies `int`s, so nothing in it can throw. Complete
the declaration so callers, and the standard library, can see that at
compile time.

```cpp
struct Point { int x; int y; };
void swap_coords(Point& p) {{c1::noexcept}} {
    int t = p.x;
    p.x = p.y;
    p.y = t;
}
```

---

`noexcept` after the parameter list promises the function never throws,
and the operator form `noexcept(expr)` reports that promise as a
compile-time `bool`. `noexcept(true)` means the same; `noexcept(false)`
says the opposite (the default).
`const` belongs only on member functions: it promises not to modify the
object, and says nothing about exceptions.
