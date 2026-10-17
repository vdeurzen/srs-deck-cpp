---
id: gr-kahn-build-code
kind: code
version: 1
level: 3
tags: [graphs, topological-sort, kahn, lc-207, lc-210]
input: chips
choices:
  c1:
    - "adj[p[1]].push_back(p[0]); ++indeg[p[0]];"
    - "adj[p[0]].push_back(p[1]); ++indeg[p[1]];"
    - "adj[p[1]].push_back(p[0]); ++indeg[p[1]];"
    - "adj[p[0]].push_back(p[1]); ++indeg[p[0]];"
compile:
  harness: |
    #include <initializer_list>
    constexpr VI order(int n, std::initializer_list<std::initializer_list<int>> edges) {
      std::vector<VI> pre, adj(n);                       // g142 rejects nested vector braces
      for (auto e : edges) pre.emplace_back(e);          // in constant evaluation
      // Kahn, the output as its queue
      VI indeg(n), out;
      build(pre, adj, indeg);
      for (int v = 0; v < n; ++v) if (indeg[v] == 0) out.push_back(v);
      for (std::size_t h = 0; h < out.size(); ++h)
        for (int v : adj[out[h]]) if (--indeg[v] == 0) out.push_back(v);
      return out;
    }
    static_assert(order(2, {{1, 0}}) == VI{0, 1});                           // LC 210, example 1
    static_assert(order(4, {{1, 0}, {2, 0}, {3, 1}, {3, 2}}) == VI{0, 1, 2, 3});   // example 2
    static_assert(order(2, {{1, 0}, {0, 1}}).empty());                       // LC 207: a cycle
    int main() {}
requires:
  - gr-kahn-chunk
refs:
  - https://leetcode.com/problems/course-schedule/
  - https://leetcode.com/problems/course-schedule-ii/
  - https://doi.org/10.1145/368996.369025
elaborate: LC 1136 (parallel courses) asks for the fewest semesters. What would you record for each course as it is appended, and how is the answer read off?
---

LC 207 / 210: `prerequisites[i] = {a, b}` means you must take course
`b` before course `a`. Kahn's algorithm needs the edge in the direction
the courses are taken. Complete the loop body so the order comes out
right.

```cpp
#include <vector>
using VI = std::vector<int>;
constexpr void build(const std::vector<VI>& pre, std::vector<VI>& adj, VI& indeg) {
  for (const VI& p : pre) { {{c1::adj[p[1]].push_back(p[0]); ++indeg[p[0]];}} }
}
```

---

**Edge `b → a`: `b` lists `a` as a successor, and `a` gains one
unmet prerequisite.** A course is ready when its in-degree reaches 0,
so `indeg` must count the prerequisites *of* `a`.

Reading `{a, b}` as `a → b` builds the reversed graph: the cycle test
still answers LC 207, but LC 210 gets the order backwards ({3, 1, 2, 0}).
Counting `indeg` on the edge's source counts out-degree instead, so a
course with no successors looks ready first. Attaching both to `a`
gives `a` the out-edges with `a`'s own in-degree, so the counts never
match the edges that decrement them.
