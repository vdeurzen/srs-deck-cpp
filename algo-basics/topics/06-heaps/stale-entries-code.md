---
id: heap-stale-entries-code
kind: code
version: 1
level: 3
tags: [heaps, graphs, c++, shortest-paths]
requires:
  - interview-essentials/heap-min-comparator
  - interview-essentials/heap-vs-bst
elaborate: How large can the queue grow with this scheme, and when would that worry you?
input: chips
choices:
  c1: ["d != dist[u]", "d == dist[u]", "d < dist[u]", "d >= dist[u]"]
compile:
  harness: |
    // node 1 improved 5 -> 2, node 2 improved 7 -> 3: the old entries stayed
    #include <utility>
    using Q = std::vector<std::pair<int, int>>;
    using V = std::vector<int>;
    static_assert(settle_order(Q{{2, 1}, {3, 2}, {4, 3}, {5, 1}, {7, 2}}, V{0, 2, 3, 4})
                  == V{1, 2, 3});
    static_assert(settle_order(Q{{1, 2}, {2, 1}, {6, 2}}, V{0, 2, 1}) == V{2, 1});
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/container/priority_queue
  - https://doi.org/10.1007/BF01386390
---

A shortest-path search keeps a min-queue of `(distance, node)` entries.
`std::priority_queue` cannot lower a key, so a shorter distance is
pushed as a second entry and the old one stays. `popped` lists the
entries in pop order; `dist[u]` is u's best distance. Complete the
condition so `order` lists each node once.

```cpp
#include <vector>
constexpr std::vector<int> settle_order(const auto& popped, const auto& dist) {
  std::vector<int> order;
  for (const auto& [d, u] : popped) {
    if ({{c1::d != dist[u]}}) continue;
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
