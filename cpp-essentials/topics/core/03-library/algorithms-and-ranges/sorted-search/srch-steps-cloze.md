---
id: srch-steps-cloze
kind: cloze
version: 1
level: 3
tags: [algorithms, searching]
requires:
  - srch-index-or-minus-one
  - srch-unsorted-input
  - stdalgo-sort-basics
elaborate: Say which step you would drop when the data arrives already sorted, and how you would know it is.
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://eel.is/c++draft/res.on.required
---

Searching a `std::vector<int>` with `std::lower_bound` takes four steps:
{{c1::sort first}} · search ·
{{c2::check the miss}} · read the position.

---

Unsorted input breaks the precondition, which is undefined behaviour.
The returned `it` may be `end()` or hold a different value, so it is
checked before the position is read.
