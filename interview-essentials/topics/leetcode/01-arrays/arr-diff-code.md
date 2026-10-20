---
id: arr-diff-code
kind: code
version: 1
level: 2
tags: [difference-array, prefix-sums, lc-1109]
input: chips
choices:
  c1: ["e[1]", "e[1] - 1", "e[1] + 1", "n"]
compile:
  harness: |
    constexpr bool examples() {   // GCC 14 needs nested braced vectors inside a function
      return bookings({{1, 2, 10}, {2, 3, 20}, {2, 5, 25}}, 5)
                 == std::vector{10, 55, 45, 25, 25}                    // LC 1109, example 1
          && bookings({{1, 2, 10}, {2, 2, 15}}, 2) == std::vector{10, 25}
          && bookings({{3, 3, 7}}, 4) == std::vector{0, 0, 7, 0};
    }
    static_assert(examples());
    int main() {}
requires:
  - arr-diff-signal
  - cpp-essentials/vector-of-vectors
  - stl-const-auto-param
refs:
  - https://leetcode.com/problems/corporate-flight-bookings/
  - https://leetcode.com/problems/range-addition/
  - https://cp-algorithms.com/data_structures/fenwick.html#2-range-update-and-point-query
elaborate: Range Addition (LC 370) applies updates `[start, end, inc]` to a zero array of length `n`, indexed from 0. Which two indices change, and does `d` still need its spare cell?
---

Corporate Flight Bookings (LC 1109): return the seats booked on each
flight. Flights are numbered 1 to `n`, and booking `e = [first, last,
seats]` covers flights `first` through `last` inclusive. `d[k]` is the
change at flight `k + 1`; it has one spare cell at the end, and
`return {d.begin(), d.end() - 1}` builds a vector from all cells but
that one. Complete the index where the booking stops counting.

```cpp
#include <vector>
constexpr std::vector<int> bookings(const std::vector<std::vector<int>>& b, int n) {
  std::vector<int> d(n + 1);
  for (const auto& e : b) {
    d[e[0] - 1] += e[2];
    d[{{c1::e[1]}}] -= e[2];
  }
  for (int i = 1; i < n; ++i) d[i] += d[i - 1];
  return {d.begin(), d.end() - 1};
}
```

---

**`e[1]`: the 0-based index of flight `last + 1`, the first one outside the range.**
The spare cell takes it when `last == n`, so no bounds check is needed.

`e[1] - 1` cancels on `last` itself, so the last flight is never
counted. `e[1] + 1` cancels one flight too late, and runs off the end of
`d` when `last == n`. `n` cancels in the spare cell, so nothing is ever
cancelled: every booking runs to the last flight. Mixing 1-based input with 0-based storage is
where this pattern goes wrong.
