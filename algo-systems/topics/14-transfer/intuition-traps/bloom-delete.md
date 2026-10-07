---
id: trap-bloom-delete
kind: basic
version: 1
level: 3
tags: [transfer, misconception, sketches, probabilistic]
elaborate: A counting Bloom filter swaps each bit for a small counter. What does that cost per position, and what must happen when a counter saturates?
requires:
  - trap-bloom-false-negative
refs:
  - https://doi.org/10.1145/362686.362692
  - https://en.wikipedia.org/wiki/Bloom_filter#Counting_Bloom_filters
---

## To support deletes, someone adds `remove(x)`, which clears every bit `x` hashes to. What can `hit` be now?

```cpp
f.insert(a);
f.insert(b);
f.remove(a);
bool hit = f.may_contain(b);
```

---

**`false` becomes possible: if `a` and `b` share a bit, clearing it hides `b`.**

Bits are shared between keys, so clearing one key's bits can erase
another's. That is a false negative, the one error the filter promised
never to make. Deletable variants keep more per position: a counting
Bloom filter (a counter, not a bit) or a cuckoo filter.
