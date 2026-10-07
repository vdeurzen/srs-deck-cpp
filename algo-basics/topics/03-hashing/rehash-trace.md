---
id: hashing-rehash-trace
kind: trace
version: 1
level: 2
tags: [hashing, load-factor, tracing]
requires:
  - hashing-load-factor
probes:
  1: { x: "3", y: "3", z: "3" }
  2: { x: "3", y: "11", z: "3" }
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/rehash
---

A table grows from 8 to 16 buckets. `b(key)` is the bucket a key
belongs in.

```cpp
int m = 8;
int b(int key) { return key % m; }

int main() {
  int x = b(3), y = b(11), z = b(19);   // @1
  m = 16;                              // the table doubled
  x = b(3); y = b(11); z = b(19);      // @2
}
```

---

**A key's bucket depends on the bucket count**, so after growing, 11
belongs in bucket 11, not 3. The old bucket array cannot just be copied:
every key is rehashed into the new array, O(n) for that one insert.

Here the chain of three in bucket 3 split into two buckets: growing is
what keeps chains short.

(Values from running it under GCC 16.2.)
