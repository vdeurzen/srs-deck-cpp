---
id: class-rule-of-zero
kind: code
version: 1
level: 2
tags: [classes, rule-of-zero, ownership]
input: chips
choices:
  c1: ["std::unique_ptr<int[]>", "int*", "std::shared_ptr<int[]>", "const std::unique_ptr<int[]>"]
compile:
  harness: |
    static_assert(!std::is_copy_constructible_v<Buffer>);
    static_assert(std::is_nothrow_move_constructible_v<Buffer>);
    static_assert(std::is_nothrow_move_assignable_v<Buffer>);
    static_assert(!std::is_trivially_destructible_v<Buffer>);
    int main() {}
requires:
  - smart-pointers-unique-ptr-ownership
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three#Rule_of_zero
---

`Buffer` is the sole owner of its heap array. It declares **no** special
members, yet must free the array, refuse to be copied, and move cheaply.
Choose the member type.

```cpp
#include <cstddef>
#include <memory>
#include <type_traits>
class Buffer {
    {{c1::std\::unique_ptr<int[]>}} data_;
    std::size_t size_ = 0;
};
```

---

**Rule of Zero**: put the ownership in a member that already manages it,
and the compiler-generated destructor, copy and move do the right thing.
`unique_ptr` is move-only, so `Buffer` is too, and its destructor frees
the array. A raw `int*` frees nothing and copies shallowly (double free
once you add a destructor); `shared_ptr` makes copies share the array; a
`const` member cannot be moved from, so the move assignment is deleted.
