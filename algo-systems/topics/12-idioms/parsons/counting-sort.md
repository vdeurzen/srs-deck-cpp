---
id: parsons-counting-sort
kind: parsons
version: 1
level: 4
tags: [sorting, radix, databases]
distractors:
  - "std::sort(out.begin(), out.end());"
  - "count[k] = total + c;"
compile:
  harness: |
    constexpr std::array<int, 8> kIn{3, 1, 4, 1, 5, 9, 2, 6};
    static_assert(counting_sort(kIn) ==
                  std::array<int, 8>{1, 1, 2, 3, 4, 5, 6, 9});
    constexpr std::array<int, 8> kSame{7, 7, 7, 7, 7, 7, 7, 7};
    static_assert(counting_sort(kSame) == kSame);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Counting_sort
  - https://en.wikipedia.org/wiki/Radix_sort
---

```cpp
#include <array>
#include <cstddef>
constexpr std::array<int, 8> counting_sort(const std::array<int, 8>& in) {
  std::array<std::size_t, 10> count{};
  for (const int v : in) ++count[static_cast<std::size_t>(v)];
  std::size_t total = 0;
  for (std::size_t k = 0; k < count.size(); ++k) {
    const std::size_t c = count[k];
    count[k] = total;
    total += c;
  }
  std::array<int, 8> out{};
  for (const int v : in) out[count[static_cast<std::size_t>(v)]++] = v;
  return out;
}
```

---

One pass of a radix sort, and the three phases every version has:
**histogram**, **exclusive prefix sum**, **scatter**. Each phase must
complete before the next begins — the prefix sum needs the whole
histogram, and the scatter needs the whole prefix sum — which is why
the order here is not a style choice.

The exclusive prefix sum is the subtle part, and the first distractor
(`count[k] = total + c`, an *inclusive* sum) is the classic
off-by-one: after it, `count[k]` points one past the last slot for key
`k` rather than at the first, and the scatter writes every group one
position too far right, corrupting the neighbouring group.

**Stability** comes from scanning the input forward while
post-incrementing the offsets: equal keys are written left to right in
input order. Reverse either and the sort is still correct but no longer
stable — and stability is exactly what LSD radix sort's correctness
depends on, since each digit pass must preserve the order established
by the previous ones.

The cost model: O(n + K) time and O(K) extra space for a key range of
K, so it beats comparison sorting when K is small relative to n — 8-bit
digits (K = 256) is the sweet spot, which is why a 32-bit radix sort is
four of these passes rather than one pass with K = 2³².
