---
id: arr-window-trace
kind: trace
version: 3
level: 3
tags: [sliding-window, tracing, lc-76]
probes:
  1: { lo: "1", missing: "0" }
  2: { best: "2", missing: "1" }
requires:
  - arr-window-min-worked
  - cpp-essentials/string-basics
refs:
  - https://leetcode.com/problems/minimum-window-substring/
  - https://leetcode.com/problems/longest-substring-without-repeating-characters/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (aggregate analysis)
elaborate: Longest Substring Without Repeating Characters (LC 3) records `best` after the `while`. Swap the two placements between it and this problem; what does each then return?
---

Minimum Window Substring (LC 76): the shortest substring of `s` that
contains every letter of `t`, repeats included. Here `s = "aab"`,
`t = "ab"`. `need[x]` is how many more `x` the window still lacks
(negative: spares); `missing` counts letters whose `need` is above 0.
The window `s[0..2]` has just become valid, so the shrink loop calls
`step(2)` for as long as `missing == 0`: each call records, then
shrinks.

```cpp
std::string s = "aab";               // t = "ab"
int need[26]{-1, 0};                 // a: one spare; b: none lacking; rest 0
int missing = 0, lo = 0, best = 4;   // best = 4: nothing recorded yet

void step(int hi) {                  // one turn of the shrink loop
  if (hi - lo + 1 < best) best = hi - lo + 1;
  ++need[s[lo] - 'a'];
  if (need[s[lo] - 'a'] > 0) ++missing;
  ++lo;
}

int main() {
  step(2);   // @1
  step(2);   // @2
}
```

---

The first turn records `aab` (3) and drops the spare `a`: `need[a]`
rises only to 0, so `missing` stays 0 and the loop runs again. The
second turn records `ab` (2), then dropping the last `a` makes it
missing. **Record before each shrink, while the window is still
valid**: recording after the loop would see only the broken window.

Values from running it under GCC 16.2.
