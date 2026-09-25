---
id: sort-choice
kind: cloze
version: 1
level: 4
tags: [sorting, selection, databases]
refs:
  - https://en.cppreference.com/w/cpp/algorithm/sort
  - https://en.cppreference.com/w/cpp/algorithm/partial_sort
---

Choose the sort from the data, not from habit. Arbitrary comparable
values in memory: `std::sort`, which is {{c1::introsort::quicksort,
with heapsort as the fallback and insertion sort below ~16 elements}}
and therefore O(n log n) worst case. Equal elements whose input order
must survive: {{c2::std\::stable_sort::merge-sort based, allocates
about n/2}}.

Fixed-width integer or normalised byte keys, large n: radix sort,
O(d·n) with d passes and no comparisons at all. Data that arrives
almost in order, or as concatenated sorted runs: an adaptive sort that
detects {{c3::runs::timsort's natural ascending or descending
stretches}} and merges them, which makes an already-sorted input
linear.

Only part of the output is needed. The k-th element, unordered
neighbours: {{c4::std\::nth_element::introselect, expected O(n)}}. The
smallest k, in order: `std::partial_sort`, O(n log k). A stream you
cannot store: a bounded heap of size k, O(n log k) time and O(k)
space.

More data than memory: external merge sort — sort runs of `M`, then
merge them {{c5::k at a time::with k limited by memory divided by the
buffer size}}, which for real numbers means two passes over the data.
And before any of this: if the input is already ordered by an index,
or the plan can produce it in order, the cheapest sort is the one you
do not run.
