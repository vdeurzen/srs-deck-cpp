---
id: stdalgo-erase-if
kind: code
version: 1
level: 2
tags: [algorithms, containers]
input: chips
choices:
  c1: ["std::erase_if", "std::remove_if", "std::erase", "v.erase"]
compile:
  harness: |
    static_assert(without_zeros() == 2);
    int main() {}
requires:
  - stdalgo-remove-if-keeps-size
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

C++20's `std::erase_if(container, predicate)` takes the **container**, so
it can both compact the kept elements and shrink the size; it returns the
number removed. `std::remove_if` takes iterators and cannot shrink
anything. `std::erase(v, value)` compares with a value, not a predicate,
and the member `v.erase` takes iterators.
