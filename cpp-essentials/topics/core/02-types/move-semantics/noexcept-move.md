---
id: move-semantics-noexcept-move
kind: code
version: 1
level: 4
tags: [move-semantics, exceptions]
input: chips
choices:
  c1: ["noexcept", "noexcept(false)", "noexcept(std::is_nothrow_move_constructible_v<Part>)", "noexcept(noexcept(Part(std::declval<Part>())))"]
compile:
  harness: |
    static_assert(std::is_nothrow_move_constructible_v<Widget>);
    static_assert(std::is_copy_constructible_v<Widget>);
    int main() {}
requires:
  - move-semantics-vector-move-if-noexcept
refs:
  - https://en.cppreference.com/w/cpp/language/noexcept_spec
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://wg21.link/p1286r2
---

`std::vector<Widget>` copies every element whenever it reallocates,
although `Widget` has a move constructor. Change that declaration so the
vector moves them instead.

```cpp
#include <type_traits>
#include <utility>
struct Part {
    Part() = default;
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
the vector copy. Since C++20 (P1286R2) the declaration may say `noexcept`
explicitly; both conditional spellings recompute `false`. A throw would
call `std::terminate`: better, make `Part`'s move `noexcept`.
