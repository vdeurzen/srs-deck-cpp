---
id: sort-elementary-compare
kind: cloze
version: 1
level: 2
tags: [foundations, sorting, complexity]
requires:
  - sort-insertion-idea
  - sort-selection-idea
refs:
  - https://algs4.cs.princeton.edu/21elementary/
  - https://en.wikipedia.org/wiki/Insertion_sort#Best,_worst,_and_average_cases
---

1000 keys arrive already sorted. Selection sort makes 499 500
comparisons on them; insertion sort makes {{c1::999::a number}}.

---

Insertion sort compares each new key once with the last key of the
sorted prefix, finds it is not smaller, and stops: n − 1 comparisons.
Selection sort cannot stop early: each pass scans the whole unsorted
suffix to be sure it has the minimum.
