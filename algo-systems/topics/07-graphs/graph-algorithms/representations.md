---
id: graph-representations
kind: basic
version: 1
level: 3
tags: [graphs, layout, memory-hierarchy, compilers]
refs:
  - https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format)
  - https://en.wikipedia.org/wiki/Adjacency_list
---

## Adjacency matrix, vector-of-vectors, and CSR. What does each cost, and which one does a compiler or graph engine actually use?

---

**Adjacency matrix** — V² bits or bytes. Edge existence in O(1),
neighbours in O(V). Only sensible for dense or small graphs, but then it
is excellent: a row is a bitset, so "neighbours of u ∪ neighbours of v"
is a word-wise OR, and transitive closure is a triple loop over machine
words. Dataflow analyses over ≤ a few thousand blocks often use exactly
this.

**Vector of vectors** (`vector<vector<int>>`) — the teaching
representation. V separate allocations, each a pointer chase away, each
with its own capacity slack. Easy to mutate; poor locality; 24+ bytes of
header per vertex. Fine while the graph is being built.

**CSR (compressed sparse row)** — two flat arrays: `offset[V+1]` and
`target[E]`, where the neighbours of `u` are
`target[offset[u] .. offset[u+1])`. One allocation each, neighbours
contiguous, iteration perfectly sequential and prefetchable, and 4 bytes
per edge with 32-bit ids. Edge properties live in parallel arrays
indexed the same way (`weight[e]`), which is the SoA layout applied to
graphs.

CSR is what production code uses for a graph it will traverse more than
it mutates — compiler CFGs after construction, graph analytics engines,
sparse linear algebra (it is literally the sparse matrix format), and
GPU kernels. The cost is that it is **immutable in shape**: adding an
edge means rebuilding, so the usual pattern is "build in a mutable
structure, freeze to CSR, then run every analysis against the frozen
form". Add `offset_in`/`target_in` arrays (the transpose, i.e. CSC) when
the algorithm needs predecessors — which for a compiler is most of
them.

The numbers are worth internalising: a BFS over a 100 M-edge graph in
CSR is a streaming scan; the same BFS over a vector-of-vectors is 100 M
dependent loads. Same algorithm, same complexity, an order of magnitude
apart.
