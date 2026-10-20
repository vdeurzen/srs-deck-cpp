---
id: hashing-map-count-trace
kind: trace
version: 2
level: 1
tags: [hashing, maps, tracing]
probes:
  1: { a: "2", "count.size()": "2" }
  2: { z: "0", "count.size()": "3" }
requires:
  - hashing-map-set-purpose
elaborate: In code you have written, where did a read with `[]` add an entry you did not mean to add?
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/operator_at
---

Count word frequencies with a hash map.

```cpp
#include <string>
#include <unordered_map>

int main() {
  std::unordered_map<std::string, int> count;
  ++count["to"]; ++count["be"]; ++count["to"];
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
