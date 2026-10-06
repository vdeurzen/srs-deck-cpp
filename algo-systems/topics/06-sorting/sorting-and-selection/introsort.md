---
id: sort-introsort
kind: basic
version: 1
level: 3
tags: [sorting, complexity]
requires:
  - heap-vocabulary
refs:
  - https://en.cppreference.com/w/cpp/algorithm/sort
  - https://www.cs.rpi.edu/~musser/gp/introsort.ps
---

## `std::sort` is required to be O(n log n) worst case, but quicksort is O(n²). How is the guarantee met?

---

By **introsort**: quicksort as the main engine, with two escapes.

- **Depth limit.** Track the recursion depth; when it exceeds
  ~2·log₂ n, the partitioning is going badly (a deliberately adversarial
  input, or unlucky pivots), so switch that subrange to **heapsort**,
  which is O(n log n) worst case with no input that defeats it. This is
  what converts quicksort's O(n²) worst case into a guarantee, and it
  costs nothing on ordinary inputs because the limit is never reached.
- **Small-range cutoff.** Below ~16 elements, stop recursing and use
  **insertion sort** — either per range, or once over the whole
  nearly-sorted array at the end. Insertion sort on a short, in-cache
  range has almost no overhead, no recursion, and excellent branch
  behaviour, while quicksort's partitioning constant dominates at that
  size.

So the guarantee comes from heapsort, the average-case speed from
quicksort, and the constant factor from insertion sort — each algorithm
used exactly where it is best.

Two things the standard does *not* promise, and that follow from this
design: `std::sort` is **not stable** (use `std::stable_sort`, which is
merge-sort-based, O(n log n) with a buffer or O(n log² n) without), and
the comparator must be a **strict weak ordering**. Violating that —
`<=` instead of `<`, a comparator that is not transitive, NaNs in the
data — is undefined behaviour and in practice means reading past the end
of the array, because partitioning uses the comparator itself as the
loop's bound check. That is a genuine, exploitable crash, not a
hypothetical.

`pdqsort` (Go's default since 1.19; Rust's `sort_unstable` was pdqsort
until 1.81 and is now ipnsort, a pdqsort descendant) refines the same idea further: pattern defeating, with median-of-three
pivots, a shuffle when a bad pattern is detected, and a branchless
partition.
