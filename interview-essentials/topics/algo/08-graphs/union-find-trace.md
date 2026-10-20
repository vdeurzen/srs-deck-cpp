---
id: graph-union-find-trace
kind: trace
version: 1
level: 2
tags: [union-find, graphs, tracing]
probes:
  1: { "parent[0]": "1", "parent[1]": "2" }
requires:
  - graph-union-find-worked
refs:
  - https://doi.org/10.1145/364099.364331
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
elaborate: Which call here would give a wrong answer if `unite` wrote `parent[b] = a` instead, and what would it report?
---

Union-find on 4 elements. `unite(a, b)` hangs b's root under a's
root. Probe @1 is read after the third call.

```cpp
int parent[4] = {0, 1, 2, 3};
int find(int x) {
  while (parent[x] != x) x = parent[x];
  return x;
}
void unite(int a, int b) { parent[find(b)] = find(a); }
int main() {
  unite(1, 0);
  unite(2, 3);
  unite(3, 1);   // @1
}
```

---

`unite(1, 0)` points 0 at 1, and `unite(2, 3)` points 3 at 2. In
`unite(3, 1)`, 1 is already a root and 3's root is 2, so the one write
is `parent[1] = 2`. `parent[0]` stays 1: 0 now reaches the root through
0 → 1 → 2.

(Values from running it under GCC 16.2.)
