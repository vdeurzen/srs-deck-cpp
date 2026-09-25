---
id: db-count-min-sketch
kind: basic
version: 1
level: 5
tags: [databases, sketches, probabilistic, streaming]
refs:
  - http://dimacs.rutgers.edu/~graham/pubs/papers/cm-full.pdf
  - https://en.wikipedia.org/wiki/Count%E2%80%93min_sketch
---

## How does a count-min sketch estimate frequencies, which direction does its error go, and how do you find the heavy hitters?

---

A `d × w` matrix of counters and `d` pairwise-independent hash
functions. To add an element, increment `C[i][h_i(x)]` for each row
`i`. To query, take the **minimum** over the `d` rows — every cell
containing `x` also contains everything else that collided there, so
each row's value is an overestimate, and the smallest one is the
tightest.

The error is therefore **one-sided: never an underestimate**, and with
`w = ⌈e/ε⌉` and `d = ⌈ln(1/δ)⌉` the estimate exceeds the truth by more
than `ε·N` (where N is the total count) with probability at most `δ`.
The two knobs are independent: width controls how big the error is,
depth controls how likely you are to exceed it.

Note what that error bound means in practice. It is relative to the
*total* stream, so a heavy hitter with 5 % of the traffic is estimated
accurately, while a rare key's estimate can be swamped by noise from
everything that collided with it. **The sketch is precise exactly
where you care and imprecise where you do not** — which is the whole
design.

**Heavy hitters** need one more piece: the sketch alone cannot
enumerate keys. Pair it with a bounded min-heap of the top k candidates
— on each update, query the sketch and push the key if its estimate
beats the heap's minimum. That combination ("count-min with heap") is
the standard top-k over a stream, and it is what powers trending
queries, per-tenant rate accounting, and hot-key detection in caches
and databases.

Like the other sketches, it is **mergeable**: adding two sketches with
the same dimensions and hash functions cell-wise gives the sketch of
the combined stream, so shards can be summed. And it supports
**deletions** (decrement) as long as counts stay non-negative — which
is where the related count-*sketch* (with ±1 signs and a median
estimator) takes over, giving two-sided but unbiased estimates and
handling negative updates.
