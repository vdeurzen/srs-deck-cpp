# `algo-basics`

The textbook core of algorithms and data structures, as a patient reminder for
a programmer coming back to it: big-O, arrays and lists, hashing, searching,
trees and balanced trees, heaps, sorting, graphs, and recursion, greedy and
dynamic programming. Levels 1–3, one idea per Card, a concrete example on
every Card, at least half of each topic hands-on (`trace`, `code`, `chunk`).

`algo-systems` builds on this Deck (see its `deck.yaml` `relations`): its
Cards that assume a textbook concept `require` the matching `algo-basics/<id>`
Card, so finishing this Deck is what unlocks it. This Deck builds on
`cpp-core` for the few C++ facts its code assumes.

| Topic | Covers |
| --- | --- |
| `01-complexity` | O/Θ/Ω, the growth ladder, counting loops, logs, best/average/worst, amortised, space, recurrences and the master theorem |
| `02-linear` | arrays and dynamic arrays, linked lists, stacks, queues/deques, ring buffers, two pointers, sliding windows, prefix sums |
| `03-hashing` | hash functions, chaining vs open addressing, load factor and growth, deletion, average vs worst case |
| `04-searching` | binary search (half-open and closed forms), lower/upper bound, searching on the answer |
| `05-trees` | traversals, BSTs, why balance, AVL (balance factor, single and double rotations, height bound), red-black invariants and fix-up, B-tree idea, tries |
| `06-heaps` | array layout, sift up/down, O(n) heapify, priority-queue operations, stale entries |
| `07-sorting` | insertion, selection, bubble, merge, quick (Lomuto/Hoare), heap, counting/radix, stability, the n log n bound, `std::sort` vs `std::stable_sort` |
| `08-graphs` | vocabulary and representations, BFS, DFS, components, topological sort, cycles, Dijkstra, Bellman-Ford, DAG shortest paths, MST (Prim, Kruskal), union-find |
| `09-techniques` | recursion and explicit stacks, divide and conquer, greedy and the exchange argument, dynamic programming (state, memo vs table), backtracking |

Conventions are `algo-systems`'s (see its README): every compile-graded Card
discriminates on values with `constexpr` + `static_assert`; every `trace` was
run; every Card cites a source in `refs`.

## Validating

    tool/validate cpp-core algo-basics algo-systems
    scripts/check-code cpp-core algo-basics algo-systems
