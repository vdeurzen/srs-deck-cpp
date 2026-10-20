---
id: arr-kadane-trace
kind: trace
version: 1
level: 3
tags: [kadane, dynamic-programming, tracing, lc-53]
probes:
  1: { cur: "-2", best: "3" }
  2: { cur: "2", best: "3" }
requires:
  - arr-kadane-worked
  - arr-max-subarray-signal
  - stl-int-limits
refs:
  - https://leetcode.com/problems/maximum-subarray/
  - https://en.wikipedia.org/wiki/Maximum_subarray_problem
elaborate: Say aloud which single input value would make `best` change at the last step, and why.
---

The largest sum of a non-empty contiguous run of `{3, -5, 2}`. Each
`step` extends or restarts `cur`, the best sum ending at `x`, then
records it in `best`.

```cpp
int cur = 0, best = INT_MIN;

void step(int x) {
  cur = std::max(x, cur + x);
  best = std::max(best, cur);
}

int main() {
  step(3);
  step(-5);   // @1
  step(2);    // @2
}
```

---

At `-5`, extending gives 3 − 5 = −2, better than restarting at −5, so
`cur` is −2 and `best` keeps 3. At `2`, extending gives 0, so **`cur`
restarts at 2: a negative run before `x` only lowers it.** `best` stays
3, the run `{3}`.

Values from running it under GCC 16.2.
