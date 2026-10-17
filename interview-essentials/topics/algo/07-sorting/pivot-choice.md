---
id: sort-pivot-choice
kind: basic
version: 1
level: 2
tags: [sorting, quicksort]
requires:
  - sort-quick-worst
elaborate: If attackers can choose the input to your server's sort, which pivot rule would you trust?
refs:
  - https://www.cs.dartmouth.edu/~doug/mdmspe.pdf
  - https://en.wikipedia.org/wiki/Quicksort#Choice_of_pivot
---

## A quicksort taking the last element as pivot goes quadratic on sorted input. Which pivot rule leaves no input that is reliably slow?

---

**A uniformly random pivot.**

The cost then depends on the coin flips, not the input: every input
has expected Θ(n log n), and n² needs consistently bad luck.
Median-of-three (first, middle, last) fixes sorted and reversed input,
but an adversary can still build inputs that defeat it (McIlroy 1999).
