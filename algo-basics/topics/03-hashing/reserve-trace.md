---
id: hashing-reserve-trace
kind: trace
version: 1
level: 3
tags: [hashing, load-factor, tracing]
requires:
  - hashing-grow-amortised
probes:
  1: { buckets: "128", rehashes: "4" }
  2: { buckets: "128", rehashes: "0" }
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/reserve
---

A model of a table with 8 buckets and maximum load factor 1.0 that
doubles before an insert would exceed it. `reserve(n)` sizes it for `n`
keys up front.

```cpp
int buckets = 8, rehashes = 0;

void insert(int size) {   // size = keys already stored
  if (size + 1 > buckets) { buckets *= 2; ++rehashes; }
}
void reserve(int n) { while (buckets < n) buckets *= 2; }   // before any key

int main() {
  for (int s = 0; s < 100; ++s) insert(s);   // @1
  buckets = 8; rehashes = 0;
  reserve(100);
  for (int s = 0; s < 100; ++s) insert(s);   // @2
}
```

---

Without `reserve`, the 9th, 17th, 33rd and 65th inserts each rehash
every key stored so far. **Reserving when n is known moves all that work
before the first insert**, so no single insert pays O(n): the fix for
latency spikes, not for throughput, which was already amortised O(1).

`std::unordered_map::reserve(n)` does this for real.

(Values from running it under GCC 16.2.)
