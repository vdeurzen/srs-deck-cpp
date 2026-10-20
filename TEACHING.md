# How a topic is taught

`PEDAGOGY.md` is the standard: who the learner is, the ladder each concept
climbs (§0), what makes a good Card (§2), sequencing (§3), the trace budget
(§3.1), and each Kind's rules and time to answer (§4). Where this file and
PEDAGOGY.md disagree, PEDAGOGY.md wins.

This file adds what one Card's rules can't say: how a **topic** is planned,
how the work grows harder without any Card growing long, and how the
learner's experience feeds back into the Cards. The evidence is in
`curriculum/RESEARCH.md`. The agents and skills that apply it are in §6.

The constraint behind all of it: there is no lecture. The learner meets a
topic only through Cards, in the order `requires` unlocks them, and every
Card stays in review for years. So the teaching lives in the sequence, and
every second a Card costs is paid on every review (§2).

## 1. Planning a topic (before any Card is written)

1. **Goal and capstones.** One or two sentences on what the learner can do
   at the end, in an interview or at work ("write `push_back` with the
   strong guarantee and explain every line"). Name the capstones that test
   it: the §0 rung-6 `explain` Cards, plus any stretch Card (§3).
2. **Work backwards.** For each capstone ask: what must already be a chunk in
   long-term memory so that this fits in ~4 working-memory slots? Repeat
   until you reach what Cards already teach, or the §0 baseline. That list,
   in dependency order, is the topic's concepts, one sentence each. A
   concept stated with "and" is two (§0).
3. **Vocabulary sweep.** Every term, notation, library name and construct
   each concept uses is taught by an existing Card (name it, by PEDAGOGY
   §3's test of what "teaches" means), a new vocabulary Card, or a
   one-clause definition on the front where it first appears.
4. **Ladders.** For each concept, its §0 rungs: which Cards, which Kind,
   and which rungs it skips, with the reason (§0 says which rungs it may
   skip). Procedures get their subgoal labels (§4).
5. **Task classes.** Group the hands-on Cards into 2–4 classes, from simple
   to complex (§3).
6. **Write it down** in `curriculum/<deck>/<topic-path>.md`
   (`curriculum-designer` does this). Teachers write from the plan, and
   reviewers check against it.

## 2. Time budgets and what they cost

A Card's cost is its review time × the number of reviews over its life,
roughly 10 or more. A 3-minute trace costs about half an hour; a 15-second
`basic`, two or three minutes. PEDAGOGY §4 sets the time to answer for
each Kind. `scripts/estimate-time` checks Cards against it, with a few
seconds allowed for reading the front and checking the back:

| Kind | PEDAGOGY §4 answer time | estimate-time budget (whole review) |
| --- | --- | --- |
| `basic`, `cloze` (per blank) | ~15 s | 30 s (reading an example of up to 8 lines included) |
| `basic` tagged `worked-example` | ≤ 60 s | 75 s |
| `code` (one blank), `chunk` | ≤ 30 s | 45 s |
| `code` with several blanks, `parsons`, `trace` | ≤ 60 s | 75 s |
| `explain` | ~60 s aloud | 90 s |
| any Card tagged `stretch` (§3) | — | 180 s |

The estimator also flags the trace limits it can see (input width, probe
count, nested loops, snippet length). It is a coarse model, good for
ranking and catching outliers. A reviewer or the `novice-learner` who has
actually solved the Card has the final word, and a learner's
`/card-feedback` overrules both.

## 3. Growing complexity without long Cards

The learner wants harder problems over time. A problem feels hard when it
has many interacting parts held at once; an expert holds the same problem
as a few chunks. So the way to harder problems is **more chunks, not longer
Cards.**

- **Task classes** (4C/ID). Class 1: one mechanism on a tiny input. Class 2:
  the mechanism inside a small realistic function, with the class-1 steps as
  givens. Class 3: two mechanisms combined, or the interview-shaped version.
  A class's first Card requires the previous class's top hands-on Card, so it
  unlocks only once those parts are chunks. A higher Card names lower rungs
  as single steps ("run the window loop", not each of its lines).
- **One change per step.** A Card may raise complexity *or* remove support,
  never both. A bigger task gets a worked example again (PEDAGOGY §3.1),
  then fades.
- **Use the prerequisites.** Higher Cards should genuinely exercise the lower
  ones, so reviewing the top Card also refreshes the bottom ones.
- **Stretch Cards** (`tags: [stretch]`, ≤ 180 s). The learner wants to build
  the skill of solving bigger problems, so a topic may have a few: a whole
  small problem (write the function, order a 9-line algorithm with
  distractors, design choice plus its cost). Rules:
  - at most one per ~10 Cards in a topic;
  - only at the top of a ladder, requiring the rungs it combines;
  - one defensible answer;
  - never a trace of several runs (§3.1 still holds);
  - not on the shortest path to anything; nothing requires a stretch Card
    except another stretch Card.
  A stretch Card that keeps lapsing shows which rung beneath it is missing.
  Add that rung rather than trimming the stretch Card.
- **Levels follow the ladder.** `level` 1–2 for rungs 1–2, 3 for rungs 3–5,
  4–5 for capstones, class-3 Cards and stretch Cards. Depth (`requires`) does
  the ordering; `level` only labels.

## 4. Subgoal labels

Every procedure (an algorithm, a multi-line idiom, a lifetime sequence) gets
3–5 named subgoals. Sliding window: *init · expand · shrink while invalid ·
record*. Use the same words, verbatim:
- in the worked example's step-table rows;
- in the trace and parsons prose;
- in the `code` front;
- in one `cloze` that asks for the sequence itself.

Labels let the learner chunk a procedure into steps and carry it to the
next problem. A renamed subgoal is a new thing to learn, so they are
recorded in the lesson plan. `chunk` snippets carry no comments (§4), so the
labels go in a `chunk`'s explanation instead.

## 5. The feedback loop

The learner's experience is the ground truth. When a Card took too long,
stalled on a word, or felt like bookkeeping, `/card-feedback <id> <what
happened>` diagnoses and fixes it and appends a line to
`curriculum/feedback.md`. When the same cause recurs there (the same missing
term, the same Kind over budget), run `/audit` on that area. If a rule is
missing, propose a change to PEDAGOGY.md or this file; don't make it
silently. A change to a Card's question or expected answer bumps its
`version`; the learner accepts resets.

## 6. Who does what

| Step | Agent / skill | Writes |
| --- | --- | --- |
| Plan a topic | `curriculum-designer` | `curriculum/<deck>/<topic>.md` |
| Write Cards | `cpp-teacher` (C++), `systems-teacher` (DS&A, systems, LeetCode, HFT design) | Cards |
| Wire `requires` | `prereq-mapper` | `requires` lines |
| Attempt Cards cold | `novice-learner` | `curriculum/reviews/…-learner.md` |
| Review against the standard | `learning-designer` | findings (returned) |
| Kind templates and self-checks | `card-craft` skill (preloaded into the teachers and the planner) | — |
| Whole pipeline | `/teach <deck>/<topic> [goal]` | all of the above |
| One Card the learner struggled with | `/card-feedback <id> <what happened>` | Card fix + `curriculum/feedback.md` |
| Sweep an existing area | `/audit <deck>[/<topic>] [--fix]` | `curriculum/reviews/…-audit.md` (+ fixes) |
