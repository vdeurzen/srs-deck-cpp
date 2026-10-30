---
id: rearr-explain-rearranging
kind: explain
version: 2
level: 4
tags: [algorithms, rearranging, interview]
requires:
  - uniq-dedupe-code
  - uniq-trace
  - uniq-unsorted-misconception
elaborate: Say which other algorithm leaves the same kind of tail for `erase` to cut, and what it keeps at the front.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/unique
  - https://en.cppreference.com/w/cpp/container/vector/erase
---
An interviewer asks why `std::unique` must be followed by `erase` to shrink a `std::vector`. Explain.
---
- [ ] An algorithm sees only two iterators, never the container, so it cannot change the vector's size
- [ ] `unique` moves each kept value forward over the adjacent duplicates and returns the new logical end
- [ ] The elements from that end to `v.end()` are still there, holding unspecified values
- [ ] `erase(new_end, v.end())` removes that tail, so the size drops to the number of kept values
- [ ] It drops only adjacent duplicates, so an unsorted vector must be sorted first
