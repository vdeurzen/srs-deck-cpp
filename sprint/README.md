# Foundations-first study plan (from 2026-10-20)

The goal: rebuild C++ and DS&A foundations as long-term chunks and patterns, so you
recognise a problem's pattern in seconds and can talk about any topic for a minute,
in an interview or a screening call.

## What changed, and why

The first sprint (2026-10-17) picked the "interview-payoff" Cards and cut the
vocabulary and foundation Cards as trivia. Those were exactly what a rebuild needs:
Cards leaned on words, notation and C++ constructs nothing had taught, and some
traces asked for several full runs of an algorithm in your head. On 2026-10-19/20
both essentials Decks were rebuilt foundations-first:

- **Teaching order, written down** (PEDAGOGY.md §0, §3): every concept climbs a
  ladder, each rung requiring the one below: meet it → see it worked → recognise
  it → run it once → produce it → talk about it. A Card may use only what its
  prerequisites taught you, measured from a Go programmer's baseline.
- **Foundations added**: ~150 foundation and worked-example Cards (vectors, pairs, iterators, `auto`,
  `static_assert`, structs, stack vs heap, Big-O, recursion, hashing and graph
  vocabulary, bit operators, memory hierarchy, …), moved back in from the paused
  Decks or newly written.
- **Too advanced moved out**: ~70 Cards (raw-storage `vector` internals,
  implement-`shared_ptr`, SPSC, Fenwick, bitmask DP, language-lawyer C++) went back to
  `cpp-core`, `algo-systems`, `hft-interview` and `leetcode`, with their old history.
  They come back when you unpause those Decks.
- **Traces rebuilt** to a working-memory budget (PEDAGOGY §3.1): one run, ≤ 5
  elements, ≤ 4 changing values, ≤ 3 probes, about a minute. A count or bound is
  asked as reasoning, not simulated. Every algorithm trace has a **worked example**
  Card first: it shows you the full step table and asks *why* one step happens.
- **Every topic ends in a capstone** you answer aloud: one clear question, graded on
  five plain claims that each answer it. No fixed slots: the order is the one a good
  spoken answer takes.
- **Mixed recognition** Cards make you choose between patterns from different
  topics, which is the real interview skill.
- Every Card is self-contained: problems are stated, never "LC 209".

An independent audit of 80 random Cards after the rebuild found ~80 % fully clean
(up from ~50 %), every trace within budget and no wrong facts; the residue was fixed.

Files: `foundations/` holds the audits, the plan and what was applied;
`traces/` the trace rebuild; `review/` the earlier quality review; `moved.tsv`
and `foundations/moved-out.tsv` map ids between Decks.

## App settings

1. **Active: only `cpp-essentials` and `interview-essentials`.** Keep the other six
   paused.
2. **New cards per day: 30**, in **two sessions of ~15**. A Card unlocks only once its
   prerequisites have been rated, so the second session picks up what the first one
   unlocked. That covers both Decks' ~770 items (~720 Cards) in about 3½ weeks. If you have the
   time and your reviews stay under ~1 hour, 40 is fine; if Cards start feeling
   confusing, drop to 20.
3. **Respect prerequisites: on.**

Many Cards you'd already studied changed meaning and had their `version` bumped,
so they come back as new; that's intended.

## How to study for long-term memory and fluent talk

- **Rate honestly.** Again when you didn't know it. A Card that keeps failing is a
  sign of a bad Card, not of you: note its id and it gets fixed.
- **Worked examples: read the table, then answer the "why".** Don't skip to the back.
- **Traces: one run, on paper if you like.** If one takes more than ~90 s, note the
  id; it's over budget.
- **`explain` Cards: say the answer out loud, against the timer**, in the order
  above. That order is the chunk you'll reuse in interviews.
- **The `elaborate` box**: answer it in a sentence. The app shows your last answer
  next time, so each pass builds on the one before.
- **LeetCode alongside**: when a pattern's code Card appears, solve one real problem
  with it, unaided, against a 25-minute timer.

## After the essentials

Once both essentials Decks are introduced and your reviews feel easy (roughly 3–4
weeks), lower new cards to 15–20 a day and unpause one Deck at a time: `cpp-core` and
`leetcode`, then `hft-interview` (the implement-it questions: `vector::push_back`,
smart pointers, SPSC) and `cpp-basics`, then `algo-basics`, then `algo-systems`. Their
trace Cards haven't been rebuilt to the new budget yet; that's the next job before
unpausing them.
