---
id: move-semantics-noexcept-move
kind: code
version: 1
level: 4
tags: [move-semantics, exceptions]
input: chips
choices:
  c1: ["noexcept", "noexcept(false)", "noexcept(std::is_nothrow_move_constructible_v<Part>)"]
compile:
  harness: |
    static_assert(std::is_nothrow_move_constructible_v<Widget>);
    static_assert(std::is_copy_constructible_v<Widget>);
    int main() {}
requires:
  - move-semantics-vector-move-if-noexcept
  - class-default-delete-where
elaborate: Say aloud what you would change first, `Widget` or `Part`, and why the other fix is only a patch.
refs:
  - https://en.cppreference.com/w/cpp/language/noexcept_spec
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---

`std::vector<Widget>` copies every element whenever it reallocates,
although `Widget` has a move constructor. Complete `Widget`'s move
constructor so the vector moves them instead.

```cpp
#include <type_traits>
struct Part {
    Part(const Part&) = default;
    Part(Part&&) {}
};
struct Widget {
    Part part;
    Widget(const Widget&) = default;
    Widget(Widget&&) {{c1::noexcept}} = default;
};
```

---

**`noexcept`.** A defaulted move inherits its members' exception
specification: `Part(Part&&)` may throw, so `std::move_if_noexcept` makes
the vector copy. Writing `noexcept` on the defaulted declaration overrides
that; asking whether `Part`'s move is nothrow just recomputes `false`. A
throw would now call `std::terminate`: better, make `Part`'s move `noexcept`.
