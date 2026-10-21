---
id: gr-dijkstra-stale-entry
kind: basic
version: 1
level: 3
tags: [graphs, shortest-paths, heaps]
requires:
  - graph-dijkstra-popped-final
  - std-priority-queue-api
refs:
  - https://cp-algorithms.com/graph/dijkstra_sparse.html
  - https://en.cppreference.com/w/cpp/container/priority_queue
elaborate: Say in one sentence, as to an interviewer, why the heap may hold up to E entries and what that does to the running time.
---

Dijkstra with a smallest-first `std::priority_queue` of
`{distance, vertex}` pairs. A `priority_queue` cannot change an entry
already inside it, so when `dist[b]` drops from 4 to 3, the code pushes
`(3, b)` and the old `(4, b)` stays in the heap.

```text
heap after the push:  (3, b)  (4, b)  …
(3, b) pops first: b is final at 3
```

## Later `(4, b)` pops. How does the loop know to ignore it?

---

**Its distance 4 exceeds `dist[b]`, now 3: the entry is stale.**

b was finished at 3, its edges already relaxed. Testing `d > dist[u]`
after each pop and skipping (`continue`) stops a stale entry from
scanning b's edges again. This replaces decrease-key.
