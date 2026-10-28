---
id: view-pull-worked
kind: basic
version: 1
level: 2
tags: [ranges, views, worked-example]
requires:
  - view-iota-take-vocab
refs:
  - https://en.cppreference.com/w/cpp/ranges/take_view
  - https://en.cppreference.com/w/cpp/iterator/counted_iterator
  - https://eel.is/c++draft/range.take.view
---

`auto is_even = [](int x) { return x % 2 == 0; };`, then
`for (int x : std::views::iota(1) | std::views::filter(is_even) | std::views::take(2))`.
Each row is one pass of the loop. In row 3, the pull already in
progress (moving past 4) finishes, so 6 is fetched.

| step (subgoal) | `iota(1)` gives | `filter(is_even)` | `take(2)` | loop gets |
| --- | --- | --- | --- | --- |
| the loop asks · each stage pulls from the one before | 1, 2 | rejects 1; passes 2 | 1 of 2 | 2 |
| a rejecting stage pulls again | 3, 4 | rejects 3; passes 4 | 2 of 2 | 4 |
| take stops the pull, after the pull in progress | 5, 6 | rejects 5; passes 6 | count spent: end | nothing: loop ends |

## `iota(1)` never runs out. Why is it never asked for 7?

---

**`take(2)` has counted two elements, so it reports the end and pulls no more.**

Moving past 4 still advances `take`'s source once (row 3: filter fetches
5, 6), but the count is now 0, so the loop's end check fails before
anyone asks again. Nothing runs ahead: each value exists only when pulled.
