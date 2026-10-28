# Learner pass: cpp-essentials algorithms-and-ranges (55 Cards), 2026-10-28

Simulated cold from each Card's `requires` closure, in graph order. Seconds are my
simulation; "est" is `scripts/estimate-time`. Budgets: basic 30, worked-example 75,
cloze 30/blank, code 45, trace 75, explain 90, stretch 180.

## alg-iter-index (basic): 10s vs budget 30s: Easy
- stuck: none
- unknown: none
- answer: right (1)
- fix idea: none

## srch-partitioned-vocab (basic): 25s vs budget 30s: Good
- stuck: had to test both ranges against `e < 4`; fine
- unknown: none (front defines it)
- answer: right

## srch-lower-bound-insert (basic): 20s vs budget 30s: Good
- stuck: `lower_bound` is not defined on the front or by the closure; I took it from "insert just before `it`" and Go's bisect habit. Unambiguous only because of the insert context.
- unknown: lower_bound -> introduced by this Card's back
- answer: right (the 9), partly guessed
- fix idea: one clause on the front, "lower_bound finds the first element not less than 6"? (cost: gives away the answer, so keep as is but accept it is a guess)

## srch-upper-vs-lower (basic): 20s vs budget 30s: Good
- stuck: `upper_bound` undefined. The `// index 1` comment on lower_bound helped; I guessed "one past the run" = 4. A 3 (last 3) was a live second answer.
- unknown: upper_bound -> not in closure
- answer: right, guessed

## srch-lower-bound-worked (basic, worked): 45s vs budget 75s: Good
- stuck: the step column reads "else keep the middle and the left" in rows 1-2 before the "if" it is the else of ("drop the left half if smaller") first appears in row 3. I had to read ahead. The answer to the question is also visible in the row 1 step text (mild give-away).
- unknown: none
- answer: right
- fix idea: order the step texts "if smaller drop left half, else keep middle and left" or state the rule once above the table

## srch-cost (basic): 20s vs budget 30s: Good
- stuck: none; log2(10^6) is ~20 from 2^10 ~ 1000
- unknown: none
- answer: right

## algmix-count-in-range (basic): 20s vs budget 30s: Good
- stuck: inclusive `[a, b]` made me check upper vs lower twice
- unknown: none
- answer: right

## sel-nth-element-intro (basic): 25s vs budget 30s: Hard
- stuck: `nth_element` is not defined on the front or in the closure. Only the name and `v[2]` hint; I guessed "v[2] becomes what a sort would put there" = 5. Without that guess, 7 (nothing happens) is as plausible.
- unknown: nth_element -> not in closure
- answer: right by guess
- fix idea: add a front clause: "`nth_element(first, nth, last)` rearranges so `*nth` is what a full sort would put there" and ask for `m`... or ask which of three outcomes

## sel-top-three-ordered (basic): 30s vs budget 30s: Again
- stuck: `partial_sort` appears nowhere in the closure. My answer was `std::sort(s.begin(), s.begin() + 3, desc)` after the nth_element, which is correct and cheap, so two answers seemed right and the Card marks mine as wrong in spirit. The back says "without sorting all of s" which `sort` on the first 3 also meets.
- unknown: partial_sort -> not in closure
- answer: wrong: nth_element then sort of the first three
- fix idea: teach partial_sort by name first (a front that shows it), or accept the two-step as the answer and name partial_sort as the one-call form

## algmix-kth-largest (basic): 25s vs budget 30s: Good
- stuck: two correct answers: ascending `nth_element(s.begin(), s.end() - 5, s.end())` and the descending-comparator form from the previous front (`s.begin() + 4, desc`). I gave the second; the back lists only the first.
- unknown: none
- answer: right (alternative form)
- fix idea: back could say "or `begin() + 4` with a `>` comparator"

## sel-cost (basic): 20s vs budget 30s: Good
- stuck: the question nearly answers itself ("sorting nothing"); the "2n" figure was new
- unknown: none
- answer: right in kind, 2n new

## sel-median-code (code, 4 chips): 20s vs budget 45s: Easy
- stuck: none. Chips: only `v.begin() + v.size() / 2` is an iterator of the right place; the `size()/2` chip is eliminated at once. One answer.
- unknown: none
- answer: right

