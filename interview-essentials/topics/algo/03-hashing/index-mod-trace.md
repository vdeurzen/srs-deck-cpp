---
id: hashing-index-mod-trace
kind: trace
version: 2
level: 1
tags: [foundations, hash-functions, tracing]
probes:
  1: { a: "2", b: "1" }
  2: { d: "2" }
requires:
  - cpp-essentials/fn-declaration-vs-definition
elaborate: "Why do many tables avoid an m that shares factors with common keys? Say what happens to keys that are all multiples of m."
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §11.2–11.3
---

An array with one slot per possible key is far too big for, say,
64-bit keys. So a hash table keeps only `m` buckets: it turns key `k`
into a number `h(k)`, then uses bucket `h(k) % m`. Here the keys are
ints and `h(k) = k`.

```cpp
const int m = 8;
int bucket(int k) { return k % m; }

int main() {
  int a = bucket(42), b = bucket(17);   // @1
  int d = bucket(50);                   // @2
}
```

---

`% m` folds any hash value into 0 … m − 1, so a table of 8 buckets
accepts keys of any size. **Keys whose hashes differ by a multiple of m
share a bucket**: 50 and 42 differ by 8, so both go to bucket 2.

(Values from running it under GCC 16.2.)
