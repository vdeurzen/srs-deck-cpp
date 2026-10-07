---
id: complexity-average-needs-distribution
kind: basic
version: 1
level: 2
tags: [complexity, best-worst-average]
requires:
  - complexity-best-worst-linear-search
refs:
  - https://en.wikipedia.org/wiki/Average-case_complexity
  - https://en.wikipedia.org/wiki/Linear_search
---

## Linear search over n keys "averages (n + 1)/2 comparisons". What assumption hides in "average"?

---

**A distribution: the key is present, equally likely at each position.**
Then the cost is (1 + 2 + … + n)/n = (n + 1)/2. If most lookups miss,
the average is close to n. An average-case bound is only as good as its
assumed inputs.
