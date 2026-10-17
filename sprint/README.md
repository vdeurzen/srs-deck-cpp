# Interview sprint: 2026-10-17 → 2026-10-31

Two weeks to rebuild C++ fundamentals plus DS&A and coding patterns, to the level a
screening call or first-round interview expects. After that, the rest of the repo builds
on the same base for long-term depth.

## What's in it

On 2026-10-17 the 558 highest-payoff Cards were **moved** (not copied) from the six existing
Decks into two foundation Decks. Their old review history is gone, and each Card now has
one schedule, so nothing is reviewed twice after the sprint. `moved.tsv` maps every old
id to its new one, `added-edges.tsv` lists the prerequisites added afterwards to replace the ones lost in the move, `selection/` holds the per-Deck picks with a reason for each (tier A
was moved; tier B stayed behind, but was the next cut), and `move.py` is the script that
did it.

| Deck | Cards | From | Covers |
| --- | --- | --- | --- |
| `cpp-essentials` | 295 | cpp-basics, cpp-core | pointers/references, const, classes and special members, lifetime and RAII, value categories, move semantics, smart pointers, virtual dispatch, templates and concepts, lambdas, containers and invalidation, exceptions and noexcept, UB, layout, threads, atomics |
| `interview-essentials` | 265 | algo-basics, leetcode, hft-interview, algo-systems | complexity, hashing, binary search, trees, heaps, sorting, graphs, greedy and DP, LeetCode templates and recognition cues, STL traps, implementing vector / unique_ptr / shared_ptr, SPSC, LRU, the trivia round, cache and false sharing |

That comes to 609 review items (a cloze Card counts once per blank). Left out:
coroutines, senders/execution, modules, raw-storage exotica, compilers, databases,
formal asymptotics, and the deeper on-site chains (order book, SSO, type erasure).

## App settings for the sprint

1. **Pause** `cpp-basics`, `cpp-core`, `algo-basics`, `algo-systems`, `hft-interview` and
   `leetcode`. Only the two essentials Decks should be active.
2. **New cards per day: 60.** The two Decks interleave round-robin, so that's ~30 C++
   and ~30 DS&A per day. If 2+ hours a day isn't possible, use **50**: everything still
   gets introduced, but it finishes around day 13, with almost no consolidation time.
3. **Respect prerequisites: on.** Cards unlock in order (`requires`), so concepts
   come before the code and trace Cards that use them.
4. **Study in two sessions a day**, e.g. ~30 new in the morning and the rest in the
   evening. A Card unlocks only once its prerequisites have been rated, so a second
   session picks up what the first one unlocked. With one session a day, the deepest
   chains (move semantics → `move_if_noexcept` → building a vector, depth 11) would
   still be arriving on day 12. With two, everything is in by day 11.

## Expected load (rough model)

| Days | New items/day | Reviews/day | Time/day |
| --- | --- | --- | --- |
| 1–3 | 60 | 0–70 | 1–1.5 h |
| 4–7 | 60 | ~140 | ~1.75 h |
| 8–10 | 60 | ~210 | ~2.25 h (peak) |
| 11 | ~15 | ~200 | ~1.5 h |
| 12–14 | 0 | 90–160 | < 1 h, plus mock interviews |

## How to study for interview speed

- **Rate honestly.** A Card counts as known only once rated Hard or better. Rating Good
  when you weren't sure locks the gaps in.
- **Answer `explain` Cards out loud, against the timer.** That's the screening-call skill;
  the rubric shows what an interviewer listens for.
- **`code`, `parsons` and `chunk` Cards are the templates.** On the day a LeetCode
  pattern appears (sliding window, prefix sum, BFS, binary search on the answer, DP),
  solve 1–2 real problems with it, unaided, against a 25-minute timer. The Cards make the
  template automatic; the problems train choosing it.
- **Days 12–14:** no new Cards are left. Do the due reviews, then use **Practice** on
  both Decks (it doesn't touch the schedule), plus two timed mock rounds: one C++
  ("implement `push_back`", "explain move semantics", "why is the destructor virtual?")
  and one LeetCode medium.

## After the sprint (from ~2026-11-01)

The six other Decks now build on the essentials Decks, so their entry Cards are
unlocked as soon as the matching essentials Card is known. Then:

1. Lower **new cards per day to 15–20**. Keep reviewing the essentials Decks; that's the
   long-term memory part.
2. Unpause one Deck at a time, in this order: `cpp-core` and `leetcode`, then
   `hft-interview` and `cpp-basics`, then `algo-basics`, then `algo-systems`.
   The app can't prioritise Cards within a Deck, so tier B isn't scheduled first;
   `selection/sel-*.tsv` lists it if you want to look those Cards up in Browse.
