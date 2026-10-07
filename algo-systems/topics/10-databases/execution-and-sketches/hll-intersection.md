---
id: db-hll-intersection
kind: basic
version: 1
level: 5
tags: [databases, sketches, probabilistic, misconception]
requires:
  - db-hll-merge
  - db-hll-size-error
refs:
  - https://datasketches.apache.org/docs/Theta/ThetaSketchFramework.html
  - http://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf
elaborate: Which number on one of your dashboards is a difference of two approximate counts?
---

## HyperLogLog estimates |A| = |B| = 10 M and |A ∪ B| = 19.99 M, each within 0.81 %. Is |A ∩ B| ≈ 10 000 a usable answer?

```
|A ∩ B| = |A| + |B| − |A ∪ B| = 10 M + 10 M − 19.99 M
```

---

**No: each input is uncertain by ~±80 000, far more than 10 000.**

Subtracting nearly equal noisy numbers keeps their absolute errors and
shrinks the result. It is tempting because each sketch alone is
accurate. For intersections use a sketch built for them: MinHash or
theta sketches.
