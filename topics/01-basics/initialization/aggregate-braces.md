---
id: initialization-aggregate-braces
kind: code
version: 1
level: 1
tags: [initialization]
input: chips
choices:
  c1: ["1, 2", "2, 1", "0, 0", "1, 2, 3"]
compile:
  harness: |
    static_assert(p.x == 1 && p.y == 2);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/aggregate_initialization
---

Complete the aggregate-initialization so `p.x` is `1` and `p.y` is `2`.

```cpp
struct Point { int x; int y; };
constexpr Point p{ {{c1::1, 2}} };
```

---

`Point` has no user-declared constructors, so it is an aggregate: braces
initialize its members in declaration order, positionally.
