---
id: containers-const-map-lookup
kind: code
version: 1
level: 2
tags: [containers]
input: chips
choices:
  c1: ["contains(item)", "operator[](item) != 0", "find(item)", "has(item)"]
compile:
  harness: |
    int main() {}
requires:
  - containers-map-subscript-inserts
refs:
  - https://en.cppreference.com/w/cpp/container/map/contains
  - https://en.cppreference.com/w/cpp/container/map/operator_at
---

Report whether `item` is a key of `stock`. The map is borrowed read-only.

```cpp
#include <map>
#include <string>
bool is_listed(const std::map<std::string, int>& stock,
               const std::string& item) {
    return stock.{{c1::contains(item)}};
}
```

---

`contains` (C++20) answers the question asked and nothing more. `operator[]`
would insert a missing key, so it does not exist on a `const` map: the
compiler refuses it here, which is the `const` doing its job. `find`
returns an iterator, not a `bool`; compare it with `stock.end()` if you
need the element too.
