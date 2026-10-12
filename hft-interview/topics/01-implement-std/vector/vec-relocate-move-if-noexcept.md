---
id: vec-relocate-move-if-noexcept
kind: code
version: 1
level: 3
tags: [vector, move-semantics, exceptions, implement-std]
input: chips
choices:
  c1:
    - "std::move_if_noexcept(old[i])"
    - "std::move(old[i])"
    - "old[i]"
    - "std::as_const(old[i])"
compile:
  harness: |
    template <bool NothrowMove>
    struct Counted {                                  // counts copies made of it
        int* copies;
        constexpr explicit Counted(int* c) : copies(c) {}
        constexpr Counted(const Counted& o) : copies(o.copies) { ++*copies; }
        constexpr Counted(Counted&& o) noexcept(NothrowMove) : copies(o.copies) {}
    };
    template <bool NothrowMove>
    consteval int copies_to_relocate_3() {
        using C = Counted<NothrowMove>;
        int copies = 0;
        std::allocator<C> a;
        C* old = a.allocate(3);
        for (int i = 0; i != 3; ++i) std::construct_at(old + i, &copies);
        C* fresh = a.allocate(6);
        relocate(old, 3, fresh);
        std::destroy(fresh, fresh + 3);
        a.deallocate(old, 3);  a.deallocate(fresh, 6);
        return copies;
    }
    static_assert(copies_to_relocate_3<false>() == 3);   // move may throw
    static_assert(copies_to_relocate_3<true>() == 0);    // move is noexcept
    int main() {}
requires:
  - cpp-core/move-semantics-vector-move-if-noexcept
  - vec-realloc-order
refs:
  - https://en.cppreference.com/w/cpp/utility/move_if_noexcept
  - https://timsong-cpp.github.io/cppwp/n4950/vector.modifiers#2
---

Your `push_back` must keep the strong guarantee: if growing throws,
the vector is unchanged. Complete the relocation so it moves elements
when that can't throw, and copies them otherwise.

```cpp
#include <cstddef>
#include <memory>
#include <utility>
template <class T>
constexpr void relocate(T* old, std::size_t n, T* fresh) {
    for (std::size_t i = 0; i != n; ++i)
        std::construct_at(fresh + i, {{c1::std\::move_if_noexcept(old[i])}});
    std::destroy(old, old + n);
}
```

---

Cost per element: the noexcept-move type is moved (0 copies); the type
whose move may throw is copied (3 copies), the price of keeping the old
elements intact if one copy fails. `std::move` moves both, so the
throwing one gets no fallback; `old[i]` and `std::as_const` copy both,
wasting the cheap move.
