---
id: sort-pick-general-doubles
kind: basic
version: 1
level: 3
tags: [sorting, mixed]
requires:
  - interview-essentials/sort-pivot-choice
  - interview-essentials/sort-std-sort-vs-stable
  - interview-essentials/sort-heap-sort
elaborate: Your input could be chosen by an attacker. Which part of this answer would you keep, and what would you check about your library's sort?
refs:
  - https://www.cs.dartmouth.edu/~doug/mdmspe.pdf
  - https://en.wikipedia.org/wiki/Heapsort#Comparison_with_other_sorts
---

## 10⁷ doubles in RAM, in no particular order, must be sorted as fast as possible on average; equal values may end up in any order. Which sort would you use?

---

**Quicksort with a random pivot.**

In place, with expected Θ(n log n) on every input. Merge sort's Θ(n)
buffer buys stability nobody needs here. Heap sort's guarantee costs
speed: its parent-to-child jumps scatter memory reads, so it usually
runs slower.
