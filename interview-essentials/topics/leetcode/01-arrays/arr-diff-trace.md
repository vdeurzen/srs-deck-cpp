---
id: arr-diff-trace
kind: trace
version: 1
level: 3
tags: [difference-array, prefix-sums, tracing, lc-370]
probes:
  1: { "d[1]": "3", "d[2]": "-7" }
  2: { "d[1]": "7" }
requires:
  - arr-diff-worked
  - arr-diff-signal
  - cpp-essentials/vector-sized-constructor
refs:
  - https://leetcode.com/problems/range-addition/
  - https://cp-algorithms.com/data_structures/fenwick.html#2-range-update-and-point-query
elaborate: Both updates here end at the last index. Say aloud what would go wrong without the spare cell, and what an interviewer might ask you to do instead.
---

Range updates on `n = 2` zeros: init, mark each update `[l, r, v]`,
then integrate with one running sum.

```cpp
std::vector<int> d(3);   // n = 2 cells, plus one spare

void mark(int l, int r, int v) {
  d[l] += v;
  d[r + 1] -= v;
}

int main() {
  mark(0, 1, 4);
  mark(1, 1, 3);   // @1
  d[1] += d[0];    // @2  integrate: the running sum over 2 cells
}
```

---

Both updates stop after index 1, so both cancellations land in the spare
cell: `d[2]` is −4 − 3 = −7, and it is never read. `d[1]` holds only the
second update's start, 3, until the running sum adds `d[0]`: **7, the 4
from the first update plus the 3 from the second.** The answer is
`{4, 7}`.

Values from running it under GCC 16.2.
