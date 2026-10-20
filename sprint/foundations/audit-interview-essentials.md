# Audit: interview-essentials sample (40 Cards)

Method: PEDAGOGY.md sections 0, 2, 3, 3.1, 4 and FORMAT.md; transitive `requires` closure per Card
(cpp-essentials and interview-essentials); lint-shape (no hits on the sample); scripts/check-code on the
10 compile-graded code/parsons Cards (0 problems, every distractor fails); numbers re-run in Python.
Closure = size (of which cpp-essentials cards).

Verdict key: OK, or severity (wrong / confusing / weak) + problem + fix.

| # | Card | Kind | Closure | Verdict |
|---|------|------|---------|---------|
| 1 | graph-dijkstra-worked | basic | 39 (20) | OK. 4-row table, all terms taught (heap-pq-adt-trace, bfs-why-shortest). |
| 2 | sort-merge-worked | basic | 1 (0) | OK. |
| 3 | graph-kahn-trace | trace | 20 (4) | weak: over budget. About 16 state changes (4 in-degree decrements, 4 order pushes, queue push/pop), plus `--indeg[v] == 0` (side effect in a condition), `ready.front(); ready.pop();` and a global `step()` to decode. Back ends with "Verified by compiling ... GCC 16.2" noise. Fix: 3 vertices, inline the loop, `--indeg[v]; if (indeg[v] == 0)` on two lines, probe one decision point, delete the verification line. |
| 4 | sort-quickselect-trace | trace | 27 (22) | weak: over budget. Two full Lomuto partitions are hidden inside `lomuto()`, so the learner must run both (about 9 changes: 4 swaps, lo, hi, p twice). Fix: show the first partition's result in a comment (`// a is now 2 1 3 9 8, p = 2`) and probe only round 2, or pick an input solved by one partition. Drop the "Verified by..." line. |
| 5 | linear-sequence-containers | basic | 17 (10) | OK. deque is the target; vector's O(n) front is not taught, so no elimination leak. |
| 6 | gr-kahn-chunk | chunk | 40 (22) | weak: (a) code form (output used as its own queue, index `h`) differs from the taught trace (separate `ready` queue), so the bridge sits only on the back; (b) back carries grader meta ("Graded by text ... GCC 16.2") and an untaught term, "recursive DFS sort" (no DFS-sort card in closure). Fix: add one clause to the front/back on `h` as a queue head; remove the meta; drop the DFS sentence. |
| 7 | linear-list-traverse-chunk | chunk | 16 (9) | OK. 6 lines, expose_ms correct, const-pointer-read-rule and ptr-arrow taught. |
| 8 | technique-recursion-sum-code | code | 5 (3) | weak: give-away. The front says the step is "a call on a smaller prefix", which by itself eliminates the `sum(a, n)` chip; "adds up the first n" eliminates the bare `sum(a, n - 1)` chip. Fix: end the front with "Complete the line for every other n." and leave the base-case/shrink idea to the back. |
| 9 | tree-inorder-iterative-parsons | parsons | 30 (10) | confusing: (a) `TreeNode`, `val`, `left`, `right` are never defined on the front; (b) the front spends words on harness plumbing ("a parameter only so the harness can pass a constexpr stand-in") and on explaining `template <class Node>` / `auto` (extraneous load); (c) 8 lines + 2 distractors = 10 chips. Fix: state `struct TreeNode { int val; TreeNode *left, *right; };` once, take `std::stack<TreeNode*>& st`, use a plain `TreeNode*` signature (no template), drop the harness remark. |
| 10 | dp-memo-robber-code | code | 51 (35) | confusing: untaught C++ machinery. `memo = std::vector<int>(v.size(), -1)` as a default member initializer (class-default-member-initialiser is not in the closure), `v, memo, calls` squeezed on one line, and `return memo[i] = std::max(...)` (assignment inside return). Facts check out (21 vs 287 calls, 61 vs 4.36 M). Fix: free function `best(v, memo, i)` with `memo` a `std::vector<int>&` parameter and the assignment on its own line. |
| 11 | complexity-cost-geometric-sum | code | 3 (3) | OK. Harness (1, 8, 1024) kills every distractor. |
| 12 | bits-mask-as-set | basic | 1 (0) | weak: the front never says bit 0 is the rightmost bit, so "items 0 and 2" is also defensible; the bold answer supplies the convention. Fix: add "(bit 0 is the rightmost)" to the front. |
| 13 | mono-next-greater-chunk | chunk | 35 (18) | weak: the front is bare code; `t` and `ans` mean nothing until the back (binary-search-chunk and list-traverse show chunks can carry one line of context). The for-header packs the pop in the increment slot, and the back has grader meta. Fix: one front line "`t[i]` = day i's temperature; `ans[i]` = days until a warmer day"; drop the meta. |
| 14 | complexity-cost-product-rule | basic | 1 (0) | OK. (Back adds a second idea, dependent inner bounds, in one sentence; tolerable.) |
| 15 | graph-cycle-spot | basic | 2 (0) | OK. |
| 16 | rec-union-find-vs-dfs | basic | 72 (43) | weak: (a) elimination leak: (a) is exactly the components-code problem the Card requires, so (b) falls out; (b) is also solvable by one DFS per prefix; (b) "edges arrive one at a time" is not stated in its text. (b) requires a code Card, not a recognition Card of DFS-components. Closure 72 for a concept choice. Fix: require graph-union-find-problem plus a DFS-components recognition Card (not graph-components-code); state (b) as "edges added one at a time, after each: are u and v already connected?" vs (a) with sizes. |
| 17 | graph-cycle-directed-grey | basic | 68 (43) | weak: ladder/gating. A rung-3 concept Card requires the rung-4 C++ trace (graph-dfs-discovery-finish-trace), dragging 43 unrelated C++ Cards (templates, RAII, lifetimes) in front of it. Content is fine (one defensible answer, "grey" defined in the bold). Fix: require graph-dfs-worked (rung 2) + graph-cycle-spot instead. |
| 18 | arr-diff-code | code | 21 (15) | OK. Off-by-one distractors e[1]-1 and e[1]+1 are the real mistakes; all fail. (`std::vector<std::vector<int>>` not taught but readable as Go `[][]int`.) |
| 19 | technique-greedy-coins-counterexample | trace | 2 (2) | weak: requires only ptr-array-name-to-pointer; no greedy meet/worked Card, so the misconception is met before the idea. Budget is fine (6 changes, 1 probe, value 3 verified). Back adds a second idea (canonical coin systems, US coins) and a "Verified by ..." line. Fix: require a greedy-idea Card; cut the US-coins sentence. |
| 20 | search-binary-search-chunk | chunk | 5 (0) | weak: line 5 `if (a[mid] < key) lo = mid + 1; else hi = mid - 1;` holds two statements (chunk rule: one per line); the `return -1` the front promises is not in the chunk; back has "Graded by text" meta. Fix: split the if/else over two lines (still 7 with `return -1` dropped, or drop the `int mid` line's comment), delete the meta. |
| 21 | technique-dp-state | code | 45 (32) | OK. All four chips fail by n = 3. |
| 22 | vec-three-pointers | basic | 18 (18) | OK. |
| 23 | stl-iota-argsort | code | 30 (25) | OK. Projection defined on the front; std::greater taught by heap-min-comparator; all distractors fail. |
| 24 | tree-terms | cloze | 1 (0) | weak: teaches height as a count of levels ("this Deck counts levels"), the non-standard convention (CLRS, most interviewers: edges, so 3). A learner who must talk confidently gets an off-by-one built in. Three vocabulary items in one cloze. Fix: use edges (height 3) and split leaves/subtree/height into single-item clozes. |
| 25 | dp-grid-dag-signal | basic | 54 (32) | weak: yes/no question whose framing ("if moves up and left were allowed too, could any order still work?") makes "No" the obvious answer; id says "dag". Back also introduces shortest-path search (untaught). Fix: "Which cell would d[i][j] have to read before it is final?" or ask for the property (acyclic dependencies). |
| 26 | foundations-latency-scale | basic | 1 (0) | OK. ~1 ns vs ~80 ns, 100x, stated as order of magnitude. |
| 27 | rec-window-or-prefix-sum | basic | 11 (0) | OK. Self-contained, constraint-based cue. |
| 28 | rec-sorted-pair-cue | basic | 31 (25) | weak: no discrimination. The statement's first word is "sorted" and the closure card teaches "sorted -> two pointers", so the answer is read off; id also says "sorted-pair-cue". Fix: show two statements (sorted, and unsorted-with-original-positions) and ask which one needs the map. |
| 29 | graph-edge-ordered-pair | basic | 1 (0) | weak (mild): "paid" vs "met" is answerable from everyday meaning without the ordered-pair idea. Fix: ask "write the edge for 'Ana paid Bo' as a pair; is (Bo, Ana) the same fact?" |
| 30 | graph-bfs-distance-code | code | 44 (26) | weak: extraneous machinery. Hand-rolled array queue with `queue[head++]` and `queue[tail++] = v` (side effects in index expressions), `-1`-padded 3-slot adjacency, nested `std::array`; the std::queue the learner was taught is not used. Fix: write `const int u = queue[head]; ++head;` and `queue[tail] = v; ++tail;` on separate lines, or blank one smaller line. Chips and harness are sound. |
| 31 | heap-sift-down-code | code | 28 (22) | OK. Distractors fail; `std::swap` only mentioned (not taught) in sort-swap-temp's back, harmless. |
| 32 | std-priority-queue-api | basic | 8 (3) | OK. Good gotcha: closure taught min-PQ, std default is max. |
| 33 | lru-touch | code | 84 (55) | weak: each chip is a 4-statement blob, 16 pointer assignments to compare; the correct one is the longest and most complete (elimination by completeness). Fix: blank one statement (`p[n[0]] = s;`) with 3-4 one-line chips, or split into two cloze items. |
| 34 | sort-merge-space | basic | 20 (7) | OK. |
| 35 | search-on-answer-monotone | basic | 41 (29) | OK (content). Concept Card with 29 C++ cards upstream via binary-search-chunk. |
| 36 | sort-pivot-choice | basic | 35 (22) | OK. |
| 37 | sort-heap-sort-unstable | basic | 40 (22) | OK. Example output re-derived by hand (swap-based build, final swap): (1,b)(1,a)(1,d)(2,c) is correct. |
| 38 | hashing-average-vs-worst | basic | 22 (12) | OK. |
| 39 | arr-kadane-all-negative | basic | 32 (26) | OK. 3 iterations; 0 vs -1 correct; Bentley remark correct. |
| 40 | arr-kadane-chunk | chunk | 30 (26) | OK. 6 lines, expose_ms 11000 correct. (Back has grader-meta sentences.) |

## Summary

OK: 22/40 (55%). Problems: 18 (0 wrong, 6 confusing/over-budget, 12 weak). No factual errors found; every number and harness re-checked.

Recurring problem types
- Machinery in code/parsons Cards the closure never taught (cards 9, 10, 30, 33).
- Over-budget traces (3, 4: 2 of 3 sampled traces).
- Leaks: front text states the property (8, 25, 28, 29, 16); ids/tags naming the technique.
- Authoring/grader meta on the back ("Graded by text", "Verified by... GCC 16.2"): 3, 4, 6, 13, 19, 20, 40.
- Gating: concept-only Cards require C++ trace/code Cards (17, 16, 25, 28: 25 to 43 unrelated C++ cards upstream).
- Chunk form violations (20: two statements on a line; 13: no context line).

Complaints
1. Background knowledge: mostly fixed within Cards (terms defined, no undefined term in 36/40); not fixed in the graph, since concept Cards still sit behind 20-43 C++ cards.
2. Trace overload: fixed in 1 of 3 sampled traces (greedy); kahn and quickselect still over budget.
3. Give-aways: mostly fixed; residual in 5 Cards above.
