---
id: containers-reference-invalidated-by-growth
kind: code
version: 1
level: 2
tags: [containers, lifetime]
input: chips
choices:
  c1: ["int", "int&", "const int&", "auto&"]
compile:
  harness: |
    static_assert(first_after_push() == 10);
    int main() {}
requires:
  - containers-default-to-vector
  - ptr-dangling
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://en.cppreference.com/w/cpp/container#Iterator_invalidation
---

`first` must still read `10` after `v` grows. Complete its declaration.

```cpp
#include <vector>
constexpr int first_after_push() {
    std::vector<int> v{10, 20, 30};
    {{c1::int}} first = v[0];
    v.reserve(v.capacity() + 1);   // must reallocate
    return first;
}
```

---

Growing past `capacity()` makes the `vector` allocate a new buffer, move the
elements over and free the old one: **every reference, pointer and iterator
into it now dangles**. A copy owns its own value. `push_back` does the same
whenever `size() == capacity()`; `reserve` beyond the capacity always does.
At run time the dangling read is silent undefined behaviour; in a constant
expression it is a compile error, which is how the harness catches it.
