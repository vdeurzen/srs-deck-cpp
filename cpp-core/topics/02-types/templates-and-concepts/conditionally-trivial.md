---
id: templates-conditionally-trivial
kind: code
version: 1
level: 5
tags: [templates, concepts, special-members]
input: chips
choices:
  c1:
    - "requires std::is_trivially_destructible_v<T>"
    - "requires std::is_destructible_v<T>"
    - "requires (!std::is_trivially_destructible_v<T>)"
    - "noexcept"
compile:
  harness: |
    #include <string>
    static_assert(std::is_trivially_destructible_v<Slot<int>>);
    static_assert(std::is_destructible_v<Slot<std::string>>);
    static_assert(!std::is_trivially_destructible_v<Slot<std::string>>);
    int main() {}
requires:
  - templates-requires-clause
refs:
  - https://en.cppreference.com/w/cpp/language/destructor#Prospective_destructor
  - https://wg21.link/p0848r3
---

`Slot<int>` must stay as cheap as `int` itself: copyable with `memcpy`,
passed in registers, no destructor call at all. `Slot<std::string>` must
run its cleanup. A destructor has no template parameters, so SFINAE
cannot choose between two. Complete the first one.

```cpp
#include <type_traits>
template<class T>
struct Slot {
    union { T value; };
    bool engaged = false;
    ~Slot() {{c1::requires std\::is_trivially_destructible_v<T>}} = default;
    ~Slot() { if (engaged) value.~T(); }
};
```

---

Since C++20 (P0848) a class may declare several *prospective*
destructors, and a requires-clause can constrain them even though they
are not templates. For `int` both are viable and the constrained one is
more constrained (a constrained declaration beats an unconstrained one),
so the trivial `= default` is selected. For
`std::string` only the user-provided one is viable. With
`is_destructible_v`, `std::string` also selects the defaulted one, which
is deleted because of the union member. The negated test makes `Slot<int>`
non-trivial, and `noexcept` leaves two unconstrained destructors.
