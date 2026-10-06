---
id: ordered-eytzinger-step
kind: code
version: 1
level: 5
requires:
  - ordered-branchless-search
tags: [binary-search, branchless, memory-hierarchy, layout]
input: chips
choices:
  c1:
    - "2 * k + (kTree[k] < key)"
    - "2 * k + (kTree[k] > key)"
    - "2 * k + 1"
    - "k / 2 + (kTree[k] < key)"
compile:
  harness: |
    static_assert(descend(2) == 8);
    static_assert(descend(4) == 10);
    static_assert(descend(6) == 12);
    static_assert(descend(8) == 14);
    static_assert(descend(9) == 15);
    // Restoring the answer from the path: strip the trailing 1-bits.
    static_assert(kTree[descend(4) >> (std::countr_zero(~descend(4)) + 1)] == 4);
    int main() {}
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
  - https://en.cppreference.com/w/cpp/numeric/countr_zero
---

The Eytzinger layout stores the implicit binary search tree in
breadth-first order: the root at index 1, the children of `k` at `2k`
and `2k+1`. Complete the descent.

```cpp
#include <array>
#include <bit>
#include <cstddef>

// The sorted values 2..8 laid out breadth-first; index 0 is unused.
inline constexpr std::array<int, 8> kTree{0, 5, 3, 7, 2, 4, 6, 8};

constexpr std::size_t descend(int key) {
  std::size_t k = 1;
  while (k < kTree.size()) k = {{c1::2 * k + (kTree[k] < key)}};
  return k;
}
```

---

The comparison's result *is* the child selector: `false` is 0 (go
left), `true` is 1 (go right), so the whole step is a multiply, an add
and a compare — no branch, and `k` follows a path that is the same
shape as a classical binary search but through contiguous memory.

That is the point of the layout. A sorted array's binary search jumps
to n/2, n/4, 3n/4 — one cache line each, all far apart. Here the first
levels of the tree are the first few array entries, so the hot top of
the tree occupies a handful of lines that stay cached, and each step's
two possible next nodes are **adjacent**, so one prefetch covers both
(`__builtin_prefetch(&kTree[k * 2])` a few levels ahead is the usual
addition).

The loop runs off the end of the array on purpose. `k` ends as a path
encoding: every right turn appended a 1 bit, every left turn a 0. The
last *left* turn is the candidate answer, and
`k >> (countr_zero(~k) + 1)` strips the trailing run of 1s to recover
it — the line the harness checks. That trailing-bit trick is what
replaces the `lo`/`hi` bookkeeping of an ordinary binary search.

The costs are the ones every static layout has: building it is an
in-order walk writing into BFS positions, the array is no longer
sorted (so no range scans), and insertion means rebuilding. Use it for
a read-only table searched many times — and measure, because for
arrays that fit in L2 a plain branchless binary search is already
close.
