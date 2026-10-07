---
id: graph-dfs-iterative-parsons
kind: code
version: 1
level: 2
tags: [graphs, dfs, stack]
input: chips
choices:
  c1: ["stack[--top]", "stack[top--]", "stack[top - 1]", "stack[0]"]
  c2: ["stack[top++] = adj[u][i]", "stack[++top] = adj[u][i]", "stack[top] = adj[u][i]"]
compile:
  harness: |
    // 0-1 0-2 1-3 2-4, undirected; recursive DFS visits 0 1 3 2 4
    constexpr int kTree[5][2] = {{1, 2}, {0, 3}, {0, 4}, {1, -1}, {2, -1}};
    static_assert(dfs(kTree) == 1324);
    // 0-1 0-2 1-2 2-3 3-4: recursive DFS visits 0 1 2 3 4
    constexpr int kLoop[5][2] = {{1, 2}, {0, 2}, {1, 3}, {2, 4}, {3, -1}};
    static_assert(dfs(kLoop) == 1234);
    int main() {}
requires:
  - graph-dfs-discovery-finish-trace
refs:
  - https://en.wikipedia.org/wiki/Depth-first_search#Pseudocode
---

DFS from 0 without recursion. Complete the pop and the push so it
visits vertices in the same order as recursive DFS. `order` keeps the
visit order as digits: 0 1 3 2 4 reads as 1324.

```cpp
constexpr int dfs(const int (&adj)[5][2]) {                // -1 = no edge
  int stack[8] = {0}, top = 1, order = 0; bool seen[5] = {};
  while (top > 0) {
    const int u = {{c1::stack[--top]}};
    if (seen[u]) continue;
    seen[u] = true; order = order * 10 + u;
    for (int i = 1; i >= 0; --i) if (adj[u][i] >= 0) {{c2::stack[top++] = adj[u][i]}};
  }
  return order;
}
```

---

`top` is the number of entries, so the top one sits at `top - 1`: pop
with `--top` first, push at `top` then `++`. `stack[top--]` reads one
past the top; `stack[top - 1]` and `stack[0]` never shrink the stack,
so the loop never ends.

An explicit stack means a long path cannot overflow the call stack. A
vertex can be on the stack twice, so the "seen" test belongs at the
pop, and neighbours go on in reverse so the first is popped first.
