---
id: sort-network-limits
kind: basic
version: 1
level: 4
tags: [sorting, adaptivity]
requires:
  - sort-networks
elaborate: How would you sort a range whose length is only known at run time but is always ≤ 16 with networks?
refs:
  - https://dl.acm.org/doi/10.1145/1468075.1468121
---

## On which 8-element input does a sorting network lose clearly to insertion sort?

---

**Already-sorted input: the network still runs all 19 compare-exchanges; insertion sort does 7.**

Data-independence cuts both ways: no input is worse, none is better.
The network also fixes n at compile time, and it is not stable unless
ties are broken by original index.
