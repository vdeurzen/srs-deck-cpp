---
id: search-explain-log-search
kind: explain
version: 1
level: 3
tags: [binary-search, search-on-answer, capstone]
requires:
  - search-upper-bound-code
  - search-ship-capacity-code
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
---
An append-only log holds 10 million records sorted by timestamp. You
must return every record between times t1 and t2, and choose the
smallest chunk size that splits the log into at most 64 chunks without
cutting a record. Explain how you would search for each, and why it is
fast and correct.
---
- [ ] Sorted timestamps let one comparison discard half the range: about log₂ 10⁷ ≈ 24 comparisons per search instead of a 10⁷-record scan
- [ ] The range starts at `lower_bound(t1)`, the first record not before t1
- [ ] It ends at `upper_bound(t2)`, the first record after t2, so the answer is the half-open range between the two
- [ ] "Fits in at most 64 chunks" is monotone in the chunk size: if a size fits, every larger one does, so the sizes can be binary searched for the first that fits
- [ ] That search runs between the largest record (nothing smaller can hold it) and the total size (one chunk)
