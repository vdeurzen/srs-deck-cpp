---
id: search-on-answer-code
kind: code
version: 1
level: 3
tags: [binary-search, search-on-answer]
input: chips
choices:
  c1: ["hi = mid", "hi = mid - 1", "lo = mid", "hi = mid + 1"]
compile:
  harness: |
    constexpr int W[] = {3, 2, 2, 4, 1, 4};   // ship in order within 3 days
    constexpr bool fits(int cap) {
      int days = 1, load = 0;
      for (int w : W) {
        if (load + w > cap) { ++days; load = 0; }
        load += w;
      }
      return days <= 3;
    }
    static_assert(min_capacity(4, 16) == 6);   // heaviest 4, total 16
    static_assert(min_capacity(5, 7) == 6);
    static_assert(min_capacity(6, 9) == 6);    // answer at lo
    static_assert(min_capacity(4, 6) == 6);    // answer at hi
    int main() {}
requires:
  - search-on-answer-monotone
  - cpp-essentials/constexpr-fn-static-assert
elaborate: "Say aloud, as to an interviewer, why the search may start at the heaviest package and end at the total weight."
refs:
  - https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
---

Find the smallest shipping capacity that `fits` (false … false,
true … true as it grows). It starts with `lo` = the heaviest package and
`hi` = the total weight, so the answer is in `[lo, hi]`. Complete the
shrink step for a capacity that fits.

```cpp
constexpr bool fits(int cap);   // true when every package ships in time

constexpr int min_capacity(int lo, int hi) {
  while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (fits(mid)) {{c1::hi = mid}};
    else lo = mid + 1;
  }
  return lo;
}
```

---

**`mid` fits, so it may be the answer: keep it as the new `hi`.**
The answer stays in `[lo, hi]`, and the range shrinks every round
because `mid < hi`.

`hi = mid - 1` drops `mid` when it is the answer; `lo = mid` moves the
wrong way; `hi = mid + 1` can stall the loop.
