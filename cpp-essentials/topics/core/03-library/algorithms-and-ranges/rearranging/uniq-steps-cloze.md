---
id: uniq-steps-cloze
kind: cloze
version: 1
level: 3
tags: [algorithms, rearranging]
requires:
  - uniq-trace
elaborate: Say which step you could leave out when the data arrives already sorted, and how you would know it does.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/unique
  - https://en.cppreference.com/w/cpp/container/vector/erase
---

To dedupe a `std::vector<int>` in place, so that each value stays exactly
once, the three steps are: {{c1::sort}} · unique · {{c2::erase the tail}}.

---

`unique` drops only adjacent duplicates, so sorting first puts equal
values next to each other. `unique` cannot change the size, so the
unspecified tail it leaves must be erased.
