# Audit 2: interview-essentials sample (40 Cards)

Method: PEDAGOGY.md Method, closure computed from scripts/cards.py; lint-shape clean (0 flagged). Traces re-run by hand; all probes, counts and harness claims verified correct.

| Card | Verdict |
|---|---|
| tree-traversal-orders | OK |
| search-first-true-predicate | OK |
| linear-list-insert-misconception | OK |
| tree-bst-check-bounds | OK |
| complexity-space-stack-depth | OK |
| gr-grid-dfs-depth | OK |
| complexity-recursion-tree-calls | OK |
| list-fast-slow-parsons | LADDER: Floyd fast/slow is first met as a rung-5 parsons; no meet, worked or recognise Card in the closure (only linear-list-traverse-chunk). Fix: add a `basic` (why fast reaches null / meets slow on a 4-node cycle) plus a worked example, and require it. |
| stl-pq-lambda-comparator | OK |
| complexity-cost-cases | OK |
| complexity-log-halvings | OK |
| tree-why-balance | OK |
| hashing-chaining | OK |
| trivia-volatile-not-atomic | OK |
| sort-explain-quicksort | OK (rubric taught by quick-idea, lomuto-trace, pivot-choice, compare-properties) |
| complexity-feasible-n | OK |
| seq-ring-buffer-mask | OK |
| std-list-basics | GIVE-AWAY: comment `// at 3` on the `it` line states the answer to "what does *it read?". Fix: drop the comment (or write `// the second element`), keep `// l is now 1 2 3` out of the front. |
| graph-union-find-path-compression | OK |
| arr-kadane-signal | OK |
| gr-multi-source-bfs-code | OK (dense lines; `d.fill` untaught but guessable) |
| mono-histogram-trace | OK |
| linear-array-insert-worked | OK |
| bit-count-dp-code | OK |
| complexity-asym-big-omega | OK |
| linear-array-index-contiguity | OK |
| tree-balance-families | ORDER: "rotations", AVL, red-black, B-tree, node splitting/merging are taught by no Card in the closure (only tree-why-balance); the sentence after blank 1 defines the answer. Fix: add meet Cards for rotation (worked on 3 nodes) and B-tree wide nodes, require them, or turn this into a recognition `basic`. |
| heap-explain-binary-heap | OK |
| mono-explain-stack | OK |
| heap-shape-and-order | OK |
| ll-spsc-ring | OK |
| graph-degree-from-edge-list | GIVE-AWAY (mild): front says "edge e joins from[e] and to[e]" and "edges touching x", so the only chip updating both ends wins by matching, without the undirected-adds-two idea. Fix: state only "deg[x] = edges touching x" and make a distractor that also looks complete (e.g. `deg[u] += 1; deg[u] += 1;`, or `deg[v] += 1;`). |
| bs-first-true-chunk | OK |
| linear-cost-table | OK |
| heap-push-trace | OK |
| trace-lru-order | OVER-BUDGET (borderline): ~5 changing values (2 list slots, 2 map entries, `it`) plus if-init, std::next, splice, erase-by-key, operator[] in one 12-line run. Fix: drop step 1 (the hit) or seed with one fewer element; keep one probe per branch. |
| search-lo-equals-mid-trace | OK |
| complexity-amortised-vs-average | ORDER: "amortised" taught by no Card in the closure (algo/01-complexity/amortised-single-call exists but is not required). Fix: require complexity-amortised-single-call. |
| graph-union-find-problem | OK |
| linear-list-node | GIVE-AWAY: answer (node holds the address of the next) is stated on the front of its prerequisite linear-array-index-contiguity. Fix: remove "each holding the address of the next" from that front (say "linked by pointers"), or swap the order. |

Totals: 33 OK / 40 = 82.5%. Problems 7: untaught term 2, missing ladder rung 1, give-away 3, trace budget 1.
