# leetcode-b review (07-graphs, 08-backtracking, 09-dp, 10-bits, 11-ranges, 12-recognition)

Method: read every Card as its `requires` chain allows; all requires resolve; `scripts/check-code` on the 12 compile-graded Cards in scope: 0 problems (1 LOOSE on gr-dijkstra-heap-parsons: both distractors also pass as extra dead lines). Checked by running: coin-ways overflow claim (peak cell 3.2e18, answer 0: true), coin-loop-order = 3 (true), kahn reversed order {3,1,2,0} (true), `m & 1 << v == 0` parse (true). No Card teaches something false.

## rec-explain-windows  (interview-essentials/topics/leetcode/12-recognition/rec-explain-windows.md)
- **confusing**: Rubric has 4 items; a rubric is exactly 5. Item (3) also packs two claims (why not a window; why prefixes work). **Fix:** add "(5) Many queries for the sum of `nums[l..r]` on an unchanging array" with item "prefix-sum array, because sum = P[r+1] − P[l] in O(1) after one O(n) pass"; keep (3) to one claim.

## rec-explain-dp  (.../12-recognition/rec-explain-dp.md)
- **confusing**: (3) "longest strictly increasing subsequence" has two valid states (patience tails `t[k]`, or O(n²) `dp[i]`); rubric accepts only the second. (2) "ways to pay" does not say order is ignored; ordered ways would need a different loop. **Fix:** "(3) ... (state of the O(n²) DP)"; "(2) the number of combinations (order ignored)".

## dp-edit-distance-not-lcs  (.../09-dp/dp-edit-distance-not-lcs.md)
- **confusing**: Front uses "LCS" and `m + n − 2·LCS` without expanding it; Delete Operation is the only context. **Fix:** write "longest common subsequence (LCS)" and one clause: "its length".

## rec-list-vs-count  (.../12-recognition/rec-list-vs-count.md)
- **confusing**: "exponentially many" is not accurate: the count of combinations grows partition-like (superpolynomial, subexponential in the target). A careful learner will object. **Fix:** "(a) must output every combination, and the number of them grows faster than any polynomial in n and target."

## rq-segment-signal  (.../11-ranges/rq-segment-signal.md)
- **confusing**: "Which kind of structure makes both O(log n)?" Fenwick (BIT) is also correct and is what an interviewer expects for point-update/range-sum; the answer names only a block tree. **Fix:** answer "segment tree or Fenwick tree: each node holds the sum of one block" and add the Fenwick one-liner (`i += i & -i`) as a follow-up Card.

## bt-subsets-chunk  (.../08-backtracking/bt-subsets-chunk.md)
- **confusing**: Rule 13: the problem is never stated (LC 78 appears only in tags and refs). **Fix:** open the back with "Subsets (LC 78): return every subset of distinct integers `nums`."

## rec-shortest-path-weights  (.../12-recognition/rec-shortest-path-weights.md)
- **confusing**: (b) never says the grid has obstacle cells or 4-direction moves. 0-1 BFS (deque, push_front on cost 0) appears in this answer and in rec-explain-graphs but no Card teaches the mechanism. **Fix:** add "(b) a grid of 0 (empty) and 1 (obstacle), 4-direction moves" and a small 0-1 BFS chunk or code Card.

## gr-kahn-build-code  (.../07-graphs/gr-kahn-build-code.md)
- **weak**: Front sentence "needs the edge in the direction the courses are taken" nearly gives the answer. Back's explanation of the `adj[a].push_back(b); ++indeg[a]` distractor is muddled (it is a→b with out-degree counted). **Fix:** drop that sentence; say "that distractor builds a→b and counts out-degree on `a`, so no vertex starts at 0 correctly".

## gr-multi-source-bfs-code  (.../07-graphs/gr-multi-source-bfs-code.md)
- **weak**: Back says "the off-by-one Rotting Oranges (below) invites": undefined name, and "below" is the elaborate. **Fix:** "the off-by-one 'rotten at minute 1' invites".

## bt-combination-start-index  (.../08-backtracking/bt-combination-start-index.md)
- **weak**: Elaborate asks for the duplicate-skip, which a later Card (bt-dup-skip-code, which requires this one) teaches. **Fix:** ask instead "which of `j`/`j + 1` is Combination Sum II's, and what extra problem does its duplicate input add?" or move the skip question out.

## bt-reuse-signal  (.../08-backtracking/bt-reuse-signal.md)
- **weak**: Near-duplicate of bt-combination-start-index (same fact, cued by the sentence "used once"). **Fix:** make it a contrast: blank both phrases in one statement pair ("unlimited" → `j`, "once" → `j + 1`) as 2 blanks, or cut.

## bt-dup-skip-code  (.../08-backtracking/bt-dup-skip-code.md)
- **weak**: Back says `j >= i` "reads `a[-1]` at j = 0"; its main failure is skipping [2, 2] at `j == i > 0`. **Fix:** "`j >= i` skips even the first choice when it equals the parent's item, so [2, 2] is lost (and reads `a[-1]` at j = 0)".

## dp-bitmask-signal  (.../09-dp/dp-bitmask-signal.md)
- **weak**: Quoted statement omits the input (a connected undirected graph given as adjacency lists). Answer is a pair. **Fix:** prepend "Given an undirected connected graph of `n` nodes (adjacency lists):".

