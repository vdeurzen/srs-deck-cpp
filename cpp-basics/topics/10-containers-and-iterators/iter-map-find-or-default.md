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
  - iter-map-subscript-inserts
  - iter-end-one-past
  - const-ref-parameter
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/find
---

Return the price stored for `item`, or `-1` if it is not listed. The map is
borrowed read-only.

```cpp
#include <string>
#include <unordered_map>
int price_of(const std::unordered_map<std::string, int>& prices,
             const std::string& item) {
    auto it = prices.{{c1::find(item)}};
    return it == prices.end() ? -1 : it->second;
}
```

---

`find` returns an iterator to the key/value pair, or `end()` when the key
is absent; it never changes the map. `it->first` is the key, `it->second`
the value. `count` returns how many entries have the key (0 or 1); `at` returns the value itself (and throws when absent); `contains`
returns a `bool`. None of them gives an iterator to compare with
`end()`.
