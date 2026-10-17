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
- [ ] Precondition: `n ≥ 1`, otherwise `a[0]` does not exist; the caller must ensure it
- [ ] Invariant: at the top of each iteration `m` is the largest of `a[0..i)`
- [ ] Initialisation: with `i = 1` that slice is just `a[0]`, which is `m`
- [ ] Maintenance: comparing with `a[i]` and keeping the larger extends the claim to `a[0..i+1)`
- [ ] Termination: `n − i` falls by one each iteration, so the loop ends with `i == n`, where the invariant says `m` is the maximum of the whole array
