---
id: trap-bloom-false-negative
kind: basic
version: 1
level: 3
tags: [transfer, misconception, sketches, probabilistic]
elaborate: If you put a filter in front of an expensive lookup, what happens on a false positive — and would you ever notice it in production?
requires:
  - db-bloom-filter
refs:
  - https://doi.org/10.1145/362686.362692
  - https://en.wikipedia.org/wiki/Bloom_filter
---

## This Bloom filter is badly overfull. What values can `hit` take?

```cpp
BloomFilter f(1 << 20, /*hashes=*/7);     // no remove()
f.insert("order:42");
for (int i = 0; i < 5'000'000; ++i) f.insert(random_key());
bool hit = f.may_contain("order:42");
```

---

**Only `true`: inserted bits are never cleared, so there are no false negatives.**

"Approximate" sounds symmetric, but only "yes" can be wrong.
Overfilling pushes false positives towards 100 %, never a false
"no". That one-sidedness is why an LSM engine can skip an SSTable on
"no" with certainty.
