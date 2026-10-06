---
id: staticpoly-no-unique-address
kind: code
version: 1
level: 3
tags: [polymorphism, layout, c++20]
requires:
  - staticpoly-policy-parameter
  - layout-trailing-padding
input: chips
choices:
  c1: ["[[no_unique_address]]", "alignas(1)", "static", "[[maybe_unused]]"]
compile:
  harness: |
    struct Less { constexpr bool operator()(int a, int b) const { return a < b; } };
    static_assert(sizeof(Sorted<Less>) == sizeof(int*));
    static_assert(std::is_member_object_pointer_v<decltype(&Sorted<Less>::cmp)>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/attributes/no_unique_address
  - https://en.cppreference.com/w/cpp/language/ebo
---

Complete the member so a stateless comparator policy adds no bytes to
`Sorted` (GCC/Clang on x86-64).

```cpp
#include <type_traits>
template<class Compare>
struct Sorted {
    {{c1::[[no_unique_address]]}} Compare cmp;
    int* data;
};
```

---

Even an empty member occupies one byte, and padding rounds that up to a
pointer's alignment: 16 bytes. `alignas(1)` changes nothing (it is
already 1); `static` saves the byte but leaves every `Sorted` sharing one
comparator. `[[no_unique_address]]` (C++20) lets the empty member overlap
`data`, replacing the older **empty base optimisation** trick of
inheriting from the policy. MSVC ignores the standard attribute.
