## err-channel-return-value  (cpp-essentials/topics/basics/12-error-handling/err-channel-return-value.md)
- **confusing**: the blank `return` with hint "a keyword" is ungrammatical ("reports that outcome with return") and the learner would answer `std::optional`, `nullopt` or `bool`; the contrast with `throw` is the only thing it tests. **Fix:** blank the type: "`find_user` returns {{c1::`std::optional<User>`::a library type}}, which is empty when the id is not found." Keep the "next line checks" context.

## graph-union-find-union-code  (interview-essentials/topics/algo/08-graphs/union-find-union-code.md)
- **weak**: distractors `a < b` and `false` behave identically in the harness (`a` is never less than root 0), and the back calls `a < b` "one fixed side", which is wrong in general. **Fix:** replace `a < b` with `rank[a] <= rank[b]` (swaps on ties; fails the depth check) or reword the back to "(`false`, `a < b`) ignore rank".

## graph-bfs-distance-code  (interview-essentials/topics/algo/08-graphs/bfs-distance-code.md)
- **weak**: `u + 1` is a strawman (vertex name vs distance); no learner who got this far believes it. **Fix:** replace with `dist[u] - 1` is also silly; better `dist[s] + 1` (distance from the source, plausibly confused with "one edge from s"), which gives 1 everywhere and fails the static_assert.

## rq-fenwick-code  (interview-essentials/topics/leetcode/11-ranges/rq-fenwick-code.md)
- **weak**: front says `prefix` "clears the lowest set bit" right beside a blank whose answer is the lowest set bit; the contrast nearly hands over the answer. **Fix:** drop "by clearing the lowest set bit" from the front, or say "prefix walks down the blocks to the left".

## err-channel-assert-bug  (cpp-essentials/topics/basics/12-error-handling/err-channel-assert-bug.md)
- **weak**: hint "a macro" only labels the token; no consequence is taught (the bug it should catch, vanishing under NDEBUG is only in `requires`). **Fix:** add a back line: "`assert` checks bugs in debug builds; it is not for errors that can happen in a correct program." Add an `elaborate`.

## life-destructor-intro  (cpp-essentials/topics/basics/06-object-lifetime/life-destructor-intro.md)
- **weak**: back packs three ideas (name, when, purpose) and no concrete example of the bug without it. **Fix:** keep the when-answer; move purpose to a follow-up Card or add a 3-line `Logger` that closes a file in `~Logger`.

## smart-pointers-shared-ptr-deleter-captured  (cpp-essentials/topics/core/03-library/smart-pointers-and-ownership/shared-ptr-deleter-captured.md)
- **weak**: the back adds a second idea (`unique_ptr<Base>` is UB) on top of the shared_ptr answer; the prompt is also missing `#include <memory>`/`<cstdio>` but that is acceptable. **Fix:** cut the unique_ptr sentence into its own contrast Card, or into `elaborate`. Output (`~Derived`, `~Base`) is correct.

Verified by scripts/check-code (0 problems; references pass, distractors fail): graph-bfs-distance-code, graph-union-find-union-code, gr-01-bfs-code, bt-permutations-parsons, dp-memo-robber-code, dp-word-break-code, bit-mask-enumerate-code, rq-fenwick-code. Checked numbers: 4.4 million calls for 30 houses (computed 4,356,617, ok). All `requires` resolve to Cards inside the two Decks. No problem-number leaning found; LC numbers are handles only and each problem is stated.

Reviewed 13 cards: 0 wrong, 1 confusing, 5 weak; OK: 7.

## Applied
- err-channel-return-value: fixed, with a different fix. Blanking `std::optional<User>` would make this a near-duplicate of vocab-optional-maybe-value (same `find_user` front) and would drop the channel contrast with err-pick-a-channel. Now: "reports that outcome through its {{c1::return value::a channel}}", plus a short back explaining why it is a return value and not `throw`.
- graph-union-find-union-code: fixed the back only. The suggested `rank[a] <= rank[b]` is also correct (swapping on a tie is still union by rank, depth 1), so it cannot be a distractor. The back now says "`false`, or `a < b`, which compares vertex names, not heights" ignore rank.
- graph-bfs-distance-code: fixed. `u + 1` is replaced by `dist[s] + 1` (gives every vertex 1, which check-code confirms fails), and the back is updated.
- rq-fenwick-code: fixed. The front now says "`prefix` walks down through the blocks to the left".
- err-channel-assert-bug: fixed. Added a back (debug-only check for bugs, gone under NDEBUG, use another channel for failures a correct program can hit) and an `elaborate`.
- life-destructor-intro: fixed. The back keeps the when-answer, adds the concrete case (a local `Logger log;` ends at its scope's closing `}`) and drops the purpose sentence, which life-destructor-frees teaches.
- smart-pointers-shared-ptr-deleter-captured: fixed. The unique_ptr sentence moved into `elaborate`. Output `~Derived`, `~Base` confirmed with g++ 16.2.
