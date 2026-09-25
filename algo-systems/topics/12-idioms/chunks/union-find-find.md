---
id: chunks-union-find-find
kind: chunk
version: 1
level: 3
tags: [idioms, union-find, compilers]
expose_ms: 5000
compile: null
refs:
  - https://dl.acm.org/doi/10.1145/321879.321884
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
---

```cpp
std::size_t find(std::size_t x) {
  while (parent[x] != x) {
    parent[x] = parent[parent[x]];   // path halving
    x = parent[x];
  }
  return x;
}
```

---

Union-find's `find` with path halving: no recursion, no second pass, one
extra store per two levels, and the same O(α(n)) amortised bound as full
path compression once it is paired with union by size or rank.

Recognising this four-line shape matters because it turns up far from
its textbook home — type unification in a compiler front end, register
coalescing, congruence closure in an e-graph, and connected components
in anything that merges sets.

Graded by whitespace-normalised equality (SPEC §4.7): `parent` is a
member of the enclosing structure, so the snippet is not a program on
its own.
