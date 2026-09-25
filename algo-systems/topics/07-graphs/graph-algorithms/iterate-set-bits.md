---
id: graph-iterate-set-bits
kind: code
version: 1
level: 4
tags: [bitsets, bit-tricks, compilers, graphs]
input: chips
choices:
  c1: ["word - 1", "word + 1", "~word", "word >> 1"]
compile:
  harness: |
    static_assert(sum_of_indices(0) == 0);
    static_assert(sum_of_indices(0b1011) == 0 + 1 + 3);
    static_assert(sum_of_indices(0b1000'0000) == 7);
    static_assert(sum_of_indices(~0ULL) == 64 * 63 / 2);
    static_assert(sum_of_indices(1ULL << 63) == 63);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/numeric/countr_zero
  - https://graphics.stanford.edu/~seander/bithacks.html
---

Walking the members of a bit set, one instruction per member.
Complete the step that clears the bit just visited.

```cpp
#include <bit>
#include <cstdint>

constexpr int sum_of_indices(std::uint64_t word) {
  int total = 0;
  while (word) {
    total += std::countr_zero(word);
    word &= {{c1::word - 1}};
  }
  return total;
}
```

---

`x & (x − 1)` clears the **lowest set bit**: subtracting one flips
that bit to 0 and every bit below it to 1, so the AND keeps everything
above and discards the rest. Paired with `std::countr_zero` (which is
`tzcnt`/`bsf`), the loop runs exactly **once per set bit** rather than
once per bit position — the difference between 3 iterations and 64 for
a sparse word, and between a data-dependent branch per position and
none at all.

Its siblings are worth learning together: `x & -x` *isolates* the
lowest set bit (the Fenwick tree's step), `x | (x + 1)` sets the
lowest zero, `std::popcount` counts members without iterating, and
`std::has_single_bit` tests for a power of two.

This loop is the inner shape of every bit-vector algorithm in a
compiler and a query engine: iterating the live variables of a block,
the successors in a dense adjacency row, the qualifying rows of a
selection bitmap, or the candidate slots in a Swiss table's match
mask. For a multi-word set, wrap it in a loop over words and add
`64 * w` to each index — which is exactly why the bit-set chunk Card
carries a `base` offset.

Note the type discipline: shifts and complements belong on
**unsigned** types, where overflow and the sign bit are defined.
`1 << 63` on a signed `int` is undefined behaviour; `1ULL << 63` is
what you meant.
