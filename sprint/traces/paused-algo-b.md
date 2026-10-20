# algo-basics 05–09 trace rebuild (2026-10-20, paused-Decks addendum)

Values re-verified by compiling and running each snippet (or an equivalent instrumented copy) with GCC 16.2, `g++ -std=c++23 -Wall -Wextra`.

tree-avl-balance-factor | SHRINK | probe 2 had 3 values → 2 (dropped b1); back trimmed to this run. v2
tree-avl-double-rotation | WORKED FIRST | probes of 3 values → 2 each; new tree-avl-double-rotation-worked (mirror case 1, 3, 2). v2
tree-avl-insert-trace | SHRINK | 3 runs, 13 inserts, rotation counter → one avl_insert(5) on a drawn AVL tree, root + right child. v2
tree-bst-delete-trace | WORKED FIRST | 3 erases → one erase whose successor has a right child; new tree-bst-delete-worked. v2
tree-bst-insert-trace | SHRINK | 3 inserts → one insert (42) into the drawn tree, parent + depth. v2
tree-bst-search-steps | WORKED FIRST | 4 searches → one miss search (35), node count only; new tree-bst-search-worked. v2
tree-insert-order-trace | CONVERT | 3 runs × 7 inserts → basic: pair-swapped 1..1000 into a plain BST, height ≈ n/2 (501). v2
tree-size-height-trace | SHRINK | 3 calls, size + height → one height call on 5 nodes; requires call-stack worked example. v2
tree-traversal-trace | SHRINK | 15 values in one probe → postorder only, out[0] and out[2]. v2
heap-pop-trace | WORKED FIRST | 2 pops → one pop; new heap-pop-worked (sift-down). v2
heap-sorted-insert-trace | CONVERT | 3 calls, comma-operator counter → basic: sorted-vector PQ insert is Θ(n). v2
heap-index-trace | OK | no loop, 2 probes, 3 values; added elaborate (version kept)
sort-insertion-cases | CONVERT | 3 sorts with comma-operator counter → basic: sorted input costs n − 1 comparisons. v2
sort-insertion-trace | WORKED FIRST | 5 inserts, 6–7-value probes → one insert, 2 values; requires linear-array-insert-worked. v2
sort-insertion-shift-count | CONVERT | 2 full sorts with counter → basic: shifts = inversions, [3 1 2] example. v2
sort-bubble-vs-insertion | CONVERT | 2 sorts of 6 with comma-operator counters → basic: why bubble pays more (one slot per pass). v2
sort-inversion-count | CONVERT | 3 runs of a pair loop → basic: reversed array has n(n − 1)/2 inversions. v2
sort-merge-trace | WORKED FIRST | 6 elements, `L[i++]`, 7-value probe → 5 elements, plain code, comparisons + j; requires sort-merge-worked. v2
sort-heap-trace | WORKED FIRST | 2 steps, 5-value probes → one step, root + last slot; requires heap-pop-worked. v2
sort-hoare-trace | WORKED FIRST | 6 elements, do-while → 5 elements, plain while, ≤ 8 moves; new sort-hoare-worked. v2
sort-partition-regions | WORKED FIRST | 7 elements, 6 iterations, lambda, 4–6-value probes → 5 elements, 4 iterations, 2 values; requires sort-lomuto-worked. v2
sort-radix-trace | WORKED FIRST | 2 passes, 50-iteration loops, 5-value probes → one tens pass on 4 values; new sort-radix-worked. v2
sort-selection-unstable | WORKED FIRST | 3 passes, 4-value probes, lambda → pass 0 only, 2 suits; new sort-selection-worked. v2
graph-bellman-ford-trace | WORKED FIRST | 3 rounds, 4-value probes → one round, dist[2] + dist[3]; new graph-bellman-ford-worked. v2
graph-prim-heap-trace | SHRINK | whole run, stale counter → one step from given state, top key + heap size. v2
graph-prim-trace | WORKED FIRST | 3 add() calls → one add() from given state; new graph-prim-worked. v2
graph-traversal-work-trace | CONVERT | instrumented BFS, 14 checks → basic: neighbour tests = 2E. v2
graph-dijkstra-trace | WORKED FIRST | 4 probes, 4-value arrays → one step, dist[1] + heap size; requires graph-dijkstra-worked. v2
graph-bfs-trace | WORKED FIRST | whole BFS, 6-value probes → one step, dist[3] + queue size; requires graph-bfs-worked. v2
graph-bfs-grid-trace | SHRINK | 11-cell grid, 3 values → 5-cell grid, 2 values (5 pops, one over the 4 limit). v2
graph-dag-shortest-paths-trace | WORKED FIRST | 4 calls, 5-value probes → one 4-vertex pass, 2 values; new graph-dag-shortest-paths-worked. v2
graph-no-visited-loop-trace | SHRINK | 4 steps, 5-value probes → 2 steps, stack size + stack[1]. v2
graph-directed-storage-trace | SHRINK | 3 edges, 9 pushes, 5-value probe → 2 edges, 6 pushes, two list sizes. v2
technique-dp-memo-calls | CONVERT | 2 runs with call counters → basic: fib_memo(5) makes 2n − 1 = 9 calls. v2
technique-subset-sum-prune | CONVERT | 2 runs, node counter → basic: why the sorted-items prune is safe (127 → 9). v2
technique-termination-gcd-trace | OK | one run, 3 steps, 2 values per probe; added elaborate (version kept)
