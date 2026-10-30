---
id: search-explain-log-search
kind: explain
version: 1
level: 3
tags: [searching, capstone]
requires:
  - search-upper-bound-code
  - search-ship-capacity-code
elaborate: Where else could a yes/no test that flips once as a number grows let you binary search for that number?
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
---
An append-only log holds 10 million records sorted by timestamp. You
must return every record between times t1 and t2, and choose the
smallest chunk size that splits the log into at most 64 chunks without
cutting a record. Explain to a teammate how you would search for each,
and why that search is fast and correct.
---
- [ ] Sorted timestamps let each comparison discard half: about 24 comparisons for 10⁷ records, not a scan
- [ ] The range starts at `lower_bound(t1)`, the first record not before t1
- [ ] It ends at `upper_bound(t2)`, the first record after t2, so the answer is the half-open range between
- [ ] "Fits in at most 64 chunks" is monotone in the size: if a size fits, every larger one does
- [ ] So binary search the sizes for the first that fits, from the largest record up to the total size