## dp-grid-dag-signal  (.../09-dp/dp-grid-dag-signal.md)
- **weak**: Two questions (property, order); the property is in the quoted statement, so recognition is nil. **Fix:** ask "If moves also allowed up and left, can the same row-major fill work? Why not?" (answer: cycles, so a shortest-path search).

## rec-one-vs-two-sequences  (.../12-recognition/rec-one-vs-two-sequences.md)
- **weak**: Surface cue (`text1`/`text2` vs `nums`) answers it; builds the false rule "two strings means two indices". **Fix:** contrast with Longest Palindromic Subsequence (one string, state is an interval `(i, j)`) so the deciding property is the shape of the subproblem.

## rec-top-k-choice  (.../12-recognition/rec-top-k-choice.md)
- **weak**: Front gives the target complexities O(log k) and O(n), which leak "size-k heap" and "buckets". **Fix:** ask "what lets you beat sorting everything?" and keep the complexities in the back.

## dp-min-path-sum-code  (.../09-dp/dp-min-path-sum-code.md)
- **weak**: The index-shifted wall/way-in rolling row is not what a candidate writes under time pressure, and the front already calls `d[0]` "a wall", so INT_MAX is the only sane chip. **Fix:** use a plain in-place `g[i][j] += min(...)` with explicit first row/column, or keep this and cut "wall" from the prose.

## rec-union-find-vs-dfs  (.../12-recognition/rec-union-find-vs-dfs.md)
- **weak**: LC 684 is accepted by a DFS per edge at n ≤ 1000; "clearly beats" is about the online shape only. Elaborate "what would you have to do?" has several answers. **Fix:** say "fits better"; elaborate: "How could you still use union-find if all deletions were known up front?" (process offline in reverse).

## Batch-level
- Missing templates an interviewer expects: union-find code (find with path compression, union), plain BFS level-order / shortest path, permutations (only in an elaborate), 0/1 knapsack and top-down memo (climbing stairs / house robber), word-break, a bitmask subset loop, Fenwick tree.
- Recognition Cards are strong, but several are guessable from surface cues (rec-one-vs-two-sequences, dp-grid-dag-signal, rec-top-k-choice); hide names or add a counter-example case.
- Several hands-on Cards for one pattern (edit distance: code, signal, misconception) but graphs and ranges have one or two Kinds each.

Reviewed 35 cards: 0 wrong, 8 confusing, 10 weak; OK: 17.

## Applied
- rec-explain-windows: fixed. Added (5) range-sum queries on a fixed array → prefix-sum array (`P[r+1] − P[l]`); (3) now one claim (why not a window); front says "O(n) work (plus O(1) per query)".
- rec-explain-dp: fixed. (2) "combinations (order ignored)"; (3) "(the state of the O(n²) DP)".
- dp-edit-distance-not-lcs: fixed. LCS expanded and defined as the length.
- rec-list-vs-count: fixed. "grows faster than any polynomial", with partition counts p(30) = 5604, p(100) = 190 569 292 (computed); back trimmed to stay ≤ 60 words.
- rq-segment-signal: fixed. Answer names segment tree or Fenwick tree; Fenwick ref added. New follow-up Card rq-fenwick-code (requires rq-segment-signal, foundations-bits-trace).
- bt-subsets-chunk: fixed. Back opens with the Subsets statement (a chunk has no front prose).
- rec-shortest-path-weights: fixed. (b) states the 0/1 grid and 4-direction moves. New Card gr-01-bfs-code (requires rec-shortest-path-weights) teaches the deque mechanism; harness counts expansions so all three distractors fail (verified 9 vs 10/10/11).
- gr-kahn-build-code: fixed. Leaking sentence dropped. The suggested distractor text was inaccurate (`a → b` with `++indeg[a]` seeds correctly, then decrements prerequisites instead of dependents; verified by running); both source-counting chips now explained separately.
- gr-multi-source-bfs-code: fixed as suggested.
- bt-combination-start-index: fixed. Elaborate asks which index Combination Sum II needs and what its duplicates add.
- bt-reuse-signal: fixed, re-angled. A two-blank contrast would leak one blank into the other, so it is now a 3-way contrast with one blank: unlimited → `j`, once → `j + 1` shown, ordered sequences → `{{c1::0}}`. Elaborate on Permutations.
- bt-dup-skip-code: fixed as suggested.
- dp-bitmask-signal: fixed as suggested.
- dp-grid-dag-signal: fixed. The recurrence is given; it asks whether any fill order works with up/left moves. New elaborate (down/right/up-right → column order).
- rec-one-vs-two-sequences: fixed. Added (c) Longest Palindromic Subsequence; answer is the subproblem's shape (two independent bounds), not the number of inputs.
- rec-top-k-choice: fixed. Complexities moved to the back.
- dp-min-path-sum-code: fixed (second option). "wall" removed from the front; the rolling row is kept.
- rec-union-find-vs-dfs: fixed. "fits better"; elaborate asks about offline deletions.
- gr-dijkstra-heap-parsons (LOOSE, caller request): fixed. Harness counts top()/pop() and `dist` subscripts (7/7/20), so both distractors fail as extra lines too; check-code reports 0 loose locally and remotely.
- Batch-level template gaps (union-find code, permutations, knapsack, word-break, etc.): skipped; not a per-Card finding. Fenwick and 0-1 BFS were added above.
