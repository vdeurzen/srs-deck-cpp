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
  - cpp-essentials/types-using-alias
refs:
  - https://leetcode.com/problems/course-schedule/
  - https://leetcode.com/problems/course-schedule-ii/
  - https://leetcode.com/problems/parallel-courses/
  - https://doi.org/10.1145/368996.369025
elaborate: Parallel Courses (LC 1136) asks for the fewest semesters to take every course, when any course whose prerequisites are all done may be taken in the same semester. What would you record for each course as it is appended, and how is the answer read off?
---

Course Schedule (LC 207) asks whether all `numCourses` courses can be
finished; Course Schedule II (LC 210) returns an order to take them in,
or an empty array. In both, `prerequisites[i] = {a, b}` means you must
take course `b` before course `a`. Complete the loop body so Kahn's
algorithm gets an order that respects every prerequisite.

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
still answers Course Schedule, but Course Schedule II gets the order
backwards: {3, 1, 2, 0} when 0 comes before 1 and 2, both before 3.
The other two chips count on the edge's source. `++indeg[p[1]]` with
`b → a` counts `b`'s dependents, so a course no one needs starts ready
though its prerequisites are unmet. `adj[p[0]].push_back(p[1]);
++indeg[p[0]];` builds `a → b` and counts on `a`: each pop then
decrements a course's prerequisites, not its dependents.
