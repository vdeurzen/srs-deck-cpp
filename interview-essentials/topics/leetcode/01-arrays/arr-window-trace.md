---
id: arr-window-trace
kind: trace
version: 1
level: 3
tags: [sliding-window, tracing, lc-76]
probes:
  1: { missing: "1", lo: "0" }
  2: { lo: "2", best: "4" }
  3: { lo: "4", best: "3", from: "3" }
requires:
  - arr-window-variable-chunk
refs:
  - https://leetcode.com/problems/minimum-window-substring/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (aggregate analysis)
elaborate: LC 3 records `best` after the `while`. Swap the two placements between LC 3 and LC 76; what does each then return?
---

LC 76 (Minimum Window Substring) on `s = "bbaacb"`, `t = "abc"`.
`need[x]` is how many more `x` the window still lacks (negative:
spares); `missing` counts letters whose `need` is still above 0.

```cpp
std::string s = "bbaacb";             // t = "abc"
int need[26]{1, 1, 1}, missing = 3;   // still needed: one a, one b, one c
int lo = 0, best = 7, from = 0;       // best = 7: nothing found yet

void extend(int hi) {
  if (need[s[hi] - 'a']-- > 0) --missing;
  while (missing == 0) {
    if (hi - lo + 1 < best) { best = hi - lo + 1; from = lo; }
    if (++need[s[lo++] - 'a'] > 0) ++missing;
  }
}

int main() {
  for (int hi = 0; hi < 4; ++hi) extend(hi);   // @1
  extend(4);                                    // @2
  extend(5);                                    // @3
}
```

---

`bbaa` supplies `a` and `b`, but the second `b` and `a` are spares, so
only `c` is missing and `lo` never moves. At 4, `bbaac` is valid and
recorded (5); dropping the spare `b` leaves `baac`, recorded (4);
dropping the next `b` breaks it. **Record inside the `while`, before
each shrink, while still valid**: the opposite of LC 3. At 5, `aacb`
ties and `acb` wins.

Values from compiling and running an instrumented copy under GCC 16.2
(`-std=c++23 -Wall -Wextra -fsanitize=address,undefined`, clean).
