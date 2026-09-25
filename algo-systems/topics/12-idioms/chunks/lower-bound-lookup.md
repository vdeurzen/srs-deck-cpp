---
id: chunks-lower-bound-lookup
kind: chunk
version: 1
level: 2
tags: [idioms, binary-search, containers]
expose_ms: 5000
compile: null
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.cppreference.com/w/cpp/container/vector
---

```cpp
auto it = std::lower_bound(v.begin(), v.end(), key);
if (it != v.end() && *it == key) return &*it;
it = v.insert(it, key);
```

---

Find-or-insert in a sorted `vector` — the structure that quietly
outperforms `std::set` and `std::map` for small and medium `n`, because
the elements are contiguous and the binary search touches a handful of
cache lines instead of chasing a node per level.

The idiom is worth chunking as a unit because of the two easy mistakes:
`lower_bound` returns the **insertion point**, not a match, so the
`*it == key` check is required; and the iterator it returns is exactly
the position `insert` wants, so the search is not repeated.

The cost model to keep alongside it: lookup O(log n) with excellent
locality, insertion O(n) memmove — which is fast up to surprisingly
large arrays, and which is why "sorted vector" is the default answer
for a mostly-read, occasionally-built lookup table.

Graded by whitespace-normalised equality (SPEC §4.7): `v` and `key`
come from the surrounding function.
