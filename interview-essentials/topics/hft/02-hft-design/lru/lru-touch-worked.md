---
id: lru-touch-worked
kind: basic
version: 1
level: 2
tags: [hft, lru, intrusive, worked-example]
requires:
  - lru-sentinel-ring
refs:
  - https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#list-management-functions
  - https://en.wikipedia.org/wiki/Sentinel_node
---

An LRU links slots by index: `n[i]` is the slot after `i`, `p[i]` the
slot before; slot 0 is the sentinel. The ring is 0 → 4 → 1 → 2 → 3 → 0,
so 3 is the next victim. A hit on slot 3 moves it to the front:

| write | changes | why |
| --- | --- | --- |
| unlink 3 | n[2] = 0, p[0] = 2 | neighbours skip 3 |
| `n[3] = n[0]` | n[3] = 4 | 3 points at old head |
| `p[3] = 0` | p[3] = 0 | 3 points back at sentinel |
| `p[n[0]] = 3` | p[4] = 3 | old head points back at 3 |
| `n[0] = 3` | n[0] = 3 | 3 is most recent |

## Why must `p[n[0]] = 3` run before `n[0] = 3`?

---

**Until `n[0] = 3` runs, `n[0]` still names the old head, 4.**

Swapped, `p[n[0]]` would be `p[3]`: slot 3 would point back at itself,
and 4 would still point back at the sentinel, breaking the ring.
