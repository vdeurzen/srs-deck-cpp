---
id: heap-lazy-deletion
kind: basic
version: 1
level: 4
tags: [heaps, graphs, idioms]
refs:
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Using_a_priority_queue
  - https://en.cppreference.com/w/cpp/container/priority_queue
---

## `std::priority_queue` has no `decrease_key`. How does Dijkstra work anyway, and what does the trick cost?

---

**Push a new entry and ignore the stale ones.** When a shorter path to
`v` is found, push `(newDist, v)` instead of trying to find and fix the
old entry. On pop, compare the popped distance against the best known
distance for that vertex; if they differ, this entry is stale — discard
it and pop again.

```cpp
while (!pq.empty()) {
  auto [d, v] = pq.top(); pq.pop();
  if (d > dist[v]) continue;          // stale, superseded
  for (auto [w, u] : adj[v])
    if (d + w < dist[u]) { dist[u] = d + w; pq.push({dist[u], u}); }
}
```

The costs, precisely:

- **The queue can hold up to E entries instead of V**, so memory is
  O(E) and each operation is O(log E) rather than O(log V). Since
  log E ≤ 2 log V, the asymptotic bound O((V+E) log V) is unchanged.
- **Every vertex is popped possibly several times**, but the `continue`
  guard makes stale pops O(1), and each push produces at most one pop.

What you get in exchange is worth more than the constant: no handle
bookkeeping. A real `decrease_key` needs a stable handle *into* the
heap for every vertex, maintained through every swap — which rules out
a plain array heap and pushes you to a node-based structure with worse
locality, as well as coupling the graph code to the heap's internals.

The pattern generalises beyond shortest paths. A timer queue cancels by
marking, not by removing; an event loop supersedes a scheduled callback
by pushing a newer one; an LRU cache pushes a new access record and
discards the outdated one on eviction. **Lazy deletion trades a bounded
amount of garbage in the queue for removing the need to locate an
element inside it** — and locating something inside a heap is exactly
what heaps are bad at.

The one thing to watch is unbounded growth when supersedes vastly
outnumber pops; then you need a periodic rebuild, or a real indexed
priority queue.
