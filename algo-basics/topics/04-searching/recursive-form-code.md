---
id: search-recursive-form-code
kind: code
version: 1
level: 2
tags: [foundations, binary-search, recursion]
requires:
  - interview-essentials/search-binary-search-chunk
  - interview-essentials/technique-recursion-sum-code
input: chips
choices:
  c1:
    - "find(a, key, lo, mid - 1)"
    - "find(a, key, lo, mid)"
    - "find(a, key, mid + 1, hi)"
    - "find(a, key, lo + 1, mid - 1)"
compile:
  harness: |
    inline constexpr int kA[] = {2, 5, 8, 12, 17};
    constexpr int f(int key) { return find(kA, key, 0, 4); }
    static_assert(f(2) == 0);
    static_assert(f(12) == 3);
    static_assert(f(17) == 4);
    static_assert(f(1) == -1);
    static_assert(f(9) == -1);
    static_assert(f(20) == -1);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
---

Each call searches the sorted slice `a[lo..hi]`, both ends included.
Complete the call made when the middle element is too big.

```cpp
#include <span>

constexpr int find(std::span<const int> a, int key, int lo, int hi) {
  if (lo > hi) return -1;
  int mid = lo + (hi - lo) / 2;
  if (a[mid] == key) return mid;
  if (a[mid] > key) return {{c1::find(a, key, lo, mid - 1)}};
  return find(a, key, mid + 1, hi);
}
```

---

**Recurse on the left part, without `mid`.** The loop's `hi = mid - 1`
becomes an argument; the loop condition becomes the base case
`lo > hi`. Keeping `mid` can repeat the same call forever once
`lo == hi`. Each call gets at most half the range, so at most
⌊log₂ n⌋ + 1 calls are ever pending.
