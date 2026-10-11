---
id: iter-loop-stop-at-end
kind: code
version: 1
level: 1
tags: [iterators]
input: chips
choices:
  c1: ["it != v.end()", "it <= v.end()", "it != v.end() - 1", "it < v.size()"]
compile:
  harness: |
    static_assert(total() == 12);
    int main() {}
requires:
  - iter-end-one-past
refs:
  - https://en.cppreference.com/w/cpp/container/vector/end
---

Complete the loop condition so every element of `v` is added, and nothing
beyond them is read.

```cpp
#include <vector>
constexpr int total() {
    std::vector<int> v{2, 4, 6};
    int sum = 0;
    for (auto it = v.begin(); {{c1::it != v.end()}}; ++it)
        sum += *it;
    return sum;
}
```

---

`end()` is one past the last element, so the loop runs while `it` has not
reached it. `<=` would also dereference `end()` (undefined behaviour, a
compile error in a constant expression); `end() - 1` skips the last
element; an iterator cannot be compared with the integer `size()`. `!=`
works for every container's iterators, which is why it is the idiom.
