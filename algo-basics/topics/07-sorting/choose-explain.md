---
id: sort-choose-explain
kind: explain
version: 1
level: 3
tags: [sorting, trade-offs]
requires:
  - interview-essentials/sort-merge-stable-code
  - interview-essentials/sort-pivot-choice
  - interview-essentials/sort-compare-properties
  - sort-insertion-shift-count
  - interview-essentials/sort-heap-sort
elaborate: Which of these five cases is closest to data you sort at work, and would `std::sort` or `std::stable_sort` already be the right pick?
refs:
  - https://en.wikipedia.org/wiki/Sorting_algorithm#Comparison_of_algorithms
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
---

An interviewer asks which sort you would pick for each case, and which
property decides it.
(a) 40 elements, only a few out of place. (b) Orders already sorted by
customer, re-sorted by date with customers kept in order within a date.
(c) 10 million 12-bit sensor readings. (d) Firmware with no spare
memory and a hard worst-case time limit. (e) A general array of
doubles in RAM where average speed matters and stability does not.

---

- [ ] (a) Insertion sort, because its cost is Θ(n + inversions) and a few misplaced elements make few inversions
- [ ] (b) Merge sort, because it is stable: ties on date keep the earlier customer order
- [ ] (c) Counting sort, because 12-bit keys need only k = 4096 counters, so O(n + k) beats n log n
- [ ] (d) Heap sort, because it guarantees O(n log n) in the worst case with O(1) extra space
- [ ] (e) Quicksort with a random pivot: in place, expected n log n, and no input is reliably slow
