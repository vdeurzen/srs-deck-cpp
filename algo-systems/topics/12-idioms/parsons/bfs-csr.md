---
id: parsons-bfs-csr
kind: parsons
version: 2
level: 4
tags: [graphs, traversal, layout]
compile:
  harness: |
    #include <array>
    inline constexpr std::array<int, 7> kOffset{0, 2, 5, 6, 7, 8, 8};
    inline constexpr std::array<int, 8> kTarget{1, 2, 3, 4, 5, 4, 5, 5};
    constexpr std::array<int, 6> run(int source) {
      std::array<int, 6> dist{-1, -1, -1, -1, -1, -1}, queue{source};
      dist[source] = 0;
      bfs(kOffset.data(), kTarget.data(), dist.data(), queue.data());
      return dist;
    }
    static_assert(run(0) == std::array<int, 6>{0, 1, 1, 2, 2, 2});
    static_assert(run(2) == std::array<int, 6>{-1, -1, 0, -1, 1, 2});
    int main() {}
requires:
  - interview-essentials/graph-bfs-and-dfs
  - graph-representations
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search
  - https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format)
---

BFS over a graph in CSR form: the neighbours of `u` are `target[offset[u]]`
up to `target[offset[u + 1]]`. `queue[0]` holds the source, and `dist` is
-1 everywhere except the source's 0. *Pop*, *scan neighbours*, *skip
visited*, *mark and push*: order the lines.

```cpp
constexpr void bfs(const int* offset, const int* target, int* dist, int* queue) {
  for (int head = 0, tail = 1; head != tail; ++head)
    for (int e = offset[queue[head]]; e < offset[queue[head] + 1]; ++e) {
      const int v = target[e];
      if (dist[v] != -1) continue;
      dist[v] = dist[queue[head]] + 1;
      queue[tail++] = v;
    }
}
```

---

**BFS: pop, scan neighbours, skip visited, mark and push.** Marking in
the same step as the push keeps each vertex in the queue at most once,
so the six-slot queue never overflows; marking on pop lets a vertex
enter several times. With unit weights the first visit is already the
shortest distance, so no relaxation step is needed.
