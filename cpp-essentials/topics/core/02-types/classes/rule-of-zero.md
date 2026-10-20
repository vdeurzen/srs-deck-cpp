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
    #include <type_traits>
    static_assert(!std::is_copy_constructible_v<Buffer>);
    static_assert(std::is_nothrow_move_constructible_v<Buffer>);
    static_assert(std::is_nothrow_move_assignable_v<Buffer>);
    static_assert(!std::is_trivially_destructible_v<Buffer>);
    int main() {}
requires:
  - smart-pointers-unique-ptr-ownership
  - move-semantics-const-member-copies
  - smart-shared-ptr-intro
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three#Rule_of_zero
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
elaborate: Say aloud which class in your own code declares a destructor, and which member type would let it declare none.
---

`Buffer` must be the sole owner of its heap array and stay movable, yet
it declares no destructor, copy or move operation. Choose the member type
(a smart pointer's `<int[]>` form calls `delete[]` and allows `p[i]`).

```cpp
#include <memory>
class Buffer {
    {{c1::std\::unique_ptr<int[]>}} data_;
    int size_ = 0;
};
```

---

**Rule of Zero**: put the ownership in a member that already manages it,
and the compiler-generated destructor, copy and move do the right thing.
`unique_ptr` is move-only, so `Buffer` is too, and its destructor frees
the array. A raw `int*` frees nothing and copies shallowly (double free
once you add a destructor); `shared_ptr` makes copies share the array; a
`const` member cannot be moved from, so the move assignment is deleted.
