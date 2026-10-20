---
id: rec-prereq-order-cue
kind: basic
version: 1
level: 3
tags: [graphs, recognition, lc-210]
requires:
  - graph-topo-order
  - graph-kahn-worked
refs:
  - https://leetcode.com/problems/course-schedule-ii/
  - https://doi.org/10.1145/368996.369025
elaborate: Where in your own tooling (a build, a migration runner, a service start-up) does a "must come before" list hide this same search?
---

> There are `numCourses` courses. `prerequisites[i] = [a, b]` means
> course `b` must be taken before course `a`. Return an order in which
> to take them all, or an empty array if none exists.
> `numCourses <= 2000`, `prerequisites.length <= 5000`.

## Which pattern applies?

---

**A topological sort, such as Kahn's algorithm, on courses as vertices and prerequisites as edges.**

An order respecting every "before" edge exists exactly when the graph
has no cycle; Kahn's output comes out short when there is one. Nothing
is measured, only ordered, so this is not a shortest-path search.
