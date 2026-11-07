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
- [ ] An algorithm sees only two iterators, never the container, so `unique` cannot change the vector's size
- [ ] `unique` moves each kept value forward over adjacent duplicates and returns the new logical end
- [ ] Elements after the position `unique` returns are still in the vector, holding unspecified values
- [ ] `v.erase(returned, v.end())` drops the size to the number of kept values
