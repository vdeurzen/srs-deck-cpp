---
id: iter-map-find-or-default
kind: code
version: 2
level: 2
tags: [containers, maps, iterators]
input: chips
choices:
  c1:
    - "auto it = prices.find(item); if (it == prices.end()) return -1; return it->second;"
    - "return prices[item];"
    - "if (!prices.contains(item)) return -1; return prices[item];"
    - "auto it = prices.find(item); if (it == prices.end()) return -1; return it.second;"
compile:
  harness: |
    int main() {}
requires:
  - iter-map-subscript-inserts
  - ptr-arrow-member
  - const-ref-names-caller
elaborate: Say which lookup you would write if the function also had to add a missing item to the map, and why that one could not take the map by `const` reference.
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/find
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
---

Return the price stored for `item`, or `-1` if it is not listed. The map is
borrowed read-only. `prices.contains(k)` returns whether `k` is a key.

```cpp
#include <unordered_map>
int price_of(const std::unordered_map<int, int>& prices, int item) {
    {{c1::auto it = prices.find(item); if (it == prices.end()) return -1; return it->second;}}
}
```

---

**On a `const` map, look up with `find` and compare with `end()`.**
`prices[item]` may insert a missing key, so a `const` map has no `[]`:
both answers using it fail to compile, even after `contains`. `it` is an
iterator to the key/value pair, so the value is `it->second`.
