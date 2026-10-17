# algo-b review (06-heaps, 07-sorting, 08-graphs, 09-techniques)

lint-shape: 0 flagged; check-code: no problems in scope. Trace values and numbers re-derived by hand (all correct).

## sort-merge-space  (interview-essentials/topics/algo/07-sorting/merge-space.md)
- **wrong**: "A linear-time merge cannot write in place" is false as an absolute: in-place linear merges exist (complex), and std::inplace_merge works without a buffer at higher cost. Also "up to n elements": copying only the left run needs n/2. **Fix:** front "Why does the simple two-pointer merge on an array need a Θ(n) buffer?"; bold "Writing output in place would overwrite left-run elements not yet read."; drop "up to n", say "copy one run out (n/2)".

## sort-pivot-choice  (interview-essentials/topics/algo/07-sorting/pivot-choice.md)
- **confusing**: median-of-medians / introselect also leaves no slow input (worst case O(n log n)), so "random" is not the only defensible answer. **Fix:** "Which cheap, O(1)-per-partition pivot rule leaves no fixed input that is reliably slow?"

## sort-merge-idea  (interview-essentials/topics/algo/07-sorting/merge-idea.md)
- **confusing**: Merge sort with a "skip merge if a[mid] <= a[mid+1]" check, or natural/Tim merge sort, is O(n) on sorted input; "always" is false for those. **Fix:** front "A plain top-down merge sort (always splits in half, always merges) runs on an already-sorted array of 8..."

## graph-bellman-ford-rounds  (interview-essentials/topics/algo/08-graphs/bellman-ford-rounds.md)
- **confusing**: Front says negative edges allowed and V-1 rounds suffice, but with a negative cycle they do not (only in back). "Relaxes" is never defined in the sprint. **Fix:** front "...with no negative cycle..."; define: "relax edge (u,v,w): if dist[u]+w < dist[v], set dist[v] = dist[u]+w".

## graph-dijkstra-popped-final  (interview-essentials/topics/algo/08-graphs/dijkstra-popped-final.md)
- **confusing**: "tentative distance" and the Dijkstra loop are never taught anywhere in the sprint's algo topics. A learner has only the front's one-line description. **Fix:** add one sentence to front: "tentative = best distance found so far via finished vertices"; consider a Dijkstra loop chunk/basic (pop min, skip stale, relax) before this.

## graph-cycle-directed-grey  (interview-essentials/topics/algo/08-graphs/cycle-directed-grey.md)
- **weak**: "grey/black" colours appear first in the answer; the front's answer is really "on the current recursion path". **Fix:** front "...What must the second visit find to mean 'cycle'?" keep, but bold answer first as "d is on the current DFS path (started, not finished = 'grey')"; define white/grey/black in the back.

## graph-explain-visited-linear  (interview-essentials/topics/algo/08-graphs/explain-visited-linear.md)
- **weak**: Items 3 and 4 overlap (4 is the sum of 3 plus V); item 2 packs two claims (once processed; once queued). **Fix:** item 2 only "each vertex processed once"; item 3 "set on push, a vertex enters the queue once"; item 4 "V vertex visits + 2E edge scans (undirected) = O(V+E)".

## graph-bfs-mark-on-push  (interview-essentials/topics/algo/08-graphs/bfs-mark-on-push.md)
- **weak**: "pay in memory and time": time stays O(V+E); only memory grows to O(E). **Fix:** say "memory"; drop "and time".

## technique-lcs-match  (interview-essentials/topics/algo/09-techniques/lcs-match.md)
- **weak**: "subsequence" is undefined (vs substring); requires coin-change-table is not a real prerequisite (needs a 2-D table idea, not coins). **Fix:** add "(characters in order, not necessarily adjacent; ABCBDAB, BDCABA share BCBA)"; require technique-dp-state.

## technique-dp-state  (interview-essentials/topics/algo/09-techniques/dp-state.md)
- **weak**: requires dp-optimal-substructure, but this is counting, not optimising; "2 * dp[i-1] counts ... as if every step could be both" is vague. **Fix:** require dp-overlapping-subproblems; explain `2*dp[i-1]` as "assumes both last moves reach i-1 ways each".

## technique-exchange-argument  (interview-essentials/topics/algo/09-techniques/exchange-argument.md)
- **weak**: Both blanks are free phrases ("no earlier than g", "the same number of talks"); many equivalent wordings, and the hint "compare the end times" nearly gives c1. **Fix:** make c1 a single token via wording "ends {{at or after}} g's end" or turn into a code/basic card; drop the hint.

## technique-dp-optimal-substructure  (interview-essentials/topics/algo/09-techniques/dp-optimal-substructure.md)
- **weak**: Back adds a second idea (full recurrence) and Bellman history; c2 is name recall. **Fix:** cut the recurrence and history from the back to <=40 words; keep the 11 -> 5 example.

