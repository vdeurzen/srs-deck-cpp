---
id: rearr-explain-rearranging
kind: explain
version: 1
level: 4
tags: [algorithms, rearranging, interview]
requires:
  - part-parity-code
  - sel-median-code
  - uniq-dedupe-code
  - sel-cost
  - uniq-unsorted-misconception
elaborate: Say which task in your own code copies into a second vector where one of these in-place calls would do.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition
  - https://en.cppreference.com/w/cpp/algorithm/nth_element
  - https://en.cppreference.com/w/cpp/algorithm/unique
---
An interviewer asks how the standard library rearranges a vector in place, without a second container. Explain.
---
- [ ] Problem: reorder values inside the vector, with no full sort.
- [ ] Mechanism: partition, nth_element and unique move values inside the range and never change its size.
- [ ] Example: `v.erase(std::unique(v.begin(), v.end()), v.end())` dedupes a sorted vector.
- [ ] Cost: partition and unique make one pass; nth_element is linear on average (a few times n), against sort's n·log n.
- [ ] Pitfall: unique drops only adjacent duplicates, so sort first, then erase the tail.
