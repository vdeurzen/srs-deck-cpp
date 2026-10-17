---
id: iter-growth-invalidates
kind: code
version: 1
level: 2
tags: [containers, vector, iterators, lifetime]
input: chips
choices:
  c1: ["v[1]", "*it", "it[0]", "v.back()"]
compile:
  harness: |
    static_assert(remembered() == 6);
    int main() {}
requires:
  - iter-size-vs-capacity
  - iter-reserve-keeps-buffer
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://en.cppreference.com/w/cpp/container#Iterator_invalidation
---

After the loop, return the value `it` referred to when it was created.

```cpp
#include <vector>
constexpr int remembered() {
    std::vector<int> v{5, 6, 7};
    auto it = v.begin() + 1;
    for (int i = 0; i < 20; ++i)
        v.push_back(i);
    return {{c1::v[1]}};
}
```

---

Twenty `push_back`s outgrow the original capacity, so the vector allocates
a new buffer, moves the elements into it and frees the old one. **Every
iterator, pointer and reference into the old buffer now dangles**: `*it`
and `it[0]` read freed memory (undefined behaviour; a compile error in a
constant expression). An index survives growth because it is re-applied
to the current buffer.
