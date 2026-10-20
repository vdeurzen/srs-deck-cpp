---
id: stdalgo-erase-if
kind: code
version: 1
level: 2
tags: [algorithms, containers]
input: chips
choices:
  c1: ["std::erase_if", "std::remove_if", "v.erase"]
compile:
  harness: |
    static_assert(without_zeros() == 2);
    int main() {}
elaborate: Say what you would write instead before C++20, and which mistake that older form invites.
requires:
  - stdalgo-remove-if-keeps-size
  - constexpr-fn-static-assert
  - types-size-t
refs:
  - https://en.cppreference.com/w/cpp/container/vector/erase2
---

Complete the call so no zeros remain in `v`.

```cpp
#include <vector>
constexpr std::size_t without_zeros() {
    std::vector<int> v{0, 4, 0, 7};
    {{c1::std\::erase_if}}(v, [](int x) { return x == 0; });
    return v.size();
}
```

---

C++20's `std::erase_if(container, test)` takes the **container**, so it
can both compact the kept elements and shrink the size; it returns the
number removed. `std::remove_if` takes iterators, so it cannot shrink anything;
the member `v.erase` takes positions, not a test.
