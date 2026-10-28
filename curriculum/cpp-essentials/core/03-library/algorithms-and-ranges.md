# core/03-library/algorithms-and-ranges: lesson plan (2026-10-28)

Goal: given an interview or LeetCode problem, the learner picks the standard algorithm that
fits (sorted search, partition, selection, dedupe, extremes), writes the call (classic or
`std::ranges::` form, with a projection or a view pipeline) without the classic pitfalls,
and talks for a minute about each family.

Capstones (rung 6, one per leaf): `srch-explain-sorted-search`, `rearr-explain-rearranging`,
`qry-explain-extremes`, `rng-explain-range-algorithms`, `view-explain-views` (concept talk
order), `algmix-explain-kth-largest` (choosing talk order). Stretch:
`algmix-stretch-spells-potions`.

Builds on `basics/11-algorithms-and-lambdas` (lambdas, find/find_if, sort + comparator,
strict comparator, remove_if worked/trace, erase_if, transform, accumulate init) and does
not re-teach any of it.

Leaf topics (all under `cpp-essentials/topics/core/03-library/algorithms-and-ranges/`):
`sorted-search` (14) · `rearranging` (16) · `extremes` (4) · `range-algorithms` (9) ·
`views` (7) · `choosing` (5). **55 Cards, all new.**

By Kind: basic 33 (4 of them `worked-example`) · cloze 2 · trace 4 · code 10 (1 `stretch`)
· explain 6 · parsons 0 · chunk 0. No parsons, because no idiom here has ≥ 4 lines whose
order is a decision. No chunk either: the dedupe line is one statement and is produced
as a `code` Card.

Subgoal labels (use them word for word on every Card that names the procedure):
- Search a sorted vector (usage): *sort first · search · check the miss · read the position*
  (`srch-steps-cloze`, `srch-contains-code` and `srch-count-at-most-code` fronts, capstone).
- lower_bound halving (internal): *probe the middle · drop the left half if smaller ·
  not smaller, so keep the middle and the left · stop when empty* (`srch-lower-bound-worked` rows,
  `srch-lower-bound-trace` back).
- partition (one-pass, forward-iterator form): *test the element · swap an element that
  passes into the write position · advance the write position · return the boundary*
  (`part-partition-worked`, `part-partition-trace` back; `part-parity-code` blanks only
  the algorithm name, so its front carries no labels).
- Dedupe in place (usage): *sort · unique · erase the tail* (`uniq-steps-cloze`,
  `uniq-dedupe-code`, `algmix-*`).
- unique (internal): *compare with the last kept · skip an equal · copy a new value into the
  next slot · return the new end* (`uniq-worked`, `uniq-trace`).
- View pull: *the loop asks · each stage pulls from the one before · a rejecting stage pulls
  again · take stops the pull* (`view-pull-worked`, `view-pipeline-trace`, `view-order-code`).

Only the two usage procedures get a sequence `cloze`. The internal ones (halving,
partition, unique, pull) are steps the learner reads but never writes, so their labels go
in the worked-example rows and the trace prose only. interview-essentials already has the
halving cloze (`search-half-open-invariant`). See open question 7.

Compile-grading: every `code` Card is a `constexpr` function checked by `static_assert`.
`lower_bound`/`upper_bound`, `partition`, `nth_element`, `unique`, `vector::erase`,
`max_element`/`minmax_element`, the `std::ranges::` algorithms and the views used here are
all constexpr from C++20. I checked this locally (GCC 16.2, `-std=c++23`); teachers re-check
it with `--remote` (GCC 14.2). **`std::stable_partition` is not constexpr until C++26**
(confirmed: it does not compile in a constant expression), so it is taught by a basic and a mix
Card and never appears as a code answer or chip. Dereferencing `end()` *is* a compile error
in constant evaluation (confirmed), so distractors that read `*end()` fail.

## Concepts (dependency order)

Vocabulary (feeds every leaf):
- V1 iterator ↔ index: `it - v.begin()` is the index of `*it`.
- V2 partitioned w.r.t. a test: every element that passes comes before every element that
  fails. This is lower_bound's precondition and partition's postcondition.
- V3 range form: `std::ranges::f(r, …)` takes the whole range `r` in place of
  `r.begin(), r.end()`.
- V4 views::iota / views::take: an endless count from n; stop after k elements.

