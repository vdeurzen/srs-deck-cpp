# leetcode-a review (00-stl, 01-arrays, 02-search, 03-stacks, 05-lists, 06-trees)

Trace values (arr-3sum-inner-skip-trace, arr-window-trace, mono-histogram-trace) re-derived by hand and match. Local `scripts/check-code`: no FAIL/WEAK; 2 LOOSE in scope (below). Rule 13: every problem is named and stated except where listed.

## stl-substr-quadratic  (interview-essentials/topics/leetcode/00-stl/stl-substr-quadratic.md)
- **wrong**: "the habit that TLEs at 10^5 (2.5 x 10^9)" is false. I timed this exact `split` at -O2: n = 10^4 takes 0.5 ms, n = 10^5 takes 39 ms. 2.5e9 is bytes at memcpy speed, not operations. **Fix:** "harmless at this problem's 10^4 (about 2.5e7 bytes copied); at 10^6 it is 2.5e11 bytes, seconds. Same loop, wrong complexity class." Keep O(n^2).

## mono-histogram-bounds  (interview-essentials/topics/leetcode/03-stacks/mono-histogram-bounds.md)
- **confusing**: front pops when `i` is "lower" and the stack "rises"; back says `i` is the first lower bar and `left` the last lower. The sibling trace card pops on `>=`, so equal bars do pop and `i` is the first lower-or-equal bar. Strict `<` would leave an equal bar as `left`. The learner can't tell which rule to hold. **Fix:** front "Bar `i` is no taller than the top bar `b`, so `b` is popped (stack strictly rising)"; back "`i` the first bar no taller than `b`, `left` the last shorter bar".

## list-reverse-parsons  (interview-essentials/topics/leetcode/05-lists/list-reverse-parsons.md)
- **confusing**: back and elaborate say a non-null `prev` is "the splice that LC 92 and LC 25 need". The loop is `while (cur)`, so it always runs to the end of the list. A bounded range needs a count or a cut, which the card never shows. The elaborate ("which node do you pass as prev") has no clean answer from this template. **Fix:** drop the claim, or have the elaborate say "what loop condition replaces `while (cur)` to reverse exactly `k` nodes?".
- **weak**: the `prev = nullptr` default parameter exists only for the harness. A candidate writes `ListNode *prev = nullptr, *cur = head;` locally, so the rehearsed signature is not what they will type. check-code also reports LOOSE: both distractors pass when inserted as dead code after `return prev;`. **Fix:** make `prev` a local (`reverse(Node* head)`), move the `onto` test to a separate helper, and keep the distractors.

## stl-accumulate-overflow  (interview-essentials/topics/leetcode/00-stl/stl-accumulate-overflow.md)
- **confusing**: back opens "as in `stdalgo-accumulate-init`", a card id the learner can't see. Violates rule 13. **Fix:** "the initial value's type is the sum's type: `accumulate` adds in the type of `init`."

## list-fast-slow-parsons  (interview-essentials/topics/leetcode/05-lists/list-fast-slow-parsons.md)
- **weak**: tags and refs claim LC 142 (Linked List Cycle II, where the cycle starts), a staple interview follow-up, but no Card teaches phase 2. The deck's only list-cycle coverage is the boolean. **Fix:** add a card: after the meeting point, reset one pointer to `head`, then step both by 1 until they meet. Drop the unused lc-142 tag until then.
- **weak**: `const Node*` template header is harness scaffolding; LC has `ListNode*`. Same pattern as `tree-lca-chunk`. **Fix:** see tree-lca-chunk.

## tree-inorder-iterative-parsons  (interview-essentials/topics/leetcode/06-trees/tree-inorder-iterative-parsons.md)
- **weak**: signature `inorder(Node* cur, auto& out, auto st)` passes the stack in; a candidate declares `std::stack<TreeNode*> st` and `vector<int> out` locally. The learner rehearses a shape they will never write. **Fix:** harness-side wrapper that calls a local-stack version, or state "on LC, `st` and `out` are locals declared first" in the back.

## tree-lca-chunk  (interview-essentials/topics/leetcode/06-trees/tree-lca-chunk.md)
- **weak**: the learner must memorise `template <class Node> constexpr Node* lca(...)`; the back admits LC needs `TreeNode*`. Extra load, and the problem statement ("p and q are nodes in the tree; return their lowest common ancestor") is only implied. **Fix:** one-line statement on the back; if the harness allows, a forward-declared `struct TreeNode;` so the chunk can use `TreeNode*`.

## tree-lca-bst  (interview-essentials/topics/leetcode/06-trees/tree-lca-bst.md)
- **weak**: "lowest common ancestor" is never defined (deepest node with both as descendants, a node counting as its own). The rule also assumes `p < q`. Elaborate (LC 1650, parent pointers) points to the two-list-intersection trick, which no Card in scope teaches. **Fix:** define LCA in the first sentence; back "values in `[min(p,q), max(p,q)]`"; add a list-intersection card or change the elaborate.

