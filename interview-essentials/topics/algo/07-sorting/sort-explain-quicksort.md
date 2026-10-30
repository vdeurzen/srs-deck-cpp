---
id: sort-explain-quicksort
kind: explain
version: 2
level: 3
tags: [sorting, choosing]
requires:
  - sort-lomuto-trace
  - sort-compare-properties
  - sort-pivot-choice
  - sort-merge-stable-code
refs:
  - https://doi.org/10.1093/comjnl/5.1.10
  - https://www.cs.dartmouth.edu/~doug/mdmspe.pdf
  - https://en.cppreference.com/w/cpp/algorithm/stable_sort
elaborate: Which array you have sorted at work would you hand to quicksort, and which would you not, and why?
---
An interviewer asks when you would pick quicksort to sort an array, and
when you would not. Answer aloud.
---
- [ ] Pick it to sort an array in place: recursing into the smaller side first keeps the stack O(log n)
- [ ] It partitions around a pivot, which lands in its final slot, then sorts each side on its own
- [ ] Partitioning 3 7 1 5 4 around 4 gives 3 1 4 5 7, and no merge step follows
- [ ] Its expected time is Θ(n log n) with a random pivot, but Θ(n²) when every pivot is an extreme
- [ ] Not when equal keys must keep their input order: merge sort does, at the cost of a Θ(n) buffer