1. **lower_bound position** (steps: yes): `lower_bound(first, last, x)` returns the first
   position whose element is not less than `x`, which is where `x` would be inserted.
   Vocabulary: half-open range → `iter-end-one-past`; iterator → `iter-iterator-basics`;
   index from iterator → V1 `alg-iter-index`; partitioned / precondition → V2
   `srch-partitioned-vocab` ("precondition" defined in one clause there); `v.insert(it, x)`
   → one clause on `srch-lower-bound-insert`; UB → `ub-definition`; `upper_bound` → its
   target on `srch-upper-vs-lower`; comparison counts → stated as counts ("about 20 for
   10⁶"), never as O-notation (no Big-O Card in cpp-essentials; open question 5).
2. **Membership on sorted data** (steps: no): lower_bound never reports "absent", so check
   `it != end && *it == x`. Vocabulary: `end()` → `iter-end-one-past`; `binary_search` → one
   clause on `srch-index-or-minus-one`; `constexpr`/`static_assert` →
   `constexpr-fn-static-assert`.
3. **partition** (steps: yes): rearranges so the passing elements come first and returns
   the boundary, losing no element. Vocabulary: predicate → `stdalgo-find-vs-find-if`;
   partitioned → V2; write position → `stdalgo-remove-if-worked`; stable → target of
   `part-keep-order`; `stable_partition` → `part-keep-order`.
4. **Selection with nth_element** (steps: no for the caller): it puts the value sorted order
   would put at one position there, with smaller values before it and larger after, each
   side unordered. Vocabulary: `v.begin() + k` → one clause on `sel-nth-element-intro`;
   `partial_sort` → target of `sel-top-three-ordered`; `size_t` → `types-size-t`.
5. **unique + erase** (steps: yes): `unique` drops *adjacent* duplicates by packing and
   returns the new end, so the tail must be erased. Vocabulary: `v.erase(first, last)` →
   `chunks-erase-remove`; "new logical end" → `stdalgo-remove-if-worked`.
6. **Extremes** (steps: no): `max_element`/`min_element` return a position, which is
   `end()` for an empty range. Vocabulary: `minmax_element` → one clause on
   `qry-spread-code`; structured binding → `structured-bindings-basics`.
7. **Projections** (steps: no): the `std::ranges::` algorithms take a projection, a
   one-argument function mapping each element to the key the comparator sees. Vocabulary:
   V3; struct → `class-struct-members`; `{}` (default comparator) → one clause on
   `rng-projection-intro`; `&Trade::time` (pointer to data member) → one clause on
   `rng-member-pointer-search`.
8. **Results into temporaries: `std::ranges::dangling`** (steps: no): called on a temporary
   container, a ranges algorithm returns `std::ranges::dangling`, which turns a dangling
   iterator into a compile error. Vocabulary: temporary / full-expression →
   `life-temporary-full-expression`; V3.
9. **Views are lazy** (steps: yes, the pull): a view is a non-owning range whose elements
   are computed one at a time, only when the loop asks. Vocabulary: range-for →
   `iter-range-for-intro`; `|` → one clause on `view-intro`; `views::filter` → one clause
   on `view-intro`; V4; `views::transform` → one clause on `view-changed-source`;
   `views::drop` → one clause on `view-pipeline-trace`.
10. **Choosing** (judgement): a one-line problem cue selects one of 1–9, or a look-alike
    from `basics/11` (sort, erase_if, find_if).

## Ladders

### Vocabulary (in `sorted-search`)
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 1 | alg-iter-index | basic | stdalgo-find-vs-find-if, ptr-subtract-counts-elements | `v{4, 8, 2}`, `it = std::find(…, 8)`: what is `it - v.begin()`? (1: an iterator difference counts elements) | new |
| 1 | srch-partitioned-vocab | basic | iter-end-one-past, stdalgo-find-vs-find-if | lower_bound's precondition (one clause) is "partitioned w.r.t. `x < 4`": does `{1, 3, 7, 2}` or `{1, 3, 2, 7}` meet it? | new |

### 1. lower_bound position (`sorted-search`). Steps: yes.
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 1 | srch-lower-bound-insert | basic | srch-partitioned-vocab, alg-iter-index | `v{2, 5, 9}`; `it = lower_bound(…, 6); v.insert(it, 6);`: which element does `it` point at? (9: first not less than 6) | new |
| 2 | srch-lower-bound-worked | basic `worked-example` | srch-lower-bound-insert | Halving table for `{2, 4, 4, 7, 9}`, x = 4 (3 rows, labels as above). At row 1, `v[2] == 4`, yet the search keeps going left: why? | new |
| 3 | srch-unsorted-input | basic `misconception` | srch-lower-bound-insert, ub-definition | Many expect unsorted input to give a wrong but harmless index. `lower_bound({5, 1, 4}, 4)`: index 2, `end()`, or what does the standard say? (UB: precondition broken. The why notes that a range sorted by a different comparator counts too.) | new |
| 3 | srch-upper-vs-lower | basic | srch-lower-bound-insert, alg-iter-index | `{1, 3, 3, 3, 5}`: lower_bound(3) is index 1. Which index does `upper_bound(3)` return? (4: first greater; `[lower, upper)` is the run of 3s) | new |
| 3 | srch-cost | basic | srch-lower-bound-worked | A sorted vector holds 10⁶ ints: about how many comparisons does lower_bound make, against `find`'s up to 10⁶? (about 20: each probe halves the range) | new |
| 4 | srch-lower-bound-trace | trace | srch-lower-bound-worked, srch-upper-vs-lower | `{1, 4, 4, 6, 9}`, x = 5: @1 `it - v.begin()` (3), @2 `*it` (6) | new |
| 5 | srch-count-at-most-code | code | srch-lower-bound-trace, srch-upper-vs-lower, constexpr-fn-static-assert | Count the values ≤ x in sorted `v`; blank the algorithm. Chips: `std::upper_bound`, `std::lower_bound`, `std::find`, `std::binary_search`. The harness checks the last element, absent keys below and above all elements, and a run of duplicates. | new |

Skipped rungs: none. (The faded trace (b) is skipped: the halving has 3 rows, and the full trace on a new input is enough.)
Note for the teacher: the worked table shows the `[lo, hi)` halving, an equivalent of
libstdc++'s count/step loop. Say "one way lower_bound can work" so the table never claims
to be the implementation.

### 2. Membership on sorted data (`sorted-search`). Steps: no.
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 1 | srch-absent-key | basic | srch-lower-bound-insert, iter-end-one-past | `v{2, 5, 9}`, `it = lower_bound(…, 10)`: what is `it`, and is `*it` safe? (`v.end()`; reading it is UB) | new |
| 3 | srch-index-or-minus-one | basic | srch-absent-key | Return the index of 7 in sorted `v`, or −1. Why is `std::binary_search` (one clause: "reports whether x is present") the wrong call? (it gives a bool, not a position) | new |
| 5 | srch-steps-cloze | cloze | srch-index-or-minus-one, srch-unsorted-input | Searching a sorted vector: {{c1::sort first}} · search · {{c2::check the miss}} · read the position | new |
| 5 | srch-contains-code | code | srch-steps-cloze, constexpr-fn-static-assert | Complete `contains`. Chips: `it != v.end() && *it == x`, `*it == x`, `it != v.end()`, `*it == x && it != v.end()`. The last reads `end()` first, which fails constant evaluation for a key above all elements. | new |

Skipped rungs: 2 and 4, because the concept has no steps: it is a check on one returned
position.

### Capstone (`sorted-search`)
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 6 | srch-explain-sorted-search | explain | srch-count-at-most-code, srch-contains-code, srch-cost, srch-unsorted-input, srch-lower-bound-worked | An interviewer asks how you search a sorted `std::vector` with the standard library. Explain. | new |

Rubric, in concept order: (1) problem: find a position or count in sorted data without
scanning it; (2) mechanism: lower_bound halves the range and returns the first element not
less than x; (3) example: membership is `it != end() && *it == x`; (4) cost: about log₂ n
comparisons, 20 for a million, against find's one pass; (5) pitfall: unsorted input breaks
the precondition, which is UB, not "not found".

### 3. partition (`rearranging`). Steps: yes.
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 1 | part-partition-intro | basic | stdalgo-find-vs-find-if, srch-partitioned-vocab, alg-iter-index | `v{3, 8, 5, 6}`, `mid = std::partition(…, is_even)`: what is `mid - v.begin()`, and what does `mid` mark? (2: the first failing element) | new |
| 2 | part-partition-worked | basic `worked-example` | part-partition-intro, stdalgo-remove-if-worked | Titled "one way partition can work" (the one-pass, forward-iterator form). Table on `{5, 2, 7, 4}`, even first, 4 rows: test · swap · advance. It ends with `2 4 \| {5, 7}, order unspecified`, boundary at 2. At row 4, 4 is *swapped* with 5, not copied over it as remove_if would: why? | new |
| 3 | part-keep-order | basic | part-partition-intro | Rows `(Ann, fail) (Bob, ok) (Cat, fail) (Dan, ok)`, with "ok" first: which call guarantees Bob stays before Dan, and why doesn't partition? (`stable_partition`: it keeps relative order. Defines "stable".) | new |
| 4 | part-partition-trace | trace | part-partition-worked, part-keep-order | `v{7, 4, 1, 6}`, `mid = std::partition(…, is_even)`: @1 `mid - v.begin()` (2), @2 `std::find(v.begin(), mid, 4) != mid` (true). Both are specified results; no probe reads an order. | new |
| 5 | part-parity-code | code | part-partition-trace, constexpr-fn-static-assert | Sort Array By Parity: evens first, any order; return the number of evens. Blank the algorithm. Chips: `std::partition`, `std::remove_if`, `std::find_if`. The harness checks that the result is a permutation of the input, so remove_if fails. | new |

Skipped rungs: none. Rungs 2 and 4 both run `std::partition`. The worked example is
labelled "one way partition can work". The standard specifies only the boundary and which
elements fall in each group; the order inside each group is unspecified. So the table shows
each group as a set ("order unspecified"), and the trace probes only the boundary and group
membership (I verified both probes with GCC 16.2). stable_partition stays at rung 3
(`part-keep-order`) and in `algmix-failed-to-back`.

### 4. Selection with nth_element (`rearranging`). Steps: no (for the caller).
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 1 | sel-nth-element-intro | basic | stdalgo-sort-basics, alg-iter-index | `v{9, 2, 7, 4, 5}`, `nth_element(v.begin(), v.begin() + 2, v.end())` (one clause on `+ 2`): what is `v[2]`? (5) | new |
| 3 | sel-top-three-ordered | basic | sel-nth-element-intro | A leaderboard must show the 3 best scores, best first. Why is nth_element not enough, and which call is? (`partial_sort(first, first + 3, last)`) | new |
| 3 | sel-cost | basic | sel-nth-element-intro, srch-cost | Why is nth_element cheaper than sort for one k-th value of 10⁶? (it recurses only into the side that holds k: a few passes on average, against sort's n·log₂ n ≈ 2×10⁷ comparisons) | new |
| 5 | sel-median-code | code | sel-top-three-ordered, constexpr-fn-static-assert, types-size-t | Median of an odd-size vector; blank the middle argument. Chips: `v.begin() + v.size() / 2`, `v.size() / 2`, `v.begin() + v.size() / 2 - 1`, `v.end() - 1`. | new |

Skipped rungs: 2 and 4. The caller sees only a postcondition, not an order of steps; the
internals are quickselect, which interview-essentials teaches (`algo/07-sorting/quickselect-*`).
cpp-essentials can't require those Cards, and doesn't need them.

### 5. unique + erase (`rearranging`). Steps: yes.
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 1 | uniq-dedupe-intro | basic | stdalgo-remove-if-worked, chunks-erase-remove | `v{4, 4, 7, 7, 7}`; `v.erase(std::unique(v.begin(), v.end()), v.end());`: what is `v`? ({4, 7}) | new |
| 2 | uniq-worked | basic `worked-example` | uniq-dedupe-intro | Table on `{1, 1, 2, 1}` (3 rows; each row shows only the written prefix, then `\| ?`; it ends `1 2 1 \| ?`, new end at slot 3). The last 1 is kept although a 1 was already kept: why? (it is compared only with the last kept element) | new |
| 3 | uniq-unsorted-misconception | basic `misconception` | uniq-worked | Many expect unique to remove every duplicate. `v{3, 1, 3}` after erase(unique…): {3, 1}, {1, 3} or {3, 1, 3}? (unchanged: sort first) | new |
| 4 | uniq-trace | trace `misconception` | uniq-worked, uniq-unsorted-misconception | `v{1, 1, 2, 3, 3}`, `e = std::unique(…)`: @1 `e - v.begin()` (3), @2 `v.size()` (5) | new |
| 5 | uniq-steps-cloze | cloze | uniq-trace | Dedupe in place: {{c1::sort}} · unique · {{c2::erase the tail}} | new |
| 5 | uniq-dedupe-code | code | uniq-steps-cloze, constexpr-fn-static-assert, types-size-t | Sorted `v`: blank the whole dedupe statement. Chips: `v.erase(std::unique(v.begin(), v.end()), v.end());`, `std::unique(v.begin(), v.end());`, `v.erase(std::unique(v.begin(), v.end()));`. The harness checks the size and the values. | new |

Skipped rungs: none.

**Unspecified tails (rule for every Card in this topic).** After `unique` and `remove_if`,
the values from the returned iterator to `end()` are unspecified. After `partition`, the
tail holds the failing elements in an unspecified order. Worked-example tables show the
tail as `| ?` (or as a set for partition). No answer, probe, chip or harness assertion may
depend on a tail value or a within-group order. Allowed: the returned position,
`v.size()`, values before the returned end, group membership. Checked: `uniq-trace` (@1
`e - v.begin()`, @2 `v.size()`) and `part-partition-trace` follow this rule. In
`part-parity-code` and `uniq-dedupe-code` the harness checks the boundary or size and the
kept values, plus a permutation check for partition, never an order inside a group.

### Capstone (`rearranging`)
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 6 | rearr-explain-rearranging | explain | part-parity-code, sel-median-code, uniq-dedupe-code, sel-cost, uniq-unsorted-misconception | An interviewer asks how the standard library rearranges a vector in place without a second container. Explain. | new |

Rubric: (1) problem: reorder in place, without extra storage or a full sort; (2)
mechanism: they rearrange inside `[first, last)` around a boundary iterator and never change
the size; (3) example: `v.erase(std::unique(…), v.end())` dedupes a sorted vector; (4)
cost: partition and unique make one pass, and nth_element is linear on average, against
sort's n·log n; (5) pitfall: unique drops only adjacent duplicates, so sort first and then
erase the tail.

### 6. Extremes (`extremes`). Steps: no.
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 1 | qry-max-element-intro | basic | stdalgo-find-if-no-match, alg-iter-index | `v{3, 9, 4, 9}`, `it = std::max_element(…)`: what is `it - v.begin()`? (1: the first largest; a position gives the value and the index) | new |
| 3 | qry-empty-range | basic `misconception` | qry-max-element-intro, ub-definition | Many expect max_element on an empty vector to give 0 or `INT_MIN`. `int m = *std::max_element(v.begin(), v.end());` with `v` empty: 0, INT_MIN, an exception, or what? (UB: it returns `end()`) | new |
| 5 | qry-spread-code | code | qry-empty-range, structured-bindings-basics, constexpr-fn-static-assert | `auto [lo, hi] = std::minmax_element(…)` (one clause: a pair of iterators, smallest and largest). Return max − min. Chips: `*hi - *lo`, `hi - lo`, `*lo - *hi`. The harness uses `{4, 9, 1}`, where the index distance differs from the value gap. | new |
| 6 | qry-explain-extremes | explain | qry-spread-code, qry-empty-range, qry-max-element-intro | An interviewer asks why `std::max_element` returns an iterator rather than the value. Explain. | new |

Skipped rungs: 2 and 4. The concept is one pass returning one position, with no steps the
caller follows. The pass is the same as find_if's, already met in `basics/11`.
Rubric: (1) problem: get the largest element's value *and* where it is; (2) mechanism: one
pass, returning an iterator to the first largest; (3) example: `max_element(…) - v.begin()`
is its index; (4) cost: one pass (n − 1 comparisons), and minmax_element finds both ends in
one pass; (5) pitfall: on an empty range it returns `end()`, and dereferencing that is UB.

### 7. Projections (`range-algorithms`). Steps: no.
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 1 | rng-ranges-form-vocab | basic | stdalgo-find-vs-find-if | `v{3, 7}`: what does `std::ranges::find(v, 7)` return, compared with `std::find(v.begin(), v.end(), 7)`? (the same iterator: the range form takes the whole range) | new |
| 1 | rng-projection-intro | basic | rng-ranges-form-vocab, stdalgo-sort-basics, class-struct-members | `std::ranges::sort(orders, {}, [](const Order& o) { return o.qty; })` (one clause on `{}`): in what order do the ids end up? (by qty: the projection maps each element to the compared key. The why: it runs on every comparison.) | new |
| 3 | rng-two-arg-projection | basic | rng-projection-intro | Passing `[](const Order& a, const Order& b) { return a.qty < b.qty; }` as the *third* argument fails to compile. Why? (a projection is called with one element; that lambda is a comparator, second argument) | new |
| 3 | rng-member-pointer-search | basic | rng-two-arg-projection, srch-lower-bound-insert | `std::ranges::lower_bound(trades, 930, {}, &Trade::time)` (one clause on `&Trade::time`) on trades sorted by time: which trade does it return? | new |
| 5 | rng-projection-code | code | rng-member-pointer-search, qry-spread-code, constexpr-fn-static-assert | Name of the priciest item via `std::ranges::max_element(items, {}, ___)`. Chips: `&Item::price`, `Item::price`, `&Item`, the two-argument comparator lambda. | new |

Skipped rungs: 2 and 4. A projection is one call per element and has no steps.

### 8. Results into temporaries: `std::ranges::dangling` (`range-algorithms`). Steps: no.
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 1 | rng-temporary-result | basic | rng-ranges-form-vocab, life-temporary-full-expression | `std::vector<int> load();` `auto it = std::ranges::find(load(), 3); int x = *it;`: does it compile, and why? (no: `it` is `std::ranges::dangling`, because the vector died at the `;`) | new |
| 3 | rng-dangling-symptom | basic | rng-temporary-result | The error reads "no match for operator* (operand type is std::ranges::dangling)" on `*std::ranges::max_element(scores())`. Which one-line change fixes it? (name the vector first) | new |
| 5 | rng-named-range-code | code | rng-dangling-symptom, alg-iter-index, constexpr-fn-static-assert | Index of the max of `load()`. Blank the argument in `auto it = std::ranges::max_element(___); return it - v.begin();`. Chips: `v`, `load()`, `std::move(v)`; both distractors give `dangling`, so they fail to compile. | new |

Skipped rungs: 2 and 4. There are no steps: the result's type is decided at compile time.

### Capstone (`range-algorithms`)
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 6 | rng-explain-range-algorithms | explain | rng-projection-code, rng-named-range-code, rng-projection-intro, rng-ranges-form-vocab | An interviewer asks what `std::ranges::sort` gives you over `std::sort`. Explain. | new |

Rubric: (1) problem: pass one range, not two iterators that could belong to different
containers; (2) mechanism: they take a range plus an optional comparator and projection;
(3) example: `ranges::sort(orders, {}, &Order::qty)` sorts by a member with no lambda; (4)
cost: the projection runs on every comparison, so keep it cheap; (5) pitfall: on a
temporary range the result is `std::ranges::dangling`, a compile error rather than a
dangling iterator.

### 9. Views are lazy (`views`). Steps: yes (the pull).
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 1 | view-intro | basic | iter-range-for-intro, lambda-syntax-intro | `auto odd = v \| std::views::filter(is_odd);` (one clause on `\|`/filter): how many ints does `odd` own? (none: a view refers to `v`'s elements, so `v` must outlive it) | new |
| 1 | view-iota-take-vocab | basic | view-intro | `for (int x : std::views::iota(1) \| std::views::take(3))`: what does it print? (1 2 3) | new |
| 2 | view-pull-worked | basic `worked-example` | view-iota-take-vocab | Pull table for `iota(1) \| filter(is_even) \| take(2)` (3 rows, pull labels). At row 3, iota is never asked for 5: why? (take stops the pull) | new |
| 3 | view-changed-source | basic `misconception` | view-pull-worked | Many expect `r = v \| views::transform(f)` (one clause) to compute every f(x) on that line. `v{1, 2}`, `f = x*10`, then `v[0] = 7;`: what does summing `r` give: 30, 90, or a compile error? (90) | new |
| 4 | view-pipeline-trace | trace | view-pull-worked, view-changed-source | `v{1, 2, 3, 4, 5} \| drop(1) \| filter(odd) \| transform(sq)` (one clause on drop): @1 the first value the loop sees (9), @2 the sum (34) | new |
| 5 | view-order-code | code | view-pipeline-trace, constexpr-fn-static-assert | Sum of the squares of the first 3 even positive ints (56). Blank the middle stages. Chips: `filter(is_even) \| std::views::take(3)`, `take(3) \| std::views::filter(is_even)`, `take(3)`. | new |
| 6 | view-explain-views | explain | view-order-code, view-changed-source, view-intro, view-pull-worked | An interviewer asks what `std::views::filter` does that `std::copy_if` into a new vector does not. Explain. | new |

Skipped rungs: none.
Rubric: (1) problem: chain filter/transform steps without building intermediate vectors;
(2) mechanism: a view is a lazy, non-owning range, and each element is pulled through the
stages when the loop asks for it; (3) example: `iota(1) | filter(even) | take(3)` finishes
because take stops the pull; (4) cost: building the pipeline does no work and allocates
nothing, and the work is paid per element during iteration; (5) pitfall: a view refers to
its source, so if the vector dies first, the view dangles.
(The front names `std::copy_if` only as the listener's comparison. If the teacher wants
nothing outside the closure, use "a loop that copies the matches into a new vector".)

## Recognition Cards (`choosing`)
| rung | id | kind | requires | question (one line) | status |
| --- | --- | --- | --- | --- | --- |
| 3 mix | algmix-kth-largest | basic | sel-top-three-ordered | 10⁵ scores: return the 5th largest; the order of the rest doesn't matter. Which call? (nth_element. Look-alikes: sort, from basics/11, and partial_sort.) | new |
| 3 mix | algmix-count-in-range | basic | srch-upper-vs-lower, srch-cost | A sorted vector of 10⁶ prices; 10⁵ queries each ask how many prices lie in [a, b]. What does one query compute? (`upper_bound(b) − lower_bound(a)`. Look-alike: a find_if/loop per query, from basics/11.) | new |
| 3 mix | algmix-failed-to-back | basic | part-keep-order, container-erase-if-intro | Orders: move the rejected ones to the back, keep both groups in arrival order, and keep the rejected ones. Which call? (stable_partition. Look-alikes: erase_if, from basics/11, deletes them; sort orders by key.) | new |
| 6 | algmix-explain-kth-largest | explain (choosing) | algmix-kth-largest, sel-cost, sel-median-code, sel-top-three-ordered | An interviewer asks how you'd find the k-th largest of n numbers with the standard library. Talk through your choice. | new |

The fronts give sizes, never a target complexity (PEDAGOGY §2 rule 14). Each Card requires
the recognition Card of every algorithm in its answer. Choosing rubric: (1) cue: one order
statistic is wanted, and the rest of the order is irrelevant; (2) pattern: nth_element at
position n − k; (3) example: Kth Largest Element in an Array; (4) complexity: linear on
average, against n·log n for sort; (5) look-alike: partial_sort when the top k must also be
in order.
A fourth mix Card, "count distinct ids in place" (sort + unique), was cut for size. Add it
if the topic gets room.

## Task classes (and stretch Cards)
| class | Cards | link |
| --- | --- | --- |
| 1: one call on a tiny input | srch-lower-bound-trace, srch-count-at-most-code, srch-contains-code, part-partition-trace, part-parity-code, sel-median-code, uniq-trace, uniq-dedupe-code, qry-spread-code, view-pipeline-trace | top: `qry-spread-code` |
| 2: the ranges form in a small realistic function (projection, named range, pipeline order) | rng-projection-code (first; requires `qry-spread-code`), rng-named-range-code, view-order-code | top: `rng-projection-code` |
| 3: two mechanisms, interview-shaped | **algmix-stretch-spells-potions** (`code`, `stretch`, `choosing` leaf) | requires `srch-count-at-most-code`, `rng-projection-code` |

The stretch Card, Successful Pairs of Spells and Potions: for each spell s, count the
potions p with s·p ≥ success. It has two blanks: (c1) `std::ranges::sort(potions)`, and (c2)
`potions.end() - std::ranges::lower_bound(potions, success, {}, [s](long long p) { return s * p; })`.
The projection maps each potion to its product, so lower_bound searches on it. I checked it
as constexpr locally. ≤ 180 s, required by nothing. 1 stretch Card in 55 (cap: ~5).
Optional second stretch: `part-stretch-sort-colors` (two `std::partition` calls, the second
from the first's boundary). Its id is unused. See open question 9.

## Coverage map: existing Cards on the same ideas
| existing Card(s) | Deck (state) | covers | how this plan avoids duplicating it |
| --- | --- | --- | --- |
| stdalgo-sort-basics, -comparator-strict, -sort-by-length | cpp-essentials | sort, comparator, strictness | Not re-taught; required by `sel-nth-element-intro` and `rng-projection-intro`. |
| stdalgo-accumulate-init; stl-accumulate-init-type, stl-accumulate-overflow | cpp-ess; i-e | accumulate init type, overflow | Cut from this plan entirely (taught three times already). |
| stdalgo-remove-if-worked/-keeps-size, chunks-erase-remove, erase_if pair | cpp-essentials | remove_if packing, the erase tail | Required by `part-partition-worked` and `uniq-dedupe-intro`. `uniq-trace` reuses the remove_if shape on purpose (same chunk, new algorithm). |
| search-lower-bound-meaning, -first-true-predicate, -half-open-* , -count-below-mixed | interview-essentials (active) | binary search as an algorithm, lower_bound on an absent key, count < t | cpp-essentials can't require them and must stand alone. These Cards teach the library contract instead: insertion position, `end()` on a miss, precondition UB, upper_bound, with different inputs. The mix Card uses [a, b] (upper − lower), not count < t. Some overlap is accepted (open question 3). |
| stl-equal-range-count | i-e | equal_range, LC 34 | equal_range is cut here; `srch-upper-vs-lower` gives its upper end. Proposed wiring in open question 3. |
| quickselect-worked/-trace | i-e | nth_element's internals | This is why selection skips rungs 2 and 4. |
| sort-stable-meaning, sort-std-sort-vs-stable | i-e | stable sort | `part-keep-order` defines "stable" for partition only; stable_sort is cut. |
| stl-iota-argsort, stl-argsort-meet, stl-greater-comparator | i-e | ranges::sort with an index projection, std::greater | These are LeetCode applications that define "projection" in one clause. cpp-essentials gets its own projection ladder on struct members, avoids std::greater (lambdas and the default only), and leaves argsort to i-e. |
| rec-top-k-choice, technique-max-start-element-code, stl-min-max | i-e | top-k buckets, hand-written max, two-value std::max | Different angle: `algmix-kth-largest` is one order statistic; the extremes leaf is the library's range form. |
| containers-mixed-trades-by-time, -map-vs-unordered-map | cpp-essentials | `std::map::lower_bound` member | Not duplicated: this plan covers the vector algorithm. |
| cpp-core ranges-and-views (10 Cards) | cpp-core (**paused**) | what-is-a-view, lazy-cloze, views-non-owning, views-construction-cost, composition-cloze, filter-transform-pipeline, sort-projection, borrowed-range-cloze, range-categories, weakest-category | Overlap with `view-intro`, `view-changed-source`, `view-order-code` and `rng-projection-code` is accepted. cpp-core is paused, its Cards can't be required from cpp-essentials, and ids don't move. The new Cards use other angles (ownership count, mutated source, take/filter order, max_element instead of sort). Not covered here: pipe equivalence, construction cost as a cloze, borrowed_range, range categories. They stay in cpp-core as the deeper layer (open question 4). |

## Existing Cards not in a ladder (and why)
The topic is new, so it has no existing Cards. No existing Card changes in this plan. The
only proposed edits to existing Cards are wiring, and they wait for the learner (open
questions 3 and 4).

Cut candidates, with reasons:
- `std::reduce` (vs accumulate): low interview payoff; accumulate is already taught three times.
- `std::iota`: only argsort setup, which i-e covers; `views::iota` is kept.
- `std::next_permutation`: interviews ask you to *implement* it, and the call alone is rare; it would cost ≥ 3 Cards.
- `stable_sort` / `sort` recap: already in basics/11 and i-e algo/07-sorting.
- `count_if` / `any_of` / `all_of` / `none_of`: lookups (PEDAGOGY §2 rule 12). The one gotcha, all_of on an empty range is true, can go in `qry-explain-extremes`'s elaborate.
- `equal_range` and `binary_search` ladders: equal_range is in i-e; binary_search appears only as the look-alike in `srch-index-or-minus-one`.
- `partial_sort` produce Card: it is taught at rung 3 (`sel-top-three-ordered`), and its produce rung is shared with nth_element.
- Searching with the wrong comparator (sorted by `>`, searched with `<`): folded into `srch-unsorted-input`'s why.
- lower_bound's heterogeneous comparator (`comp(element, value)` order): replaced by the projection form (`rng-member-pointer-search`).
- `views::reverse`, `std::ranges::to`, `ranges::unique`'s subrange result, borrowed_range, range categories: lookups or depth for cpp-core.

## Open questions for the learner
Resolved 2026-10-28: the learner accepted every default below, including the
`stl-equal-range-count` wiring in Q3 (prereq-mapper adds it once the Cards land).

1. **Leaf split.** Six leaves (sorted-search, rearranging, extremes, range-algorithms, views,
   choosing), each with its own capstone. *Default: as planned.* The alternative is one
   classic leaf with one capstone per concept.
2. **Size.** 55 Cards, at the top of the 35–55 range. *Default: keep 55.* To shrink, cut the
   extremes leaf (4) and teach max_element only through `rng-projection-code`.
3. **Overlap with interview-essentials.** `srch-lower-bound-insert` and `srch-absent-key`
   overlap `search-lower-bound-meaning`. *Default: keep both.* cpp-essentials must stand
   alone; ours is the library contract, theirs the algorithm. Should `stl-equal-range-count`
   gain `requires: cpp-essentials/srch-upper-vs-lower` (a wiring change only, no version
   bump)? *Default: yes, done by prereq-mapper after the Cards land.*
   `search-lower-bound-meaning` stays unwired, so the algorithm track doesn't deepen.
4. **Paused cpp-core duplicates.** *Default: leave them.* When cpp-core is unpaused, wire
   `ranges-what-is-a-view` → `cpp-essentials/view-intro` and `ranges-sort-projection` →
   `cpp-essentials/rng-projection-intro`.
5. **Costs without Big-O.** cpp-essentials has no O-notation Card, so costs are stated as
   counts ("about 20 comparisons for 10⁶", "n·log₂ n"). *Default: counts.* No new Big-O Card.
6. **stable_partition can't be compile-graded** (constexpr only from C++26), so it has no
   produce Card of its own. *Default: produce partition (`part-parity-code`), and recognise
   stable_partition (`part-keep-order`, `algmix-failed-to-back`).* Option: add a Move Zeroes
   `cloze`.
7. **Subgoal clozes** only for the two usage procedures (sorted search, dedupe), not for the
   internal ones (halving, partition, unique, pull). *Default: as planned.*
8. **Pointer to data member** (`&Trade::time`) gets a one-clause definition, not its own
   vocabulary Card. *Default: one clause.* Add a Card if a novice-learner stalls on it.
9. **A second stretch Card** (`part-stretch-sort-colors`). *Default: not now.* Add it once
   the partition ladder is solid.
10. **The cut list** (reduce, std::iota, next_permutation, count_if/any_of/all_of,
    equal_range). *Default: cut as listed.* any_of/all_of is the cheapest to restore: 3 Cards
    in the `extremes` leaf.
