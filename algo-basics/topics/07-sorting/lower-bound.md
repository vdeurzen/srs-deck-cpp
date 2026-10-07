---
id: sort-lower-bound
kind: basic
version: 1
level: 2
tags: [sorting, complexity, lower-bound]
requires:
  - sort-merge-idea
  - sort-three-comparisons
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Comparison_sort#Number_of_comparisons_required_to_sort_a_list
---

## Why can no comparison sort guarantee fewer than about n log₂ n comparisons?

---

**It must tell n! input orders apart, and k yes/no answers distinguish at most 2ᵏ.**

So k ≥ log₂(n!) ≈ n log₂ n − 1.44 n. For n = 8: 40 320 orders
need k ≥ 16, since 2¹⁵ = 32 768. Merge sort and heap sort
meet the bound; only sorts that do not compare can beat it.
