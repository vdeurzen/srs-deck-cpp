---
id: variadic-forward-pack
kind: code
version: 1
level: 3
tags: [templates, variadic, move-semantics]
requires:
  - variadic-expansion-placement
  - move-semantics-perfect-forwarding
input: chips
choices:
  c1:
    - "std::forward<Args>(args)..."
    - "args..."
    - "std::move(args)..."
    - "std::forward<Args>(args...)"
compile:
  harness: |
    struct Probe {
      int kind;
      constexpr Probe(int&, int&) : kind(1) {}
      constexpr Probe(int&, int&&) : kind(2) {}
      constexpr Probe(int&&, int&) : kind(3) {}
      constexpr Probe(int&&, int&&) : kind(4) {}
    };
    constexpr bool check() {
      int x = 0;
      return build<Probe>(x, 1).kind == 2 && build<Probe>(1, x).kind == 3;
    }
    static_assert(check());
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/utility/forward
  - https://en.cppreference.com/w/cpp/language/pack#Pack_expansion
---

Complete `build` so each argument reaches `T`'s constructor as the same
value category the caller passed, the way `make_unique` does.

```cpp
#include <utility>
template<typename T, typename... Args>
constexpr T build(Args&&... args) {
    return T({{c1::std\::forward<Args>(args)...}});
}
```

---

The pattern `std::forward<Args>(args)` expands pairwise: one forward per
argument, each with its own deduced type. `args...` passes every
argument as an lvalue and `std::move(args)...` every one as an rvalue;
`std::forward<Args>(args...)` leaves `Args` unexpanded.
