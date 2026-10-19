# How a topic is taught

`PEDAGOGY.md` decides how one Card teaches. This decides how a **topic** is
taught: in what order Cards arrive, how long each may take, and how the work
grows harder without any one Card growing long. Where the two overlap,
PEDAGOGY.md wins. The evidence behind each rule is in `curriculum/RESEARCH.md`.
The agents and skills that apply it are listed in §8.

The constraint that shapes everything: there is no lecture. The learner meets
a topic only through Cards, in the order `requires` unlocks them, and every
Card stays in review for years. So the teaching lives in the *sequence*, and
every second a Card costs is paid on every review (§3).

## 1. Planning a topic (before any Card is written)

1. **Goal and capstones.** One or two sentences on what the learner can do at
   the end, in an interview or at work ("write `push_back` with the strong
   guarantee and explain every line"). Name 1–3 capstone Cards that test it.
2. **Work backwards.** For each capstone ask: what must already be a chunk in
   long-term memory so that this fits in ~4 working-memory slots? Repeat
   until you reach what Cards already teach, or general programming. That
   list, in dependency order, is the topic's concepts. Each concept is one
   sentence.
3. **Vocabulary sweep.** Every term, symbol, notation and library name each
   concept uses is taught by an existing Card, a new vocabulary Card, or a
   one-clause definition where it first appears (PEDAGOGY §3,
   novice-complete).
4. **Task classes.** Group the concepts' hands-on Cards into 2–4 classes from
   simple to complex (§4). Within a class, support fades; the next class
   starts again with more support on a bigger task.
5. **Write the plan down** in `curriculum/<deck>/<topic-path>.md`, which
   `curriculum-designer` produces. Teachers write from the plan; reviewers
   check against it.

## 2. The lesson ladder, rung by rung

PEDAGOGY §0's ladder (meet → worked → recognise → produce → run → talk), made
concrete: which Kind goes on each rung, and its time tier (§3). Each rung
`require`s the one before it. A concept takes only the rungs it needs:

- a fact or rule: 0–1 and 6;
- a mechanism or algorithm: 1–5, then 8;
- an idiom: 1, 4 and 5 (`chunk` → `code`);
- a design trade-off: 1, 6 and 8.

| Rung | Purpose | Kind | Tier |
| --- | --- | --- | --- |
| 0 Puzzle *(optional)* | pose the problem before the rule, with concrete values; the back teaches it fully | `basic` (predict / "what goes wrong?") | T1 |
| 1 Meet | one fact, the problem it solves, a 3–8 line example | `basic` / `cloze` | T1 |
| 2 Worked | the procedure fully worked on a tiny input, steps labelled with subgoals (§5) | `basic` whose back is a ≤ 6-row step table | T2 |
| 3 Faded | the same procedure, a *different* tiny input, only the last step left to do | `cloze` / `code` with one blank | T2 |
| 4 Predict | one run, one input, 1–3 probes at decision points | `trace` (PEDAGOGY §3.1) | T3 |
| 5 Produce | assemble, then write, the load-bearing part | `parsons` (no distractors) → `code` (one blank) → `parsons` with 1–2 bug distractors or `code` with the core blanked | T2–T3 |
| 6 Discriminate | the look-alike, the misconception, the symptom | contrast `basic`, misconception `basic`/`trace` (PEDAGOGY §4) | T1–T2 |
| 7 Transfer | the same idea in a new problem of the next task class; earlier rungs are now single steps | `code` / `trace` / `parsons` | T3 |
| 8 Talk | answer aloud; the 5 rubric items are the claims of the rungs below | `explain`; plus mixed "which pattern?" Cards (§6) | T4 |

Order: **predict before produce.** For anything with steps, the learner reads
and runs code (rungs 2–4) before writing it (rung 5). That is PEDAGOGY §1's
"reading before writing" and the PRIMM order (Predict → Run → Investigate →
Modify → Make). *Note for review: PEDAGOGY §0 currently lists "Run it" after
"Produce it"; one of the two should change.*

**Skip what the learner already knows.** Scaffolds help novices and get in the
way of people who already know the material (the expertise-reversal effect).
For ideas a Go programmer already holds (loops, slices as views, hashing as a
concept, recursion), skip rungs 0–3 and start at the C++ difference: a
misconception or contrast Card, then a hands-on one. Go-to-C++ transfer is
rung 6 material.

## 3. Time budgets

A Card's cost is its review time × the number of reviews over its life,
roughly 10 or more. A 3-minute trace costs about half an hour; a 15-second
`basic` costs two or three minutes. Budgets are total review time: read the
front, solve, check the back.

| Tier | Budget | Typical Kinds | What it may ask |
| --- | --- | --- | --- |
| T1 recall | ≤ 20 s | `basic`, `cloze` (per blank) | one fact, rule, contrast or prediction |
| T2 apply | ≤ 45 s | `code` (one blank), `chunk`, worked `basic` | one decision in ≤ 10 lines; read a worked example |
| T3 simulate / assemble | ≤ 75 s | `trace`, `parsons`, multi-blank `code` | one run within §3.1; ≤ 9 lines to order |
| T4 talk | ≤ 150 s | `explain` | 5 rubric claims, aloud |
| Stretch | ≤ 180 s | any, tagged `stretch` | a whole small problem; see §4 |

PEDAGOGY's "~15 s" (§2 rule 11) and "≤ 60 s" (§3.1) are thinking time; the
tiers add reading and checking. `scripts/estimate-time` applies these budgets
mechanically and checks the trace limits; teachers run it on every Card they
write, and reviewers treat its flags as "look here". It is a model, so a
reviewer who actually solved the Card has the final word.

## 4. Growing complexity without long Cards

The learner wants harder problems over time. A problem feels hard when it has
many interacting parts held at once. An expert holds the same problem as a few
chunks, so the way to harder problems is **more chunks, not longer Cards.**

- **Task classes.** Class 1: one mechanism on a tiny input. Class 2: the
  mechanism inside a small realistic function, with the class-1 parts as given
  steps. Class 3: two mechanisms combined, or the interview-shaped version.
  Each class `require`s the previous class's top Card, so it unlocks only once
  those parts are chunks. A Card high on the ladder names lower rungs as
  single steps ("run the window loop", not each of its lines).
- **One change per step.** A rung may raise complexity *or* remove support,
  never both. A harder task gets its worked example back first.
- **Use the prerequisites.** Higher Cards should genuinely exercise the lower
  ones, so reviewing the top Card also refreshes the bottom ones.
- **Stretch Cards** (`tags: [stretch]`): the learner explicitly wants to
  build the skill of solving bigger problems, so a topic may have a few
  Cards up to 180 s. At most one per ~10 Cards in a topic, only at the top of
  a ladder (they `require` the rungs they combine), never a trace of several
  runs, and always one defensible answer. If a stretch Card keeps lapsing,
  that shows which rung beneath it is missing; add that rung rather than
  trimming the stretch Card.
- **Levels follow the ladder.** `level` 1–2 for rungs 0–3, 3 for rungs 4–6,
  4–5 for rungs 7–8 and stretch. Depth (`requires`) does the ordering; `level`
  only labels.

## 5. Subgoal labels

Every procedure (an algorithm, an idiom with steps, a lifetime sequence) gets
3–5 named subgoals, for example sliding window: *init · expand · shrink while
invalid · record*. Use the exact same words as comments in its worked,
faded, `parsons` and `code` Cards, and add one `cloze` that asks for the
sequence itself. Labels let the learner chunk a procedure into steps and carry
it to the next problem. Keep them identical across Cards: a renamed subgoal is
a new thing to learn.

## 6. Recognition: choosing the pattern

Knowing a pattern is not the same as recognising when it applies. Interview
problems hide which pattern they need, and blocked practice never trains
choosing one.

- Teach each pattern in its own short blocked ladder first.
- Then add **discrimination Cards**: a one-line problem statement, and the
  question "which pattern, and what feature of the statement decides it?".
  Mix look-alikes on purpose (sliding window vs two pointers vs prefix sums;
  BFS vs DFS vs Dijkstra; `unique_ptr` vs `shared_ptr` vs a plain value),
  vary the surface details, and keep one deciding feature per Card. They
  `require` the top Card of each pattern they mix, so they unlock late.
- The scheduler already interleaves reviews. These Cards add the discrimination
  task itself.

## 7. The feedback loop

The learner's experience is the ground truth. When a Card took too long,
stalled on a word, or felt like bookkeeping, `/card-feedback <id> <what
happened>` diagnoses and fixes it, and appends a line to
`curriculum/feedback.md`. Recurring causes there (the same missing term, the
same Kind over budget) become an `/audit` of that area, and, if needed, a rule
here or in PEDAGOGY.md. Changing a Card's question or expected answer bumps
its `version` (the learner accepts resets); wording-only fixes don't.

## 8. Who does what

| Step | Agent / skill | Writes |
| --- | --- | --- |
| Plan a topic | `curriculum-designer` | `curriculum/<deck>/<topic>.md` |
| Write Cards | `cpp-teacher` (C++), `systems-teacher` (DS&A, systems, LeetCode, HFT design) | Cards |
| Wire `requires` | `prereq-mapper` | `requires` lines |
| Attempt Cards cold | `novice-learner` | `curriculum/reviews/…-learner.md` |
| Review against the standard | `learning-designer` | findings (returned) |
| Whole pipeline | `/teach <deck>/<topic> [goal]` | all of the above |
| One Card the learner struggled with | `/card-feedback <id> <what happened>` | Card fix + `curriculum/feedback.md` |
| Sweep an existing area | `/audit <deck>[/<topic>]` | `curriculum/reviews/…` (+ fixes if asked) |
| Kind templates and self-checks | `card-craft` skill (loaded by every teacher dispatch) | — |

The skills add `.claude/skills/teach/briefs.md` to each dispatch, so the
agents apply this file even where their own definitions predate it.
