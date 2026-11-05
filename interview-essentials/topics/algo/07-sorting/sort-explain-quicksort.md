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
- [ ] Pick quicksort to sort an array in place: recursing into the smaller side first keeps the stack O(log n)
- [ ] Pick quicksort for speed: with a random pivot its expected time is Θ(n log n)
- [ ] Avoid quicksort when the worst case matters: every pivot being an extreme gives Θ(n²)
- [ ] Avoid quicksort when equal keys must keep their input order: merge sort does, at the cost of a Θ(n) buffer
- [ ] (empty: tick this)
