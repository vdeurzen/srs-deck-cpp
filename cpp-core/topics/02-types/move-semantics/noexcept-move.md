---
id: move-semantics-noexcept-move
kind: code
version: 1
level: 4
tags: [move-semantics]
input: chips
choices:
  c1: ["noexcept", "noexcept(false)", "constexpr", "explicit"]
compile:
  harness: |
    static_assert(std::is_nothrow_move_constructible_v<Widget>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/noexcept_spec
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---

`Widget` holds a member whose own move constructor can throw. Mark
`Widget`'s move constructor `noexcept` anyway, promising the caller it
will not — the point of this card, not the member's behaviour.

```cpp
#include <type_traits>
struct ThrowingMovable {
    ThrowingMovable() = default;
    ThrowingMovable(ThrowingMovable&&) {}
};
struct Widget {
    ThrowingMovable member;
    Widget(Widget&&) {{c1::noexcept}} = default;
};
```

---

Left unspecified, a defaulted special member's exception specification is
computed from its subobjects: since `ThrowingMovable`'s move constructor
is not `noexcept`, `Widget`'s would be inferred as potentially-throwing
too. This matters beyond documentation: `std::vector` only moves its
elements during reallocation when their move constructor is `noexcept`
(via `std::move_if_noexcept`) — otherwise, if the type is copyable, it
copies them, to preserve the strong exception guarantee. A copyable type
with a throwing move constructor is silently copied by containers that
would otherwise have moved it.
