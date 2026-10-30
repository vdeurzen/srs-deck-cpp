---
id: sort-insertion-cutoff
kind: basic
version: 2
level: 3
tags: [sorting, constant-factors]
requires:
  - sort-introsort
elaborate: A sorting network is the other common base case for small ranges — what would it do better and worse than insertion sort here?
refs:
  - https://www.cs.rpi.edu/~musser/gp/introsort.ps
  - https://gcc.gnu.org/git/?p=gcc.git;a=blob;f=libstdc%2B%2B-v3/include/bits/stl_algo.h
---

## libstdc++'s `std::sort` stops partitioning once a range is ≤ 16 elements and leaves it unsorted. How does insertion sort then finish all those small ranges?

---

**One insertion sort over the whole array, run once at the end.**

Every element is then within 16 places of its final position, so the
pass is linear-ish, in cache, recursion-free and well predicted, and
there is one call instead of one per small range. (libstdc++:
`_S_threshold = 16`, `__final_insertion_sort`.)
