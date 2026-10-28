---
id: part-partition-worked
kind: basic
version: 1
level: 2
tags: [algorithms, rearranging, worked-example]
requires:
  - part-partition-intro
  - stdalgo-remove-if-worked
refs:
  - https://en.cppreference.com/w/cpp/algorithm/partition
  - https://eel.is/c++draft/alg.partitions
---

One way `std::partition(v.begin(), v.end(), is_even)` can work on
`v{5, 2, 7, 4}`, in one pass with a write position (where the next even
goes) starting at 0:

| read | test the element | step | `v` after |
| --- | --- | --- | --- |
| 0: 5 | odd | — | `5 2 7 4` |
| 1: 2 | even | swap an element that passes into the write position (0), advance the write position | `2 5 7 4` |
| 2: 7 | odd | — | `2 5 7 4` |
| 3: 4 | even | swap an element that passes into the write position (1), advance the write position | `2 4 7 5` |
| — | — | return the boundary: position 2 | `2 4 \| {5, 7}` |

The standard fixes only the boundary and the groups: the order inside
each group is unspecified.

## At read 3, the 4 is *swapped* with the 5, not copied over it as `std::remove_if` would copy. Why?

---

**`partition` must keep every element, so the 5 moves back instead of being overwritten.**

`remove_if` may lose what it skips: its tail holds leftovers. `partition`
only rearranges, so the odds still sit after the boundary; that is why
the result is a reordering of the input.
