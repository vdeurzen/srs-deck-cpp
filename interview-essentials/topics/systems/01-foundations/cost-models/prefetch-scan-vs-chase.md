---
id: foundations-prefetch-scan-vs-chase
kind: basic
version: 1
level: 3
tags: [memory-hierarchy, cost-model, low-latency]
requires:
  - foundations-cache-cost-model
  - linear-list-node
  - cpp-essentials/ptr-arrow-member
elaborate: Where in code you have written does a loop follow pointers through scattered nodes, and how would you lay the data out to scan it instead?
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/prefetching/
  - https://en.algorithmica.org/hpc/cpu-cache/latency/
---

## The core's hardware prefetcher watches the addresses a loop reads and fetches the lines it predicts come next, before they are asked for. Both loops read 1 M ints, none in cache yet; the list's nodes are scattered. Why can the prefetcher not help loop B?

```cpp
for (int i = 0; i < n; ++i) s += a[i];                       // loop A
for (Node* p = head; p != nullptr; p = p->next) s += p->val; // loop B
```

---

**B's next address is inside the node still being loaded: nothing to predict.**

Loop A's addresses step by 4 bytes, so the prefetcher runs lines ahead
and A rarely waits. Loop B learns `p->next` only when the load of `p`
finishes, so it pays one full miss per node, one after another: this is
*pointer chasing*.
