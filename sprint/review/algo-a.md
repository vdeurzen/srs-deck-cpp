# algo-a review: interview-essentials/topics/algo 01-complexity .. 05-trees

All 6 trace cards (and probe values of array-insert-shift, space-stack-depth, halving-inner-loop, lo-equals-mid-trace, bst-inorder-trace) were re-verified by running; all expected values are correct. lint-shape: 0 flagged.

## tree-avl-vs-red-black  (05-trees/avl-vs-red-black.md)
- **wrong**: Bold answer says looser balance means less repair "per insert and delete". An AVL insert needs at most one (single or double) rotation, red-black up to two plus recolouring, so the insert half is false. Only deletes differ (RB at most 3 rotations, AVL up to O(log n)). **Fix:** "Looser balance means cheaper deletes: a red-black delete needs at most 3 rotations, an AVL delete can rotate at every level." Drop "insert" from the bold line and the question's implied insert claim.

## linear-cost-table  (02-linear/cost-table.md)
- **confusing**: Blank "O(i)" is not the only defensible answer; the back itself admits O(n) is "a true bound too". The hint "a growth class" is empty. A learner answering O(n) argues. **Fix:** ask "exactly how many `next` hops does reaching index i take?" with blank `i`, or rephrase "as a function of i, reading index i costs O(___)".

## search-first-true-predicate  (04-searching/first-true-predicate.md)
- **confusing**: The front uses `std::partition_point` without saying what it returns; it is defined only on the back, so the blank cannot be reasoned out. "Every binary search finds the boundary" is also overstated (exact-match search is not one). **Fix:** add to the front "`partition_point(first, last, p)` returns the first element where `p` is false, in a range of the form true…true false…false"; say "Lower-bound-style searches".

## tree-traversal-orders  (05-trees/traversal-orders.md)
- **confusing**: Blank c1 asks for the preorder sequence, but preorder is never defined on the front (only on the back); the front defines only inorder, which is trivially guessable from its name. **Fix:** state "Preorder visits the node before both subtrees, postorder after" on the front, then blank the inorder position (c2) and the inorder sequence `1 3 5 7 9` (c1).

## linear-dynamic-array-growth  (02-linear/dynamic-array-growth.md)
- **confusing**: Answer rests on "amortised O(1)", which the card does not define; `requires` is only array-index-contiguity, so a learner may not have met complexity-amortised-vs-average. **Fix:** add `complexity-amortised-vs-average` to `requires`, or say "average cost per push stays constant" in place of "amortised O(1)".

## linear-two-pointers-code  (02-linear/two-pointers-code.md)
- **confusing**: Code card has no `requires`; it can be scheduled before the idea it exercises (why the smaller end can be discarded). **Fix:** add `requires: [linear-two-pointers-sorted-pair]`. Ref is the 3SUM page; use the two-sum/two-pointer technique page instead.

## tree-bst-delete-cases  (05-trees/bst-delete-cases.md)
- **confusing**: c2 "no left child" competes with "at most one child" / "no more than one child". c1 would equally accept "in-order predecessor" if 60 were absent. There is no back section, so nothing says why the successor preserves order. **Fix:** c2 prompt "…because it has no ___ child"; add a back: "The successor is the next key in sorted order, so copying it up keeps every left key smaller and right key larger; deleting it is the one-child case".

## complexity-shrink-by-one-vs-half  (01-complexity/shrink-by-one-vs-half.md)
- **weak**: Back says "the master theorem covers only the dividing kind", a term this card neither requires nor defines. **Fix:** delete that sentence or replace with "T(n−1) shrinks too slowly for the recursion-tree level argument; T(n/2) halves the work each level".

## complexity-feasible-n  (01-complexity/feasible-n.md)
- **weak**: c2 "26" is brittle: 25, 27 or "about 27" are defensible (2^27 = 1.3·10⁸ is barely over). Also pure lookup of a rule-of-thumb. **Fix:** blank "roughly {{c2::25 to 27}}" or ask for "n around 20-30"; keep the ladder comparison as the point.

