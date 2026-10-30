---
id: technique-explain-loop-correct
kind: explain
version: 1
level: 2
tags: [foundations, invariants, termination, capstone]
requires:
  - interview-essentials/technique-max-invariant-code
  - technique-termination-measure
  - technique-precondition-blame
elaborate: Pick a loop you wrote recently; what is its invariant, and which quantity falls on every iteration?
refs:
  - https://en.wikipedia.org/wiki/Loop_invariant
  - https://dl.acm.org/doi/10.1145/363235.363259
---
```cpp
int m = a[0];
for (int i = 1; i < n; ++i)
  if (a[i] > m) m = a[i];
return m;
```

A reviewer asks how you know this returns the largest element of `a`
for every input. Argue it without running it.
---
- [ ] It needs `n ≥ 1`, or `a[0]` does not exist; that precondition is the caller's to ensure
- [ ] The invariant: at the top of each iteration, `m` is the largest of `a[0..i)`
- [ ] It holds at the start: with `i = 1` that slice is just `a[0]`, which is `m`
- [ ] Each iteration keeps it: keeping the larger of `m` and `a[i]` covers `a[0..i+1)`
- [ ] `n − i` falls every iteration, so it ends at `i == n`, where `m` is the largest overall
