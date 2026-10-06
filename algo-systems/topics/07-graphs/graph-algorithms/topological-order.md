---
id: graph-topological-order
kind: basic
version: 1
level: 3
tags: [graphs, scheduling, compilers, databases]
requires:
  - graph-bfs-and-dfs
refs:
  - https://en.wikipedia.org/wiki/Topological_sorting
  - https://en.wikipedia.org/wiki/Directed_acyclic_graph
---

## Two ways to topologically sort a DAG. How does each detect a cycle, and which one do you want for a build system?

---

**Kahn's algorithm** (BFS-flavoured): compute in-degrees, seed a queue
with the zero-in-degree vertices, and repeatedly emit one and decrement
its successors' counts. **Cycle detection is free**: if you emit fewer
than V vertices, whatever is left has a cycle, and the remainder is the
cyclic part — a usable error message.

**DFS postorder reversed**: run a DFS and push each vertex when it
*finishes*; the reverse of that order is topological. **Cycle detection
needs a third colour**: white/grey/black, where an edge to a grey
(on-stack) vertex is a back edge and therefore a cycle. That colouring
also hands you the actual cycle — walk the DFS stack — which is what
you want for diagnostics.

For a build system or task scheduler, Kahn's is usually the better
fit, for a reason that has nothing to do with the sort: the ready
queue *is* the algorithm's state, so it parallelises directly — every
vertex in the queue can run concurrently, and completing a task
decrements its dependents. That is precisely how `make -j`, Bazel and
most job DAG runners work, and it gives back-pressure and progress
reporting for free. It is also stable under a priority: pop the ready
task with the longest critical path first and you approximate the
optimal schedule.

Where topological order shows up next door: instruction scheduling
inside a basic block (a DAG of data dependencies), query plan execution
order, module initialisation, spreadsheet recalculation, and — in a
compiler — the order in which to visit an SCC-condensed call graph so
that callees are analysed before their callers.

One caveat: topological order is not unique, so anything that depends on
*which* order you get (a hash of the output, a golden test) needs the
tie-break specified — sort the ready set by id, and the algorithm
becomes deterministic.
