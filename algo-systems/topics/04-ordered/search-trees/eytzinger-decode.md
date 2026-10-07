---
id: ordered-eytzinger-decode
kind: code
version: 1
level: 5
requires:
  - ordered-eytzinger-step
  - foundations-bits-lowest-set-bit
tags: [binary-search, bit-tricks, layout]
input: chips
choices:
  c1:
    - "k >> (std::countr_zero(~k) + 1)"
    - "k >> std::countr_zero(~k)"
    - "k >> 1"
    - "k >> (std::countr_zero(k) + 1)"
compile:
  harness: |
    static_assert(kTree[answer(descend(2))] == 2);
    static_assert(kTree[answer(descend(4))] == 4);
    static_assert(kTree[answer(descend(5))] == 5);
    static_assert(kTree[answer(descend(6))] == 6);
    static_assert(kTree[answer(descend(8))] == 8);
    static_assert(answer(descend(9)) == 0);        // above every key
    int main() {}
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
  - https://en.cppreference.com/w/cpp/numeric/countr_zero
---

`descend` runs off the bottom of the Eytzinger array, leaving `k` as a
path: each right turn appended a 1 bit, each left turn a 0. The
`lower_bound` is the node where the *last left turn* happened. Complete
`answer` to recover its index.

```cpp
#include <array>
#include <bit>
#include <cstddef>

inline constexpr std::array<int, 8> kTree{0, 5, 3, 7, 2, 4, 6, 8};

constexpr std::size_t descend(int key) {
  std::size_t k = 1;
  while (k < kTree.size()) k = 2 * k + (kTree[k] < key);
  return k;
}

constexpr std::size_t answer(std::size_t k) { return {{c1::k >> (std\::countr_zero(~k) + 1)}}; }
```

---

The trailing 1s are the right turns taken after the last left turn;
`countr_zero(~k)` counts them. Shifting those off leaves the 0 of the
left turn itself, so one more shift lands on the node where it was
taken. Shifting only the 1s off gives that node's left child; key 9 turns
right at every step, and the whole path shifts away to 0, the "no such
element" sentinel. This bit trick replaces ordinary binary search's
`lo`/`hi` bookkeeping.
