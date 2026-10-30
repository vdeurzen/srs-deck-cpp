---
id: linear-explain-array
kind: explain
version: 1
level: 3
tags: [arrays, linked-lists, complexity]
requires:
  - linear-array-index-contiguity
  - linear-array-insert-shift
  - linear-cost-table
  - linear-list-insert-misconception
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §10.1–10.2
  - https://en.cppreference.com/w/cpp/container/vector
elaborate: Say in one sentence, as to an interviewer, which operation in a system you know made you choose a vector over a list, or the other way round.
---
A new hire asks you why a plain array, or `std::vector`, is the default
container for a sequence. Answer aloud in about a minute.
---
- [ ] Any element is reached by its position in one step, without walking from the start
- [ ] Elements sit side by side, so element i starts at the base address + i × element size
- [ ] With 4-byte ints starting at address 1000, a[6] sits at 1024
- [ ] The price is that inserting in the middle shifts every later element one slot right, O(n) at worst
- [ ] A linked list needs i hops to reach index i, so its O(1) insert first pays that walk
