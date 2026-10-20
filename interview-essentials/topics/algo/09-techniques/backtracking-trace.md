---
id: technique-backtracking-trace
kind: trace
version: 1
level: 3
tags: [backtracking, recursion, tracing]
probes:
  1: { n: "1", "used[0]": "true" }
requires:
  - technique-backtracking-worked
  - technique-backtracking-undo
  - stl-array-brace-zero
elaborate: Say aloud which line you would add to make `orders(0)` return 2, and how a test on one input could still have missed the bug.
refs:
  - https://doi.org/10.1145/321296.321300
  - https://en.wikipedia.org/wiki/Backtracking
---

`orders` should count the orderings of 2 items, but this version has
choose and explore and no un-choose. The probe reads both values after
`orders(0)` returns.

```cpp
bool used[2] = {};

int orders(int depth) {
  if (depth == 2) return 1;              // every item placed
  int count = 0;
  for (int i = 0; i < 2; ++i)
    if (!used[i]) {
      used[i] = true;                    // choose
      count += orders(depth + 1);        // explore
    }
  return count;
}

int main() {
  int n = orders(0);                     // @1
}
```

---

Depth 0 marks item 0, depth 1 marks item 1, and depth 2 counts one
ordering. Back at depth 0, item 1 is still marked, so the second
ordering (1 then 0) is never tried: **n = 1**, and both marks stay
`true` after the search.

(Values from running it under GCC 16.2.)