## linear-queue-ring  (02-linear/queue-ring.md)
- **weak**: The front asks about "a ring buffer" but never says what one is; the answer is a description of the thing the learner is supposed to name. **Fix:** "A fixed-size array used as a circular queue: what does pop do instead of shifting?" and name it on the back.

## linear-variable-window-shrink  (02-linear/variable-window-shrink.md)
- **weak**: Two ideas: why `lo` is dropped, and the O(n) two-monotone-pointers consequence. "Restarting the search" is vague. **Fix:** keep the front as is, cut the O(n) sentence to one line, and add a separate card (or an elaborate) for "each index enters and leaves once".

## linear-prefix-sum-range  (02-linear/prefix-sum-range.md)
- **weak**: Gives the whole recurrence in the code comment and `a[2..5)` notation without saying half-open; recognition ("many range-sum queries on a fixed array") is missing. **Fix:** write "elements at indices 2, 3, 4" and open the front with "1000 range-sum queries on a fixed array".

## hashing-chaining  (03-hashing/chaining.md)
- **weak**: "this table never stores a key outside its own bucket" gives the answer away; nothing is retrieved. **Fix:** "…puts key 12 in bucket 2. Each bucket holds a list. Key 7 also maps to 2: what happens to the lookup cost for 12 and 7?" or drop the sentence and name "chaining" as the recalled term.

## hashing-equal-keys-equal-hashes  (03-hashing/equal-keys-equal-hashes.md)
- **weak**: Near-duplicate of hashing-contract-direction, whose back already states the same reverse case. `lower()` is undefined in the snippet, and `false` is not guaranteed (hashes may land in the same bucket by chance; it is false here only because 13 buckets separate them). **Fix:** tag misconception with an elaborate, say "usually false", declare `lower`'s signature, or merge into contract-direction.

## hashing-probe-lookup-stop  (03-hashing/probe-lookup-stop.md)
- **weak**: Back says "`i < N` never fails once `i` wraps"; `i` is always < N, so it never fails at all. **Fix:** "`i < N` is always true because `i` is wrapped, so a missing key loops forever."

## search-binary-search-chunk  (04-searching/binary-search-chunk.md)
- **weak**: 8 lines (limit 7) and the back spends a paragraph on how the app grades it (`compile: null`, "harness appended"), which the learner cannot use. **Fix:** drop the grading note; move `return -1;` into the explanation or merge the init line to get 7 lines.

## search-closed-range-invariant  (04-searching/closed-range-invariant.md)
- **weak**: Blank c1 is a 7-word phrase with markup, hard to recall exactly and to self-grade; c1 and c2 are two different ideas. **Fix:** blank only `a[lo..hi]` (hint "inclusive or exclusive?"); make the "everything in a[0..mid] is smaller" a second card.

## tree-bst-property  (05-trees/bst-property.md)
- **weak**: Near-duplicate of tree-bst-rule (same invariant, "whole subtree"). The example never exercises it: at root 8 "right of 8" is just 9. **Fix:** use a tree where the ignored right side has several nodes (e.g. searching 3 at root 8 with right subtree 9, 12, 15) and ask which comparison skips the whole region.

## tree-bst-rule  (05-trees/bst-rule.md)
- **weak**: "Strictly between" assumes distinct keys, never stated; a candidate may argue duplicates. **Fix:** "In a BST with distinct keys, …".

## tree-bst-check-bounds  (05-trees/bst-check-bounds.md)
- **weak**: The left call `is_bst(t, left, lo, k)` is shown, so the right call `k, hi` is answerable by mirroring, without the ancestor-bound insight. **Fix:** blank the left call as well, or make the chips pairs for both calls; the comment "strictly between lo and hi" also hands over the invariant.