## arr-intervals-merge-chunk  (interview-essentials/topics/leetcode/01-arrays/arr-intervals-merge-chunk.md)
- **weak**: Merge Intervals is named (LC 56) but never stated: nothing says "merge all overlapping intervals". **Fix:** open the back with "Merge Intervals (LC 56): given intervals `[start, end]`, merge all that overlap and return the disjoint result".

## bs-first-true-chunk  (interview-essentials/topics/leetcode/02-search/bs-first-true-chunk.md)
- **weak**: Koko's statement omits how hours are counted: each hour she eats from one pile only, so a pile takes ceil(p/v) hours. The back gives `ok(v)` only as "finishes within h hours". A candidate who doesn't know the problem can't write `ok`. **Fix:** add "a pile of `p` bananas takes ceil(p / v) hours; she can't switch piles mid-hour".

## stl-pair-key-hash  (interview-essentials/topics/leetcode/00-stl/stl-pair-key-hash.md)
- **weak**: `SlopeHash` is the only user-defined name above the blank, so it can be picked without knowing the rule. **Fix:** make the question the recognition: hide the struct (show only "hasher struct `SlopeHash` defined above") or add a second hasher name as a chip distractor (`PairHash`).

## arr-prefix-hash-parsons  (interview-essentials/topics/leetcode/01-arrays/arr-prefix-hash-parsons.md)
- **weak**: the order taught (record `++seen[p]` first, then `p += x`, then look up) is not the editorial one (seed `seen[0] = 1`, then `p += x; n += seen[p-k]; ++seen[p]`) a candidate will recall under pressure; the back admits this. check-code LOOSE: both distractors pass as dead code after `return n;`. **Fix:** use the seeded form with `++seen[p]` last (distractor `seen[0] = 1` placed late fails the empty-prefix case), or make the unusual order the explicit point.

## arr-kadane-signal  (interview-essentials/topics/leetcode/01-arrays/arr-kadane-signal.md)
- **weak**: the back says Maximum Subarray (LC 53) "forbids" the empty subarray without stating the problem. **Fix:** "Maximum Subarray (LC 53: largest sum of a non-empty contiguous subarray)".

## Batch
Reviewed 39 cards: 1 wrong, 3 confusing, 9 weak; OK: 26.

- Coverage gaps for a 2-week interview sprint: lists have two Cards (no merge sorted lists / dummy head, remove nth from end, cycle start); trees have no BFS level-order, height/diameter or path-sum recursion; search has one Card (no rotated-array search).
- Several template Cards rehearse harness-only scaffolding (`template <class Node>`, default `prev`, `auto st` parameter) instead of the LC signature.
- Statements are present and no pattern is leaked by them. The signal Cards state the problem without naming the pattern.

Reviewed 39 cards: 1 wrong, 3 confusing, 9 weak; OK: 26.

## Applied
- stl-substr-quadratic: fixed. Re-timed at -O2 (GCC 16.2): 10^4 0.9 ms, 10^5 39 ms, 10^6 4.5 s; back now gives 2.5e7 chars at 10^4 and 2.5e11 at 10^6.
- mono-histogram-bounds: fixed. Front "no taller", stack "strictly rising"; back "first bar no taller / nearest shorter". Trimmed to 56 words.
- list-reverse-parsons: fixed. `reverse(Node* head)` with local `Node *prev = nullptr, *cur = head;`, onto test and splice claim dropped, elaborate now asks what replaces `while (cur)`. LOOSE left: both distractors pass only as dead code after `return prev;`. Closing it means fusing `}` onto the return line, or a for-scoped `cur` (10 lines, over the 9 limit). Neither is clean.
- stl-accumulate-overflow: fixed. Card-id reference removed.
- list-fast-slow-parsons: lc-142 tag dropped; `const Node*` -> `Node*`, back says to write `ListNode*` on LC. Cycle-start Card not added: a coverage gap, not a missing prerequisite.
- tree-inorder-iterative-parsons: fixed. Back says `st` and `out` are locals on LC. Making them locals would need 10 lines, and `std::stack` is not constexpr.
- tree-lca-chunk: fixed. One-line statement added. Kept the template, because a forward-declared `TreeNode` can't be dereferenced in a non-template body.
- tree-lca-bst: fixed. LCA defined in the front, back says `[min(p,q), max(p,q)]`, elaborate rephrased so the answer can be derived (the two root paths are lists).
- arr-intervals-merge-chunk: fixed. Statement opens the back.
- bs-first-true-chunk: fixed. ceil(p/v) hours per pile, one pile per hour.
- stl-pair-key-hash: fixed. The hasher is now a lambda `slope_hash`, with chips `decltype(slope_hash)` / `slope_hash` / `std::hash<Slope>` / `std::less<Slope>`, so the visible name no longer gives the answer.
- arr-prefix-hash-parsons: fixed. Uses the editorial seeded form (`seen[0] = 1`, then `p += x; n += seen[p-k]; ++seen[p]`). Distractors are now `++seen[x]` and `n += seen[k - p]`; the harness's lookup and zero counts were updated. LOOSE remains for `k - p` placed as dead code after `return n;`.
- arr-kadane-signal: fixed. LC 53 is now stated.
