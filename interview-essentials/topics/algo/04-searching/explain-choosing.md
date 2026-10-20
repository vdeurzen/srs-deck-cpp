---
id: search-explain-choosing
kind: explain
version: 1
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
- [ ] Cue: sorted data, or a yes/no test on candidate answers that switches from false to true only once
- [ ] Pattern: binary search, which probes the middle and keeps only the half that can still hold the answer
- [ ] Example: smallest ship capacity that delivers all packages, in their given order, within 5 days
- [ ] Complexity: about log₂ n probes, since each halves the candidates, so a million need about 20
- [ ] Look-alike: two values in a sorted array summing to a target, found by moving two indices inward
