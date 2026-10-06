---
id: containers-erase-while-iterating
kind: chunk
version: 1
level: 3
tags: [containers, idioms, lifetime]
expose_ms: 9000
compile:
  harness: |
    int main() {
      std::map<int, int> m{{1, 0}, {2, 5}};
      drop_sold_out(m);
    }
requires:
  - containers-reference-invalidated-by-growth
refs:
  - https://en.cppreference.com/w/cpp/container/map/erase
  - https://en.cppreference.com/w/cpp/container/map/erase_if
---

```cpp
#include <map>
void drop_sold_out(std::map<int, int>& stock) {
  for (auto it = stock.begin(); it != stock.end();) {
    if (it->second == 0) it = stock.erase(it);
    else ++it;
  }
}
```

---

Erase while iterating. `erase(it)` invalidates `it` itself, so `++it` after
it would be undefined behaviour; `erase` returns the iterator to the next
element instead, and the loop header has no increment because each branch
advances exactly once. The same shape works for every standard container.
When the body does nothing but test and erase, C++20's
`std::erase_if(stock, pred)` says it in one call.
