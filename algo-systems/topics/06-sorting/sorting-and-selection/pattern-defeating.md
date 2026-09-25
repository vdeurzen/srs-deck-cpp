---
id: sort-pattern-defeating
kind: basic
version: 1
level: 4
tags: [sorting, adaptivity]
refs:
  - https://github.com/orlp/pdqsort
  - https://github.com/python/cpython/blob/main/Objects/listsort.txt
---

## Real data is rarely random — it is already sorted, reversed, or concatenated from sorted pieces. What do modern sorts do about it?

---

They **detect runs and adapt**, so "almost sorted" costs almost nothing.

**Timsort** (Python's `list.sort`, Java's `Arrays.sort` for objects) is
built around this. It scans for natural runs — maximal ascending or
strictly descending stretches, reversing the descending ones in place —
extends short runs to a minimum length with insertion sort, then merges
runs according to a stack invariant that keeps merge sizes balanced.
Already-sorted input is one run: O(n), one pass. Concatenated sorted
segments — the common shape when you append a new batch to a sorted
file — merge in O(n log k) for k runs. It is stable, which is why it is
the default for objects.

**pdqsort** (Rust's `sort_unstable`, Go's `slices.Sort` since 1.19)
takes the unstable branch. It is introsort plus: median-of-three (or
ninther) pivots; detection of already-partitioned inputs, which are
handled by insertion sort; a **branchless partition** using a block of
offsets so the inner loop has no unpredictable branch; and, when a bad
pattern is detected, a deterministic shuffle of a few elements to break
it rather than a full randomisation. Pathological inputs fall back to
heapsort, keeping the O(n log n) bound.

Why this matters in systems work: sorting is often applied to data that
is nearly in order already (log records by timestamp, rows read from a
clustered index, orders by price). An adaptive sort turns that into a
linear scan. It also means benchmarks on random data understate the
difference between algorithms on your real input — and that
*deliberately* feeding a sorter partially ordered input (by merging into
sorted segments rather than appending anywhere) is a real optimisation.

The database version of the same insight is the **interesting order**:
a plan keeps track of the orderings its operators produce, so a later
sort or merge join can be skipped entirely.
