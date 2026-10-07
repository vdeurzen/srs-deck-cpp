---
id: templates-subsumption-overload
kind: code
version: 1
level: 4
tags: [templates, concepts, overload-resolution]
input: chips
choices:
  c1: ["std::signed_integral", "SignedInt", "std::unsigned_integral", "std::integral"]
compile:
  harness: |
    static_assert(kind(1u) == 1);
    static_assert(kind(-1) == 2);
    int main() {}
requires:
  - templates-concept-subsumption
refs:
  - https://en.cppreference.com/w/cpp/language/constraints#Partial_ordering_of_constraints
  - https://eel.is/c++draft/temp.constr.order
---

`SignedInt` accepts exactly the signed integer types. Constrain the second
overload so `kind(-1)` returns 2 and `kind(1u)` returns 1.

```cpp
#include <concepts>
#include <type_traits>
template<class T>
concept SignedInt = std::is_integral_v<T> && std::is_signed_v<T>;

template<std::integral T> constexpr int kind(T) { return 1; }
template<{{c1::std\::signed_integral}} T> constexpr int kind(T) { return 2; }
```

---

Subsumption only sees through concept names. `std::signed_integral` is
spelled `std::integral<T> && std::is_signed_v<T>`, so its normal form
contains `std::integral`'s own atomic constraint, and it is more
constrained. `SignedInt` spells `std::is_integral_v<T>` itself: an atomic
constraint counts as identical only if it is the same expression from the
same declaration, so neither overload is more constrained and `kind(-1)`
is ambiguous. Build concepts from concepts, not from raw traits.
`std::unsigned_integral` sends `-1` to the first overload, and
`std::integral` redeclares the first template.
