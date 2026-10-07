---
id: heap-stale-entries-code
kind: code
version: 1
level: 3
tags: [heaps, graphs, c++, shortest-paths]
requires:
  - heap-min-comparator
  - heap-vs-bst
elaborate: How large can the queue grow with this scheme, and when would that worry you?
input: chips
choices:
  c1: ["d != dist[u]", "d == dist[u]", "d < dist[u]", "false"]
compile:
  harness: |
    // node 1 improved 5 -> 2, node 2 improved 7 -> 3: the old entries stayed
    static_assert(settle_order({{5, 1}, {2, 1}, {3, 2}, {7, 2}, {4, 3}}, {0, 2, 3, 4})
                  == std::vector<int>{1, 2, 3});
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/container/priority_queue
  - https://doi.org/10.1007/BF01386390
---

`std::priority_queue` cannot lower an entry's key, so when Dijkstra finds
a shorter distance it pushes a second `(distance, node)` entry and leaves
the old one in the queue. `dist[u]` is u's best distance. Complete the
test that drops the leftovers.

```cpp
#include <algorithm>
#include <functional>
#include <utility>
#include <vector>

constexpr std::vector<int> settle_order(std::vector<std::pair<int, int>> pq,
                                        const std::vector<int>& dist) {
  std::vector<int> order;
  std::ranges::make_heap(pq, std::greater<>());
  for (; !pq.empty(); pq.pop_back()) {
    std::ranges::pop_heap(pq, std::greater<>());
    const auto [d, u] = pq.back();
    if ({{c1::d != dist[u]}}) continue;   // stale entry
    order.push_back(u);
  }
  return order;
}
```

---

An entry is stale when its distance is no longer the node's best. The
best entry always comes out first, smallest-first, so every later entry
for the same node is larger and gets skipped.

Why not update in place? A heap cannot find an entry without an O(n)
scan, and `priority_queue` hides its array anyway. Duplicates cost one
extra push and pop each, O(log n), which is cheaper.
