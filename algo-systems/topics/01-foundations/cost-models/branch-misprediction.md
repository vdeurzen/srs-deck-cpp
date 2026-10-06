---
id: foundations-branch-misprediction
kind: basic
version: 1
level: 3
requires:
  - foundations-latency-scale
tags: [cost-model, branchless, low-latency]
refs:
  - https://en.algorithmica.org/hpc/pipelining/branching/
  - https://www.agner.org/optimize/
---

## Why can the *same* loop over the *same* data run several times faster after the data is sorted, and when is going branchless the answer?

---

Because a deeply pipelined core does not wait to learn which way a branch
goes — it predicts, speculatively executes tens of instructions down that
path, and on a wrong guess throws the pipeline away and restarts, ~15–20
cycles later. A predictor is very good at patterns (always taken,
alternating, short repeating sequences) and helpless against a
data-dependent branch on unpredictable values. `if (v[i] >= 128)` over
random bytes mispredicts about half the time; over *sorted* bytes it is
one long run of not-taken followed by one long run of taken, and the
predictor is right ~100 % of the time. Same instructions, same cache
behaviour, several times the throughput.

**Branchless converts control dependency into data dependency.** A
conditional move, an arithmetic mask (`sum += v[i] & -(v[i] >= 128)`) or
a predicated SIMD blend always executes both sides and selects, paying a
fixed small cost instead of a probabilistic large one. The rule of thumb:

- Unpredictable branch, both sides cheap → go branchless. Binary search,
  partitioning, filtering, comparator-heavy sorting of random data.
- Predictable branch (error paths, loop back-edges, a rare slow path) →
  leave it. The predictor makes it nearly free and branchless would pay
  the cost every iteration.
- Expensive side effects on one side → you cannot go branchless anyway
  without doing work you wanted to skip.

The second-order effect matters as much: a branchless loop has no
serialising control dependency, so the out-of-order engine can keep many
iterations in flight and overlap their cache misses — which is why
branchless binary search plus prefetching beats the textbook version on
large arrays even when the comparisons are identical.
