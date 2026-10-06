---
id: move-semantics-destructor-suppresses-move
kind: code
version: 1
level: 3
tags: [move-semantics, rule-of-five]
input: chips
choices:
  c1: ["= default", "= delete", "{}", "noexcept(false) = default"]
compile:
  harness: |
    static_assert(std::is_move_constructible_v<Buffer>);
    static_assert(!std::is_copy_constructible_v<Buffer>);
    static_assert(std::is_nothrow_move_constructible_v<Buffer>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three
  - https://en.cppreference.com/w/cpp/types/is_move_constructible
---

A user-declared destructor suppresses the implicitly-generated move
constructor. Explicitly bring it back.

```cpp
#include <type_traits>
struct Buffer {
    Buffer() = default;
    Buffer(Buffer&&) {{c1::= default}};
    Buffer& operator=(Buffer&&) = default;
    ~Buffer() {}
};
```

---

Because `~Buffer()` is user-declared, `Buffer` would otherwise have no
move constructor at all, and every place that tried to move a `Buffer`
would silently fall back to copying it (or fail to compile, if copying is
also unavailable). `= default` asks the compiler for the ordinary
member-wise move it would have generated anyway, now that declaring the
destructor took it away.
