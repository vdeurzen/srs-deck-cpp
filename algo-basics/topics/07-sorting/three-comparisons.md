---
id: sort-three-comparisons
kind: basic
version: 1
level: 1
tags: [sorting, lower-bound, puzzle]
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Comparison_sort#Number_of_comparisons_required_to_sort_a_list
---

## Can any algorithm sort every input `[a b c]` of distinct values using at most 2 comparisons of the form `x < y`?

---

**No: there are 3! = 6 possible orders, but 2 yes/no answers give only 4 outcomes.**

Two different inputs would end on the same outcome, and the algorithm
would rearrange them the same way, so one of them comes out wrong. 3
comparisons (8 outcomes) are enough, e.g. insertion sort.
