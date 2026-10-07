---
id: db-roaring-array-threshold
kind: code
version: 1
level: 4
tags: [databases, bitsets, indexing]
input: chips
choices:
  c1: ["4096", "8192", "65536", "2048"]
compile:
  harness: |
    static_assert(choose(1) == Container::array);
    static_assert(choose(4'096) == Container::array);
    static_assert(choose(4'097) == Container::bitmap);
    int main() {}
requires:
  - db-roaring-bitmaps
refs:
  - https://github.com/RoaringBitmap/RoaringFormatSpec
  - https://arxiv.org/abs/1603.06549
---

A Roaring chunk covers 2¹⁶ ids. An array container stores the present
ids as sorted `uint16_t`; a bitmap container is one bit per possible id.
Roaring picks the smaller, the array on a tie. Complete the threshold.

```cpp
enum class Container { array, bitmap };
constexpr Container choose(int cardinality) {
  return cardinality <= {{c1::4096}} ? Container::array : Container::bitmap;
}
```

---

**4096 values × 2 bytes = 8 KiB, exactly the bitmap's 2¹⁶ bits.** Below
that the array is smaller; above it the bitmap's fixed 8 KiB wins. 8192
compares bytes with values, and 65536 is the chunk's capacity, not a
break-even point.
