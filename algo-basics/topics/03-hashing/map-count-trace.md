---
id: hashing-map-count-trace
kind: trace
version: 1
level: 1
tags: [hashing, maps, tracing]
probes:
  1: { a: "2", "count.size()": "4" }
  2: { z: "0", "count.size()": "5" }
requires:
  - hashing-map-set-purpose
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
---

Count word frequencies with a hash map.

```cpp
std::unordered_map<std::string, int> count;

int main() {
  for (auto w : {"to", "be", "or", "not", "to", "be"}) ++count[w];
  int a = count["to"];    // @1
  int z = count["xyz"];   // @2
}
```

---

A map stores a value per key; a set stores only keys. `count[w]`
**inserts `w` with value 0 if it is missing**, then returns a reference,
so `++count[w]` counts in one O(1) average step.

The same rule bites on reads: looking up `"xyz"` with `[]` added it.
Use `find` or `contains` to ask without inserting.

(Values from running it under GCC 16.2.)
