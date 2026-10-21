---
id: parsons-counting-sort
kind: parsons
version: 2
level: 4
tags: [sorting, radix, databases]
distractors:
  - "count[k] = total + c;"
compile:
  harness: |
    #include <array>
    constexpr std::array<int, 8> sorted(std::array<int, 8> in) {
      std::array<int, 10> count{};
      std::array<int, 8> out{};
      counting_sort(in.data(), 8, count.data(), out.data());
      return out;
    }
    static_assert(sorted({3, 1, 4, 1, 5, 9, 2, 6}) ==
                  std::array<int, 8>{1, 1, 2, 3, 4, 5, 6, 9});
    static_assert(sorted({7, 7, 7, 7, 7, 7, 7, 7}) ==
                  std::array<int, 8>{7, 7, 7, 7, 7, 7, 7, 7});
    int main() {}
requires:
  - sort-radix
refs:
  - https://en.wikipedia.org/wiki/Counting_sort
  - https://en.wikipedia.org/wiki/Radix_sort
---

Counting sort of `n` keys in 0..9 into `out`; `count` arrives as ten
zeros. *Histogram*, *exclusive prefix sum*, *scatter*: order the lines.

```cpp
constexpr void counting_sort(const int* in, int n, int* count, int* out) {
  for (int i = 0; i < n; ++i) ++count[in[i]];
  for (int k = 0, total = 0; k < 10; ++k) {
    const int c = count[k];
    count[k] = total;
    total += c;
  }
  for (int i = 0; i < n; ++i) out[count[in[i]]++] = in[i];
}
```

---

**Histogram, exclusive prefix sum, scatter**, each finished before the
next starts. After the prefix sum `count[k]` is the first slot for key
`k`. `count[k] = total + c` is the inclusive sum: every group lands one
slot too far right. A forward scan with post-increment keeps equal keys in input
order, which is the stability LSD radix sort relies on.
