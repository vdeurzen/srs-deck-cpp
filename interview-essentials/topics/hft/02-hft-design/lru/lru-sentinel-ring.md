---
id: lru-sentinel-ring
kind: basic
version: 1
level: 3
tags: [hft, lru, linked-lists, intrusive]
requires:
  - lru-index-links
refs:
  - https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#list-management-functions
  - https://en.wikipedia.org/wiki/Sentinel_node
elaborate: Where else does one dummy element remove the edge cases from a loop or a list, such as a dummy head node when building a linked list?
---

A fixed-capacity LRU links its slots by index: `n[i]` is the slot after
`i`, `p[i]` the slot before. Slot 0 holds no entry:

```
n:  0 → 4 → 1 → 2 → 3 → 0      n[0] = 4: most recent
                               p[0] = 3: next victim
```

## Unlinking is always `n[p[s]] = n[s]; p[n[s]] = p[s];`. Why does it never check whether `s` is the first or the last entry?

---

**Slot 0 is a sentinel: every entry always has a neighbour on both sides.**

The first entry's previous slot and the last entry's next slot are both
0, so those writes land in the sentinel. Without it, unlink and insert
would each need branches for the head, the tail and a lone entry.
