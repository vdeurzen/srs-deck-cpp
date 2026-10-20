---
id: sort-selection-worked
kind: basic
version: 1
level: 2
tags: [sorting, selection-sort, stability, worked-example]
requires:
  - sort-selection-idea
  - interview-essentials/sort-stable-meaning
refs:
  - https://en.wikipedia.org/wiki/Selection_sort
  - https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
---

## Selection sort on the records `2a 2b 1c`, by the number only: each pass finds the minimum of the unsorted part (the first one, on ties) and swaps it into the pass's slot.

```
pass   minimum        swap          result
0      1c (slot 2)    slots 0, 2    1c 2b 2a
1      2b (slot 1)    none          1c 2b 2a
```

Why does pass 0 leave 2a behind 2b?

---

**Its long-distance swap carried 2a from slot 0 past 2b to slot 2.**

The swap only places 1c; whatever sat in slot 0 is thrown to the
minimum's old slot, jumping any equal keys between. Later passes see a
tie and leave it: selection sort is not stable.
