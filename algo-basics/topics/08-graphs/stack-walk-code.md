---
id: graph-stack-walk-code
kind: code
version: 1
level: 2
tags: [foundations, graphs, traversal, dfs, stack]
input: chips
choices:
  c1: ["stack.back()", "stack.front()", "stack[0]", "int(stack.size()) - 1"]
compile:
  harness: |
    #include <array>
    // 0-1 0-2 1-3 2-4, undirected
    constexpr std::array<std::array<int, 2>, 5> kG{{{1, 2}, {0, 3}, {0, 4}, {1, -1}, {2, -1}}};
    static_assert(walk(kG, 0) == 2413);   // visits 0 2 4 1 3
    int main() {}
requires:
  - interview-essentials/graph-list-from-edges-chunk
elaborate: Where would you replace recursion with this explicit stack in real code, and what does it protect you from?
refs:
  - https://en.wikipedia.org/wiki/Depth-first_search#Pseudocode
  - https://en.cppreference.com/w/cpp/container/vector
---

A graph walk keeps its "to visit" vertices in a `std::vector` used as a
stack. Complete the line that picks the next vertex. `order` records the
visits as digits: 0 2 4 1 3 reads as 2413.

```cpp
#include <vector>
constexpr int walk(const auto& adj, int s) {             // -1 pads adj[u]
  std::vector<int> stack{s}; bool seen[5] = {}; int order = 0;
  while (!stack.empty()) {
    const int u = {{c1::stack.back()}}; stack.pop_back();
    if (seen[u]) continue;
    seen[u] = true; order = order * 10 + u;
    for (int v : adj[u]) if (v != -1 && !seen[v]) stack.push_back(v);
  }
  return order;
}
```

---

A stack hands back the most recently pushed vertex, so the walk dives
along one branch (0, 2, 4) before returning to 1: depth-first. It must
read the element that `pop_back()` removes. `front()` reads the oldest
entry while discarding the newest, so the walk visits 1 and loses 2.

A vertex can be pushed twice before it is popped, so the `seen` test
sits at the pop.
