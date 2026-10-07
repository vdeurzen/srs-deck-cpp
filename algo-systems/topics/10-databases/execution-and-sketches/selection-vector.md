---
id: db-selection-vector
kind: code
version: 1
level: 4
tags: [databases, execution, branchless]
input: chips
choices:
  c1: ["r.n += v[i] < c", "++r.n", "r.n = v[i] < c", "r.n += v[i] >= c"]
compile:
  harness: |
    constexpr std::array<int, 8> v{5, 1, 9, 2, 7, 3, 8, 0};
    constexpr auto r = select_lt(v, 4);
    static_assert(r.n == 4);
    static_assert(r.sel[0] == 1 && r.sel[1] == 3 && r.sel[2] == 5 && r.sel[3] == 7);
    int main() {}
requires:
  - db-vectorised-batch
  - foundations-branchless-when
refs:
  - https://www.cidrdb.org/cidr2005/papers/P19.pdf
  - https://duckdb.org/docs/stable/internals/vector
---

A vectorised filter `v < c` emits a selection vector: the indices of
qualifying rows, for the next primitive to read. Complete it without a
branch on the data.

```cpp
#include <array>
struct Sel { std::array<int, 8> sel{}; int n = 0; };
constexpr Sel select_lt(const std::array<int, 8>& v, int c) {
  Sel r;
  for (int i = 0; i < 8; ++i) { r.sel[r.n] = i; {{c1::r.n += v[i] < c}}; }
  return r;
}
```

---

**Always write the index; advance the cursor by the comparison's 0 or 1.**
A rejected row's index is overwritten by the next one. The loop has no
data-dependent branch, so a 50 % selectivity costs no mispredictions.
Writing `++r.n` keeps every row; assigning the comparison keeps at most
one.
