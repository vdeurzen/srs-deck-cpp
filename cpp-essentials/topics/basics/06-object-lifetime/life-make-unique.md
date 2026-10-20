---
id: life-make-unique
kind: code
version: 1
level: 1
tags: [lifetime, ownership]
requires:
  - life-unique-ptr-frees
  - ptr-arrow-member
  - constexpr-fn-static-assert
elaborate: Find a raw `new` in code you know; what would change if it became `std::make_unique`?
input: chips
choices:
  c1:
    - "std::make_unique<Point>(2, 5)"
    - "std::make_unique<Point*>(2, 5)"
    - "std::unique_ptr<Point>(2, 5)"
    - "new Point{2, 5}"
compile:
  harness: |
    // A constant expression may not leak an allocation.
    static_assert(sum() == 7);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr/make_unique
---

Complete the initialiser so that `p` owns a heap-allocated `Point`
holding 2 and 5, and the `Point` is freed when `sum` returns.

```cpp
#include <memory>
struct Point { int x, y; };
constexpr int sum() {
  auto p = {{c1::std\::make_unique<Point>(2, 5)}};
  return p->x + p->y;
}
```

---

**`std::make_unique<Point>(2, 5)`** allocates the `Point` and returns a
`std::unique_ptr<Point>` already owning it. The bug it prevents is the
**leak**: with a raw `new`, the pointer exists unowned until you wrap
it, and `auto p = new Point{2, 5};` never wraps it at all, so nothing
frees it. The template argument is `Point`, not `Point*`, and a
`unique_ptr` is built from a pointer, not from values.
