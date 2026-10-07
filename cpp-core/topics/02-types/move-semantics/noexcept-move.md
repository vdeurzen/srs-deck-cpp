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

A defaulted special member's exception specification is computed from
its subobjects: `Part`'s move constructor may throw, so `Widget`'s is
inferred potentially-throwing, and `std::vector` — protecting the strong
guarantee — copies on reallocation (`std::move_if_noexcept`). Since C++20
(P1286R2) a defaulted declaration may state a different specification,
and `noexcept` here overrides the computed one. It is a promise enforced
by `std::terminate`, so it is honest only if `Part`'s move never actually
throws; in real code, prefer making the member's move `noexcept` so the
defaulted one is inferred correctly. The two conditional spellings
compute the specification from `Part` — which is exactly what the
default already does, so they yield `noexcept(false)` and change nothing.
