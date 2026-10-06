---
id: graph-tarjan-scc
kind: basic
version: 1
level: 5
tags: [graphs, compilers, dfs]
requires:
  - graph-bfs-and-dfs
refs:
  - https://epubs.siam.org/doi/10.1137/0201010
  - https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
---

## How does Tarjan's algorithm find strongly connected components in one DFS, and what is the condensation used for?

---

Each vertex gets a DFS **index** (discovery order) and a **lowlink**:
the smallest index reachable from its subtree using tree edges plus at
most one edge back to a vertex still on the stack. Keep every visited
vertex on an explicit stack; after exploring a vertex's successors,
propagate lowlinks upward. If a vertex finishes with
`lowlink == index`, it is the **root** of an SCC, and everything above
it on the stack — popped down to and including it — is that component.

The "still on the stack" test is the whole subtlety: a cross edge into
an already-completed component must *not* lower your lowlink, because
that component cannot reach you back. One DFS, O(V + E), no transpose
graph (Kosaraju needs two passes and the reversed graph; the
path-based variant of Tarjan is a third option with two stacks).

A free and very useful side effect: **components are emitted in reverse
topological order** of the condensation. Collapsing each SCC to a single
node yields a DAG, so:

- **Compilers**: the call graph condenses to a DAG of mutually
  recursive groups, and interprocedural analyses run bottom-up over it
  — analyse callees before callers, and treat each recursive group as a
  fixpoint. The same condensation orders SCCs of the CFG for loop
  analysis.
- **Type checking and constraint solving**: mutually recursive
  definitions must be generalised together, and the SCCs say exactly
  which ones those are.
- **Build systems and package managers**: cyclic dependency groups get
  reported as a unit instead of as an arbitrary edge.
- **2-SAT**: satisfiable iff no variable shares a component with its
  negation, with the assignment read off the condensation's order.

As always with DFS, write it iteratively: a recursive Tarjan on a large
call graph is a stack overflow waiting for the right input.
