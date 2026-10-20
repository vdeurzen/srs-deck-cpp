---
id: iter-map-find-or-default
kind: code
version: 1
level: 2
tags: [containers, maps, iterators]
input: chips
choices:
  c1: ["find(item)", "count(item)", "at(item)", "contains(item)"]
compile:
  harness: |
    int main() {}
requires:
  - map-unordered-map-intro
  - ptr-arrow-member
  - const-ref-names-caller
elaborate: Say why `find` is the right lookup in a function that takes the map by `const` reference, where `[]` is not.
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/find
---

Return the price stored for `item`, or `-1` if it is not listed. The map is
borrowed read-only.

```cpp
#include <unordered_map>
int price_of(const std::unordered_map<int, int>& prices, int item) {
    auto it = prices.{{c1::find(item)}};
    if (it == prices.end()) return -1;
    return it->second;
}
```

---

`find` returns an iterator to the key/value pair, or `end()` when the key
is absent; it never changes the map. `it->first` is the key, `it->second`
the value. `count` returns how many entries have the key (0 or 1); `at` returns the value itself (and throws when absent); `contains`
returns a `bool`. None of them gives an iterator to compare with
`end()`.
