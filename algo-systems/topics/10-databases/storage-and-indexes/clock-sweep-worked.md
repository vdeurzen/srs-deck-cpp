---
id: db-clock-sweep-worked
kind: basic
version: 1
level: 3
tags: [caching, databases, worked-example]
requires:
  - interview-essentials/db-lru-recency-bet
refs:
  - https://github.com/postgres/postgres/blob/master/src/backend/storage/buffer/README
  - https://en.wikipedia.org/wiki/Page_replacement_algorithm#Clock
---

A cache of three frames keeps one reference bit per frame, set whenever
its page is accessed. To evict, a hand sweeps the frames in a circle.
Here frames 0–2 hold pages 1, 2, 3 with bits `1 0 1`, and the hand
starts at frame 0.

```
hand at   page  bit  action
frame 0   1     1    clear the bit, move on
frame 1   2     0    evict page 2
(after)   —     —    hand moves on to frame 2
```

## Row 1: why does page 1 stay, although the hand reached it first?

---

**Its bit was set: it was used since the hand last passed.**

The hand clears the bit and moves on, so page 1 gets a second chance:
it goes next lap unless it is accessed again first. A hit only sets one
bit, with no list to reorder, which is why this approximates LRU
cheaply.
