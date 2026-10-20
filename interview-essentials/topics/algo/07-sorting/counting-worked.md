---
id: sort-counting-worked
kind: basic
version: 1
level: 1
tags: [sorting, worked-example]
requires:
  - linear-prefix-sum-range
refs:
  - https://en.wikipedia.org/wiki/Counting_sort
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
---

## Counting sort on the scores `2 0 1 2`, keys in 0–2: count each key, prefix-sum the counts into end positions, then place each element, from the right, at its key's end − 1 and move that end down.

```
step                    state                    why
count each key          count = 1 1 2            one 0, one 1, two 2s
prefix-sum the counts   end = 1 2 4              2s end at slot 4
place 2, then 1         2 → slot 3, 1 → slot 1   end − 1, then lower it
place 0, then 2         0 → slot 0, 2 → slot 2   out = 0 1 2 2
```

Why does a prefix sum of the counts give each key's end position?

---

**Key v's block ends after all keys ≤ v, and the sum counts exactly those.**

Sorted output puts every key ≤ v before every key > v, so count[0] + … +
count[v] slots hold them: 1 + 1 + 2 = 4, and the 2s fill slots 2–3.
Placing from the right keeps equal keys in input order.
