---
id: hashing-chaining-trace
kind: trace
version: 1
level: 1
tags: [hashing, chaining, tracing]
requires:
  - hashing-chaining
probes:
  1: { "bucket[2].size()": "2", "bucket[3].size()": "1" }
  2: { "bucket[2].size()": "4", "bucket[3].size()": "1" }
  3: { compares: "4" }
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 11
---

A chained table with 5 buckets; a key's bucket is `key % 5`.

```cpp
std::vector<int> bucket[5];
int compares = 0;

void insert(int k) { bucket[k % 5].push_back(k); }
bool find(int k) {
  for (int x : bucket[k % 5]) { ++compares; if (x == k) return true; }
  return false;
}

int main() {
  insert(12); insert(7); insert(3);   // @1
  insert(22); insert(17);             // @2
  find(27);                           // @3
}
```

---

12, 7, 22 and 17 all end in 2 or 7, so all land in bucket 2. Looking
up the absent 27 (also bucket 2) **compares against the whole chain**:
4 comparisons, while bucket 3's key costs 1.

A lookup's cost is the length of one chain, not the size of the table.

(Values from running it under GCC 16.2.)
