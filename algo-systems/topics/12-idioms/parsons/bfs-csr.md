---
id: parsons-bfs-csr
kind: parsons
version: 1
level: 4
tags: [graphs, traversal, layout]
distractors:
  - "const std::size_t u = queue[--tail];"
  - "if (dist[v] > dist[u] + 1) dist[v] = dist[u] + 1;"
compile:
  harness: |
    static_assert(bfs(0) == std::array<int, 6>{0, 1, 1, 2, 2, 2});
    static_assert(bfs(2) == std::array<int, 6>{-1, -1, 0, -1, 1, 2});
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search
  - https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format)
---

```cpp
#include <array>
#include <cstddef>
inline constexpr std::array<std::size_t, 7> kOffset{0, 2, 5, 6, 7, 8, 8};
inline constexpr std::array<std::size_t, 8> kTarget{1, 2, 3, 4, 5, 4, 5, 5};
constexpr std::array<int, 6> bfs(std::size_t source) {
  std::array<int, 6> dist{-1, -1, -1, -1, -1, -1};
  std::array<std::size_t, 6> queue{};
  std::size_t head = 0, tail = 0;
  dist[source] = 0;
  queue[tail++] = source;
  while (head != tail) {
    const std::size_t u = queue[head++];
    for (std::size_t e = kOffset[u]; e < kOffset[u + 1]; ++e) {
      const std::size_t v = kTarget[e];
      if (dist[v] != -1) continue;
      dist[v] = dist[u] + 1;
      queue[tail++] = v;
    }
  }
  return dist;
}
```

---

BFS over a graph in compressed sparse row form, with a flat array as
the queue — no `std::queue`, no allocation, and the neighbours of `u`
are the contiguous span `kTarget[kOffset[u] .. kOffset[u+1])`.

Two lines carry the correctness of the whole thing. **Mark on push**
(`dist[v]` is set in the same step that enqueues `v`), not on pop:
marking on pop lets a vertex reachable from several frontier vertices
enter the queue several times, which is a silent quadratic blow-up on
a dense graph. And **pop from the front** — the first distractor pops
from the back, turning the same code into a depth-first walk that
still terminates and still fills `dist`, but with distances that are
no longer shortest. The Harness catches it at compile time.

The second distractor is the Dijkstra-style relaxation, which is
correct in a weighted setting and pointless here: with unit weights,
the first time BFS reaches a vertex is already its shortest distance,
so no value is ever improved later.

Note the queue's size: `dist` doubles as the visited set, so each
vertex is enqueued at most once and an array of V slots can never
overflow. That is what makes the fixed-capacity queue safe.
