---
id: trace-temporaries-in-range-for
kind: trace
version: 2
level: 3
tags: [tracing, lifetime, temporaries]
probes:
  1: { trail: "B...~", sum: "60" }
  2: { trail: "B...~B~", first: "10" }
requires:
  - ptr-lifetime-extension
elaborate: "`for (int x : make_holder().items())` binds the hidden reference to what `items()` returns, not to the holder. Where in your code does a loop rely on P2718 to keep such a holder alive, and which compilers you ship with implement it?"
refs:
  - https://en.cppreference.com/w/cpp/language/range-for
  - https://timsong-cpp.github.io/cppwp/n4950/stmt.ranged#1
  - https://wg21.link/p2718r0
---

```cpp
std::string trail;   // Bag's constructor appends 'B', its destructor '~'
struct Bag {
  int v[3] = {10, 20, 30};
  Bag() { trail += 'B'; }
  ~Bag() { trail += '~'; }
  const int* begin() const { return v; }
  const int* end() const { return v + 3; }
};
int total = 0;
for (int x : Bag{}) { total += x; trail += '.'; }
int sum = total;               // @1
int first = *Bag{}.begin();    // @2
```

---

A range-based `for` is defined as `auto&& __range = Bag{};` followed by
the loop, so the temporary `Bag` binds directly to a reference and lives
until the loop ends: three iterations (`...`), then `~`. The second
`Bag{}` binds to nothing and dies at the end of its full-expression, right
after `first` copied `10` out of it. Before P2718 (C++23, GCC 15+)
only the temporary bound directly is rescued: in `for (x :
make().items())` the `make()` result dies first; P2718 extends it too.
Verified by running an instrumented copy under GCC 16.2 (`g++ -std=c++23`), clean under
`-fsanitize=address,undefined`.