## algmix-explain-kth-largest (explain): 70s vs budget 90s: Good
- stuck: none. Rubric: cue/pattern/example/look-alike taught by algmix-kth-largest and sel-top-three-ordered; complexity "2n vs n log n" by sel-cost. All reached.
- unknown: none
- answer: right; I would have said the descending form for Pattern, which misses "position n - k"

## part-partition-intro (basic): 20s vs budget 30s: Good
- stuck: `partition` is undefined; srch-partitioned-vocab plus the name made "evens first, returns the boundary" a safe guess
- unknown: partition -> only the vocab of "partitioned"
- answer: right

## part-keep-order (basic): 30s vs budget 30s: Hard
- stuck: `stable_partition` is not in the closure. I guessed it from "stable" in other languages (Go's SliceStable), not from a Card.
- unknown: stable_partition / "stable" -> not in closure
- answer: right by transfer from Go
- fix idea: name "stable" on the front ("a stable algorithm keeps ...") or ask "what makes it stable?"; also the constexpr-before-C++26 aside is noise here

## algmix-failed-to-back (basic): 15s vs budget 30s: Good
- stuck: none (erase_if and stable_partition both in closure)
- unknown: none
- answer: right

## srch-lower-bound-trace (trace): 40s vs budget 75s: Good
- stuck: had to deduce `lo = mid + 1` from "drop the left half if smaller" and hold lo, hi, mid for 3 rounds (about 9 state changes). It can be shortcut with "first element not less than 5" from srch-lower-bound-insert, so the halving is never forced.
- unknown: none
- answer: right (3, 6)

## srch-count-at-most-code (code, 4 chips): 25s vs budget 45s: Good
- stuck: none; the parenthetical on binary_search removes one chip; `find` chip is weak
- unknown: none
- answer: right

## rng-ranges-form-vocab (basic): 10s vs budget 30s: Easy
- stuck: none; the answer is nearly stated ("`a` points at the 7")
- unknown: none
- answer: right

## rng-projection-intro (basic): 25s vs budget 30s: Good
- stuck: `{}` and projection both defined on the front/back; I had to run the sort by `qty` (10, 20, 30) mentally. Fine.
- unknown: projection -> taught here by the back (the Card is the introduction; front gives enough)
- answer: right

## rng-two-arg-projection (basic): 20s vs budget 30s: Good
- stuck: none; I saw a 2-argument lambda in slot 3 and recalled projection = 1 argument
- unknown: none
- answer: right

## rng-member-pointer-search (basic): 30s vs budget 30s: Good
- stuck: `&Trade::time` is defined in one clause, which is enough; first sight of a value (935) that is not a Trade needed a second look
- unknown: none
- answer: right

## qry-max-element-intro (basic): 20s vs budget 30s: Hard
- stuck: tie in `{3, 9, 4, 9}`: index 1 or 3? Nothing in the closure says first or last. 50/50 cold. `max_element` itself undefined but guessable.
- unknown: max_element tie rule -> not in closure
- answer: right by luck
- fix idea: state the tie rule on the front, or ask a question that doesn't hinge on it first

## qry-empty-range (basic): 20s vs budget 30s: Good
- stuck: none; end() deref UB is in stdalgo-find-if-no-match
- unknown: none
- answer: right

## qry-spread-code (code, 3 chips): 15s vs budget 45s: Easy
- stuck: none
- unknown: none
- answer: right

## rng-projection-code (code, 4 chips): 25s vs budget 45s: Good
- stuck: none; the lambda chip is a good distractor and the second-last chip `&Item` is silly
- unknown: none
- answer: right

## algmix-stretch-spells-potions (stretch code, 2 blanks, 3 + 4 chips): 120s vs budget 180s: Good
- stuck: reasoned c2 first (the count is `end - lower_bound` of the first `s*p >= success`), then picked c1 as the ascending sort. The three c1 chips are easily told apart once c2 is fixed; the chip `sort(potions, {}, -p)` cost me a moment (descending). The c2 chip `success / s` is a plausible wrong turn, and the back's "7 / 2" counterexample is good.
- unknown: none; the `[s]` capture, projection with a lambda, `end - iterator` and the "partitioned by `s*p < success`" precondition are all in the closure
- answer: right
- two answers? no. Given away? no. Blank c1 depends on c2's reasoning, which is the stretch.
- fix idea: none; it is a real stretch

## part-partition-worked (basic, worked): 50s vs budget 75s: Good
- stuck: "keeper" means "passes the test" here but "kept" meant "fails the test" in remove_if-worked; I flipped polarity for a moment
- unknown: none
- answer: right
- fix idea: say "an element that passes (an even)" in the step text

## part-partition-trace (trace): 30s vs budget 75s: Good
- stuck: none; about 8 state changes (write slot twice, v twice). Both probes are answerable without the trace (count of evens; 4 is even), so the trace never has to be run.
- unknown: none
- answer: right
- fix idea: probe something only the swap order decides, though the standard leaves that open

## part-parity-code (code, 3 chips): 12s vs budget 45s: Easy
- stuck: none; the step list "swap a keeper into the write slot" points straight at partition
- unknown: none
- answer: right

## qry-explain-extremes (explain): 70s vs budget 90s: Good
- stuck: rubric "Mechanism: one pass" is not stated for max_element anywhere; I inferred it from find
- unknown: none
- answer: right, but "one pass" inferred

## uniq-dedupe-intro (basic): 15s vs budget 30s: Good
- stuck: `unique` undefined; name plus erase-remove made `{4, 7}` safe
- unknown: unique -> not defined on front
- answer: right

## uniq-worked (basic, worked): 50s vs budget 75s: Good
- stuck: the `| ?` tail is a single `?` in every row, though 3, 2, then 1 slots are unspecified. I read `?` as "one or more slots" after a moment. The compare column ("2: differs") gives the answer to the question away.
- unknown: none
- answer: right
- fix idea: put `? ?` and `?` to match the slot count, or the front note "`?` stands for all the slots after the bar"

## uniq-unsorted-misconception (basic): 15s vs budget 30s: Good
- stuck: none; "Many expect..." leans toward unchanged
- unknown: none
- answer: right

## uniq-trace (trace): 25s vs budget 75s: Good
- stuck: none; 3 state changes. The front's "Many expect unique to shrink" gives away the second probe.
- unknown: none
- answer: right (3, 5)

## uniq-steps-cloze (cloze, 2 blanks): 20s vs budget 60s: Easy
- stuck: none
- unknown: none
- answer: right

## uniq-dedupe-code (code, 3 chips): 15s vs budget 45s: Easy
- stuck: none
- unknown: none
- answer: right

## rearr-explain-rearranging (explain): 80s vs budget 90s: Good
- stuck: none. Rubric check: partition size unchanged (part-partition-intro back), unique (uniq-trace), "one pass" for partition (part-partition-worked) and unique (uniq-worked), 2n (sel-cost), adjacent-only (uniq-unsorted-misconception), example (uniq-dedupe-code). All reached.
- unknown: none
- answer: right

## rng-temporary-result (basic): 30s vs budget 30s: Again
- stuck: I answered "compiles, dangling iterator, undefined behaviour" from life-temporary-full-expression. `std::ranges::dangling` is not in the closure, so a "No" can't be derived; only the front's "Does the last line compile?" hints.
- unknown: ranges::dangling -> introduced by the back
- answer: wrong: compiles, then UB
- fix idea: ask "what does `it` hold?" with choices, or show the error text first

## rng-dangling-symptom (basic): 20s vs budget 30s: Good
- stuck: none; the error text names `dangling`
- unknown: none
- answer: right

## rng-named-range-code (code, 3 chips): 12s vs budget 45s: Easy
- stuck: none
- unknown: none
- answer: right

## rng-explain-range-algorithms (explain): 70s vs budget 90s: Good
- stuck: none. Rubric: one range (rng-ranges-form-vocab), comparator + projection (rng-projection-intro), `&Order::qty` (rng-member-pointer-search via rng-projection-code), cost on every comparison (projection-intro back), dangling (rng-temporary-result). All reached.
- unknown: none
- answer: right

## srch-absent-key (basic): 12s vs budget 30s: Easy
- stuck: none
- unknown: none
- answer: right

## srch-index-or-minus-one (basic): 10s vs budget 30s: Easy
- stuck: none. The front says binary_search "reports whether 7 is present", which gives the answer away.
- unknown: none
- answer: right
- fix idea: drop the sentence from the front

## srch-unsorted-input (basic): 20s vs budget 30s: Good
- stuck: none; I checked `{5, 1, 4}` against `e < 4` per the vocab Card
- unknown: none
- answer: right

## srch-steps-cloze (cloze, 2 blanks): 20s vs budget 60s: Easy
- stuck: none; the "meet the precondition" hint nearly states the first answer
- unknown: none
- answer: right

## srch-contains-code (code, 4 chips): 20s vs budget 45s: Easy
- stuck: none; the reversed-order chip is the only real distractor
- unknown: none
- answer: right

## srch-explain-sorted-search (explain): 70s vs budget 90s: Good
- stuck: none. Rubric check: mechanism (srch-lower-bound-worked), membership (srch-contains-code), never reports absent (srch-absent-key, reached through srch-steps-cloze), 20 for a million (srch-cost), precondition (srch-unsorted-input). All reached.
- unknown: none
- answer: right

## view-intro (basic): 25s vs budget 30s: Good
- stuck: "how many ints does odd itself store" leans toward 0 but I first guessed 3 (copies); the front defines filter and `|` in one clause. The back lands "view", "refers to v" and "v must outlive it" in one go.
- unknown: view -> introduced by the back
- answer: wrong first (3), then corrected on the back

## view-iota-take-vocab (basic): 20s vs budget 30s: Good
- stuck: `iota(1)` and `take(3)` undefined on the front. I guessed "1, 2, 3 ..." and "first three" from context. Pipe chain, iota and take are three new items on a 20s Card.
- unknown: iota, take -> not in closure
- answer: right by guess
- fix idea: one clause on the front: "iota(1) yields 1, 2, 3, ... forever; take(3) keeps the first three"

## view-pull-worked (basic, worked): 70s vs budget 75s: Hard
- stuck: row 3, the take-stops-the-pull row. The subgoal label says take stops the pull, yet the row shows iota giving 5, 6 and filter passing 6 before `take` reports the end. I read it as a contradiction until the back's "moving past 4 still advances take's source once". Then "never asked for 7" makes sense. Rows 1-2 are clear.
- unknown: none
- answer: right in the question's terms (take counted two, no 7); the "5, 6" fetch surprised me
- fix idea: relabel row 3's first cell "the loop asks again: take advances past 4 first" or add a footnote; say that take checks its count at the end test

## view-changed-source (basic): 20s vs budget 30s: Good
- stuck: none; the front's "Many expect ... to compute every f(x) right there" gives away that it is lazy
- unknown: none
- answer: right (90)

## view-pipeline-trace (trace): 45s vs budget 75s: Good
- stuck: none, but holding drop, filter, transform for 4 values over two passes is about 8 state changes, near my limit. `@1 on the first pass only` was clear.
- unknown: none
- answer: right (9, 34)

## view-order-code (code, 3 chips): 20s vs budget 45s: Easy
- stuck: none; the `take(3)` chip alone leaves `is_even` unused and is an easy reject. Two chips differ only in order, which is the real decision.
- unknown: none
- answer: right

## view-explain-views (explain): 75s vs budget 90s: Good
- stuck: none. Rubric check: no intermediate vector (view-changed-source back, view-pipeline-trace), owns no elements (view-intro), pulling (view-pull-worked), `iota | filter | take` (view-order-code), building does no work (view-changed-source), dies with the source (view-intro). All reached.
- unknown: none
- answer: right

# Summary

No Card is over its budget as I simulated it; the closest are view-pull-worked (70/75) and rng-temporary-result and part-keep-order (at 30/30). The estimate-time numbers are lower than mine on the worked examples and the explains by 5-15s.

Cards that stalled or I got wrong: sel-top-three-ordered (partial_sort not in closure, two answers right), rng-temporary-result (`dangling` not in closure), sel-nth-element-intro (nth_element undefined), part-keep-order (stable_partition untaught), qry-max-element-intro (tie rule), view-pull-worked (row 3).

Terms that tripped me: undefined algorithm on the front (nth_element, partial_sort, stable_partition, upper_bound, unique, lower_bound): 6 Cards; iota/take: 2.

Cards with 3+ new ideas: view-intro, view-iota-take-vocab, rng-projection-intro.

Give-aways: srch-index-or-minus-one, view-changed-source, uniq-trace, uniq-worked. Rubrics: every explain item is taught by a Card in its closure.

One change: name the algorithm on the front and its contract in one clause when a Card first uses it (nth_element, partial_sort, stable_partition).