## technique-recursion-depth  (interview-essentials/topics/algo/09-techniques/recursion-depth.md)
- **weak**: `Node` is not defined on the card. **Fix:** add `struct Node { int v; Node* next; };` above the function.

## sort-compare-properties  (interview-essentials/topics/algo/07-sorting/compare-properties.md)
- **weak**: Three blanks over three algorithms is a table lookup (one idea each). The "no" for heap sort is guessable from the table pattern. **Fix:** split into cloze cards for quicksort stack space and counting sort; keep heap sort's instability as a basic with the equal-key counter-example.

## heap-shape-and-order  (interview-essentials/topics/algo/06-heaps/shape-and-order.md)
- **weak**: c2 is a long free phrase ("at least as large as its children") with many equivalent wordings. **Fix:** shorten blank to "at least" / ">=" with surrounding text "every parent is {{c2::>=}} each of its children".

## heap-heapify-linear  (interview-essentials/topics/algo/06-heaps/heapify-linear.md)
- **weak**: more-or-fewer is a 50 % guess, and the tree height is not stated as a reason. **Fix:** ask "Roughly how many swaps at most does bottom-up heapify make for these 1023 keys: about 1000 or about 8000, and why?" or ask for the deciding property directly.

## sort-heap-sort  (interview-essentials/topics/algo/07-sorting/heap-sort.md)
- **weak**: Two ideas (time and space) in one question. **Fix:** ask only time ("why O(n log n) worst case"); put in-place into compare-properties.

## technique-greedy-vs-dp  (interview-essentials/topics/algo/09-techniques/greedy-vs-dp.md)
- **weak**: Third coin counter-example ({5,4,1}) beside {4,3,1} and {6,5,1} in sibling cards: same idea, three examples. **Fix:** reuse {4,3,1} here so the contrast pair shares one example.

## sort-merge-stable-code  (interview-essentials/topics/algo/07-sorting/merge-stable-code.md)
- **weak**: requires sort-merge-space is not needed; the real prerequisite is sort-merge-idea. **Fix:** requires: sort-merge-idea, sort-stable-meaning.

## graph-union-find-forest  (interview-essentials/topics/algo/08-graphs/union-find-forest.md)
- **weak**: elaborate relies on Kruskal's algorithm, not in the sprint. **Fix:** "How would you use this to detect that adding an edge closes a cycle?"

Reviewed 66 cards: 1 wrong, 4 confusing, 15 weak; OK: 46.

## Applied
- sort-merge-space: fixed (front "simple two-pointer merge"; bold restated; "n/2", note that buffer-free `std::inplace_merge` is O(n log n)).
- sort-pivot-choice: fixed (front "cheap, O(1)-per-partition ... no fixed input"; back notes median-of-medians is safe at linear cost per pivot).
- sort-merge-idea: fixed (front "plain top-down merge sort (always splits in half, always merges)").
- graph-bellman-ford-rounds: fixed (relax defined inline; "with negative edges but no negative cycle" in the front).
- graph-dijkstra-popped-final: fixed (tentative defined in the front). No new loop Card: leetcode gr-dijkstra-heap-parsons already drills the loop and requires this Card.
- graph-cycle-directed-grey: fixed (bold leads with "on the current DFS path"; white/grey/black defined in the back).
- graph-explain-visited-linear: fixed (5 distinct items: processed once / queued once / V + 2E with lists / matrix V²).
- graph-bfs-mark-on-push: fixed ("memory (time stays O(V + E))").
- technique-lcs-match: fixed (subsequence defined with ABCBDAB/BDCABA → BCBA; requires technique-dp-state instead of coin-change-table).
- technique-dp-state: fixed (requires dp-overlapping-subproblems; `2 * dp[i - 1]` explained as "both last moves start from i − 1").
- technique-exchange-argument: fixed (c1 is now the single token `≤` in "end(g) ≤ end(o)"; c2 is `overlap`; hint dropped).
- technique-dp-optimal-substructure: fixed (recurrence and Bellman history cut; back is 30 words with a longest-simple-path counter-example).
- technique-recursion-depth: fixed (`struct Node` added).
- sort-compare-properties: partly fixed: added a concrete heap-sort instability example, (1,a)(1,b)(2,c)(1,d) → (1,b) before (1,a); checked against a textbook heap sort and GCC 16.2 std::sort_heap. Did not split it: the 3 blanks are within the cloze limit and are scheduled on their own, and the table pattern does not give away heap sort's "no".
- heap-shape-and-order: fixed (c2 is `≥`).
- heap-heapify-linear: fixed (front gives both numbers and asks for the deciding property; 8194 and 1013 recomputed).
- sort-heap-sort: fixed (asks about time only; in-place stays in compare-properties' table).
- technique-greedy-vs-dp: fixed (now {4, 3, 1}, amount 6; dp[6] = 1 + min(2, 1, 2) = 2).
- sort-merge-stable-code: fixed (requires sort-merge-idea, sort-stable-meaning).
- graph-union-find-forest: fixed (elaborate no longer leans on Kruskal).
