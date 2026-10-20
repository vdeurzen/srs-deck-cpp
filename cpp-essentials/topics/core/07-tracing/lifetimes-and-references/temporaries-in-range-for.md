---
id: trace-temporaries-in-range-for
kind: trace
version: 3
level: 3
tags: [tracing, lifetime, temporaries]
probes:
  1: { trail: "B..~", total: "30" }
requires:
  - range-for-expr-first
  - ptr-lifetime-extension
  - fn-auto-return-type
elaborate: Where in your code does a range-`for` loop over a function's by-value result, and what keeps that result alive?
refs:
  - https://en.cppreference.com/w/cpp/language/range-for
  - https://timsong-cpp.github.io/cppwp/n4950/stmt.ranged#1
---

`Bag{}` is a temporary; read `trail` and `total` after the loop.

```cpp
std::string trail;   // Bag's constructor appends 'B', its destructor '~'
struct Bag {
  std::vector<int> v{10, 20};
  Bag() { trail += 'B'; }
  ~Bag() { trail += '~'; }
  auto begin() { return v.begin(); }
  auto end() { return v.end(); }
};
int total = 0;
for (int x : Bag{}) { total += x; trail += '.'; }   // @1
```

---

The loop first binds a hidden reference to the range expression,
`Bag{}`. The temporary binds directly to that reference, so its lifetime
is extended until the loop ends: two iterations (`..`) read live
elements, and only then `~`. Had it died at the end of its own
full-expression, the trail would read `B~..` and the loop would read a
dead object. Values verified with GCC 16.2 under AddressSanitizer.
