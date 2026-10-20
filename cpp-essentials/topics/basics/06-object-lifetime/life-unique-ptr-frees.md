---
id: life-unique-ptr-frees
kind: code
version: 1
level: 1
tags: [lifetime, ownership]
requires:
  - smart-unique-ptr-intro
  - life-unique-ptr-owns-trace
  - types-auto-deduces
  - constexpr-fn-static-assert
elaborate: Say why a function holding its heap object in a `std::unique_ptr` needs no cleanup code on its early returns.
input: chips
choices:
  c1:
    - "std::unique_ptr<int>"
    - "std::unique_ptr<int*>"
    - "int*"
    - "auto"
compile:
  harness: |
    // A constant expression may not leak an allocation.
    static_assert(scaled(3, false) == 6);
    static_assert(scaled(3, true) == -1);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
  - https://eel.is/c++draft/unique.ptr
---

Complete the declaration of `p` so that the `int` made by `new` is freed
on both paths out of `scaled`. The function contains no `delete`.

```cpp
#include <memory>
constexpr int scaled(int x, bool bail) {
  {{c1::std\::unique_ptr<int>}} p{new int{x}};
  if (bail) return -1;
  return *p * 2;
}
```

---

**`std::unique_ptr<int>`** is a local object that *owns* the `int`: its
destructor runs `delete` when `p` goes out of scope, by either `return`.
The template argument is the pointed-to type, so `unique_ptr<int*>`
does not accept an `int*`. `int*` and `auto` (which deduces `int*`)
own nothing, so the early return leaks the `int`.
