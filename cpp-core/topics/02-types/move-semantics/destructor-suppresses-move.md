---
id: move-semantics-destructor-suppresses-move
kind: code
version: 1
level: 3
tags: [move-semantics, special-members]
input: chips
choices:
  c1: ["= default", "= delete", "{}", "noexcept(false) = default"]
compile:
  harness: |
    static_assert(std::is_move_constructible_v<Buffer>);
    static_assert(!std::is_copy_constructible_v<Buffer>);
    static_assert(std::is_nothrow_move_constructible_v<Buffer>);
    int main() {}
requires:
  - cpp-essentials/move-semantics-implicit-move-suppressed
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor#Implicitly-declared_move_constructor
  - https://en.cppreference.com/w/cpp/types/is_move_constructible
---

Without its second constructor, this `Buffer` fails
`static_assert(std::is_move_constructible_v<Buffer>)`. Complete that
declaration so the assertion passes, `Buffer` stays non-copyable and its
move is non-throwing.

```cpp
#include <type_traits>
struct Buffer {
    Buffer() = default;
    Buffer(Buffer&&) {{c1::= default}};
    ~Buffer() {}
};
```

---

The user-declared `~Buffer()` means no move constructor is implicitly
declared, so the assertion fails and every attempted move would fall
back to copying (or fail, once copying is unavailable). `= default` asks
for the member-wise move the compiler would otherwise have generated,
and it is `noexcept` because the (absent) members are. `= delete`
declares a move that cannot be called; `{}` is a user-provided move that
moves nothing and is not `noexcept`; `noexcept(false) = default` is a
move but a throwing one. Declaring any move constructor also deletes the
implicit copy operations, which is why the second assertion holds.