## tree-level-order-code  (05-trees/level-order-code.md)
- **weak**: Back mentions "the order in which a heap stores a tree in an array"; heap is not in `requires`. Also keys equal index order, so the harness would pass any index-order walk. **Fix:** delete the heap sentence; change the key array to non-monotone values (e.g. {8, 4, 9, 6, 2, 5} with matching child indices).

## search-on-answer-monotone  (04-searching/on-answer-monotone.md)
- **weak**: Problem not fully stated: weights, "in order", the per-day capacity rule. **Fix:** "Shipping Packages (LC 1011): packages with given weights ship in order, each day's load ≤ capacity; find the smallest capacity that finishes in 5 days." Add the URL to refs.

Reviewed 63 cards: 1 wrong, 6 confusing, 15 weak; OK: 41.

## Applied
- tree-avl-vs-red-black: fixed. Bold line now credits cheaper deletes only (≤ 3 rotations against one per level); inserts called about equal (AVL ≤ 1 single/double, RB ≤ 2).
- linear-cost-table: fixed. Blank is now the exact hop count `i`; the back derives O(i), and O(n) for the last element.
- search-first-true-predicate: fixed. The front now defines what `partition_point` returns; "Every binary search" changed to "Lower-bound-style searches".
- tree-traversal-orders: fixed differently. The front defines all three orders, and the blanks ask for the preorder (c1) and postorder (c2) sequences. Blanking inorder would stay guessable from its name, and bst-inorder-trace already covers the inorder sequence.
- linear-dynamic-array-growth: fixed. Added requires complexity-amortised-vs-average (fan-in 2, depth unchanged).
- linear-two-pointers-code: fixed. Added requires linear-two-pointers-sorted-pair; ref changed to the LeetCode Two Sum II URL.
- tree-bst-delete-cases: fixed. The c2 blank is now the side only ("no ___ child"); added a back saying why the successor keeps the order and why removing it is the easy case.
- complexity-shrink-by-one-vs-half: fixed. Removed the master-theorem clause.
- complexity-feasible-n: fixed. c2 is now "25 to 27".
- linear-queue-ring: fixed. The front describes a circular fixed-size array, and the back names it a ring buffer.
- linear-variable-window-shrink: fixed. Removed "restarting the search" and cut the O(n) point to one clause. No new Card: the O(n) consequence is a by-product here.
- linear-prefix-sum-range: fixed. Opens with 1000 queries on a fixed array, asks for indices 2, 3 and 4, and the comment defines `p[i]` instead of giving the recurrence.
- hashing-chaining: fixed. Each bucket now holds a list, and the front asks what the lookup does after meeting 12. That is recall of the chain walk, and the term is named on the back.
- hashing-equal-keys-equal-hashes: fixed. Declared `lower`. The comment now reads "false with GCC 16: buckets 4 and 11 of 13" (verified by running in /tmp/fix-algo-a). The back says breaking the rule is UB and gives the fix (hash `lower(s)`) in place of repeating contract-direction. Added an elaborate. Not tagged misconception, because the front states no belief.
- hashing-probe-lookup-stop: fixed. The `i < N` sentence is corrected.
- search-binary-search-chunk: fixed. The snippet is now 7 lines (`return -1` moved into the explanation). Kept a one-line grading note, because FORMAT.md's chunk guide asks `compile: null` Cards to say why.
- search-closed-range-invariant: fixed. c1 now blanks only "included" (hint "inclusive or exclusive?"). c2 kept: it is a separate cloze Item already.
- tree-bst-property: fixed. The tree now has 12, 9 and 15 on the right, and the search is for 3.
- tree-bst-rule: fixed. Added "with distinct keys".
- tree-bst-check-bounds: fixed. Both recursive calls are now blanks (c1 `lo, k`, c2 `k, hi`), and a `bad_left` tree was added so every distractor of each blank fails.
- tree-level-order-code: fixed. Nodes are numbered out of level order, and the heap sentence is gone.
- search-on-answer-monotone: fixed. The problem is fully stated, and the LC 1011 URL is in refs.
