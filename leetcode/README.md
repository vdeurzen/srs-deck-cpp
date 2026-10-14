# `leetcode`

Templates and traps for LeetCode-style interview problems, meant to be studied
alongside solving them. It builds on all four other Decks: the concept of each
pattern lives in `algo-basics`/`algo-systems`, and this Deck's Cards `require`
it and add the interview-speed part. Nothing requires this Deck. The plan is
`PLAN.md`.

## Layout

```
topics/00-stl  stl-     topics/05-lists  list-   topics/10-bits    bit-
topics/01-arrays arr-   topics/06-trees  tree-   topics/11-ranges  rq-
topics/02-search bs-    topics/07-graphs gr-     topics/12-recognition rec-
topics/03-stacks mono-  topics/08-backtracking bt-
topics/04-heaps  pq-    topics/09-dp     dp-
```

## Conventions

- **A pattern is 3–5 Cards:** a signal `basic` (problem-statement fragment →
  pattern and invariant), a template `chunk` (≤ 7 lines), a `trace` on a tiny
  input whose values come from a compiled run, a `code` Card that blanks the
  bug-prone line, and a misconception Card where a real one exists. One
  `explain` capstone per family, not per pattern.
- **Recognition (`12-recognition`, `rec-`).** A contrast Card shows two or
  three problem-statement fragments that look alike, and its answer is the
  one property that separates them. Its front doesn't name the patterns
  it separates. The `rec-explain-*` Cards are the family capstones
  (windows, DP, graphs): five single "X because Y" claims, each backed
  by a required Card, directly or through one.
- **Problems are linked, not memorised.** `refs` carries the LeetCode URL
  next to a primary source (cppreference, cp-algorithms); `tags` carries the
  pattern and up to three `lc-<number>` tags.
- **Harnesses run in the compiler.** `vector`, `string`, `array`, `sort`,
  `*_heap` and `lower_bound` are constexpr; `unordered_map`, `map`, `set`,
  `deque`, `queue` and `priority_queue` are not. Use `array<int,26>` counters
  or a heap over a `vector`, and pin container types with
  `static_assert(std::is_same_v<…>)`.
