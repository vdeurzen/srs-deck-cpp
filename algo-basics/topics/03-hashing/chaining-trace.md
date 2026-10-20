---
id: hashing-chaining-trace
kind: trace
version: 2
level: 1
tags: [hashing, chaining, tracing]
requires:
  - interview-essentials/hashing-chaining
probes:
  1: { "bucket[2].size()": "2", "bucket[3].size()": "1" }
  2: { c: "2" }
elaborate: What would make every key in a real table land in one chain, and what would a lookup then cost?
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 11
---

A chained table with 5 buckets; a key's bucket is `key % 5`.
`compares(k)` counts the keys a lookup for `k` compares against.

```cpp
#include <vector>

std::vector<int> bucket[5];

void insert(int k) { bucket[k % 5].push_back(k); }
int compares(int k) {
  int c = 0;
  for (int x : bucket[k % 5]) { ++c; if (x == k) break; }
  return c;
}

int main() {
  insert(12); insert(7); insert(3);   // @1
  int c = compares(17);               // @2
}
```

---

`12 % 5` and `7 % 5` are both 2, so both keys land in bucket 2. Looking up the
absent 17 (also bucket 2) **compares against that bucket's whole
chain**: 2 comparisons, and never touches the 3 in bucket 3.

A lookup's cost is the length of one chain, not the size of the table.

(Values from running it under GCC 16.2.)
