---
id: search-explain-choosing
kind: explain
version: 2
level: 3
tags: [searching, recognition]
requires:
  - search-binary-search-halving
  - search-binary-search-chunk
  - search-on-answer-monotone
  - linear-two-pointers-sorted-pair
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
  - https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
  - https://en.cppreference.com/w/cpp/algorithm/partition_point
elaborate: Name a problem outside arrays, such as finding the first bad build or the largest batch size that fits in memory, where the same cue applies, and say what its yes/no test is.
---
An interviewer gives you a problem statement. What would make you look
for a method that rules out candidates in bulk instead of scanning
them? Answer aloud in about a minute.
---
- [ ] Sorted data, or a yes/no test on candidate answers that flips from false to true only once
- [ ] Then binary search probes the middle and keeps only the half that can still hold the answer
- [ ] Smallest ship capacity within 5 days fits: if a capacity fails, every smaller one fails too
- [ ] Each probe halves the candidates, so about log₂ n probes: a million candidates need about 20
- [ ] For a pair with a target sum in sorted data, each inward step of two indices discards one element's pairs
