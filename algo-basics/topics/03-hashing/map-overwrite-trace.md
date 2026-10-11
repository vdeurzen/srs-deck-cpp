---
id: hashing-map-overwrite-trace
kind: trace
version: 1
level: 1
tags: [foundations, maps, tracing]
probes:
  1: { "m.size()": "2", 'm.at("ann")': "8" }
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
---

A map stores one value under each key.

```cpp
#include <string>
#include <unordered_map>

int main() {
  std::unordered_map<std::string, int> m;
  m["ann"] = 3; m["bob"] = 1; m["ann"] = 8;   // @1
}
```

---

**Assigning to a key that is already present replaces its value**; it
does not add a second entry. A map is a set of keys with one value
attached to each.

(Values from running it under GCC 16.2.)
