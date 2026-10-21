---
id: parsons-union-find
kind: parsons
version: 2
level: 4
tags: [union-find, amortised, compilers]
distractors:
  - "size[b] += size[a];"
  - "parent[a] = b;"
compile:
  harness: |
    #include <array>
    constexpr int find(const int* parent, int x) {
      while (parent[x] != x) x = parent[x];
      return x;
    }
    struct Sets { std::array<int, 8> parent{0, 1, 2, 3, 4, 5, 6, 7}, size{1, 1, 1, 1, 1, 1, 1, 1}; };
    constexpr Sets built() {
      Sets s;
      unite(s.parent.data(), s.size.data(), 0, 1);
      unite(s.parent.data(), s.size.data(), 2, 3);
      unite(s.parent.data(), s.size.data(), 0, 2);
      return s;
    }
    static_assert(find(built().parent.data(), 1) == find(built().parent.data(), 3));
    static_assert(find(built().parent.data(), 1) != find(built().parent.data(), 4));
    static_assert(built().size[find(built().parent.data(), 3)] == 4);
    static_assert(built().size[1] == 1);   // an absorbed root's count is left alone
    int main() {}
requires:
  - graph-union-find
refs:
  - https://dl.acm.org/doi/10.1145/321879.321884
  - https://en.wikipedia.org/wiki/Disjoint-set_data_structure
---

Union by size over `parent` and `size` arrays; `find` returns the root
of `x`'s tree. *Find both roots*, *stop if equal*, *orient small under
large*, *link*, *update the size*: order the lines.

```cpp
constexpr int find(const int* parent, int x);
constexpr void unite(int* parent, int* size, int a, int b) {
  a = find(parent, a); b = find(parent, b);
  if (a == b) return;
  if (size[a] < size[b]) { const int t = a; a = b; b = t; }
  parent[b] = a;
  size[a] += size[b];
}
```

---

**Union by size: roots, stop if equal, orient, link, update the size.**
Uniting the arguments rather than their roots builds chains and loses
the existing sets; comparing non-roots' sizes orients on meaningless
counts. `size[b] += size[a]` leaves the new root's count stale;
`parent[a] = b` hangs the larger tree under the smaller. Union by size
alone bounds the depth at O(log n).
