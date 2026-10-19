---
name: teach
description: Teach a topic from the ground up as a chain of srs Cards. Plans the topic (curriculum-designer), writes the Cards (cpp-teacher / systems-teacher), wires `requires` (prereq-mapper), has a simulated learner attempt every Card cold (novice-learner) plus a pedagogy review (learning-designer), applies the fixes, validates and commits. Use for a new topic, or to rebuild a topic that assumes too much or takes too long.
argument-hint: <deck>/<topic-path> [goal…] [--plan-only]
disable-model-invocation: true
---

# /teach $ARGUMENTS

Run TEACHING.md's pipeline for one topic. The first argument is
`<deck>/<topic-path>` (an existing or new directory under `<deck>/topics/`);
the rest is the goal in the learner's words, if given. `--plan-only` stops
after step 2.

You orchestrate; agents do the writing. Keep their reports, not their file
dumps. Every dispatch carries the matching block from
[briefs.md](briefs.md) after the task itself. Tell the learner one line per step: what happened, and what's next.

## 0. Preflight
- Read `CLAUDE.md`, `TEACHING.md`, and skim `PEDAGOGY.md`.
- `git status --short -- <deck>/topics/<topic-path>`: if Cards in scope have
  uncommitted changes you didn't make, another session is working there.
  Stop and ask, rather than editing over them. Work in a worktree or a
  branch, as CLAUDE.md or the session's instructions require.
- Pick the teacher. C++ language and library Cards (`cpp-*` Decks, and the
  implement-std and trivia topics of `interview-essentials`/`hft-interview`)
  go to `cpp-teacher`. Algorithms, data structures, systems, LeetCode and HFT
  design go to `systems-teacher`.

## 1. Measure what's there
    scripts/graph cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode --topic <deck>/<topic-path>
    scripts/estimate-time <deck> --topic <topic-path> --summary
Note the Card count, the depth range, and how many Cards are over budget.

## 2. Plan
Dispatch `curriculum-designer` with the topic, the goal, and the step-1 numbers.
It writes `curriculum/<deck>/<topic-path>.md`. Read the plan yourself and check:
- every concept has a ladder, and procedures have worked → faded → trace
  before produce;
- no Card is over its tier, and stretch Cards are ≤ 1 per ~10 and at the top;
- new ids don't collide, and `requires` stay within the Deck's relations;
- the vocabulary sweep left nothing undefined.
Send it back once with concrete fixes if it fails these. If the plan's open
questions would change what gets built, ask the learner (one AskUserQuestion,
≤ 3 questions); otherwise pick the default and say which. With
`--plan-only`, report the plan's path and summary and stop here.

## 3. Write
Split the plan into batches of ≤ 12 Cards by task class, lowest class first.
A batch may only `require` Cards that exist or that an earlier batch writes.
For each batch, dispatch the teacher with the plan path, the batch's ids,
"existing Cards change only as the plan's status column says", and the
teacher brief. Batches that don't depend on each
other may run in parallel. Keep each teacher's agent id: fixes go back to the
same agent (SendMessage) so it keeps its context.

## 4. Wire
Dispatch `prereq-mapper` for the topic, plus any seam the plan names (for
example "the topic's entry Cards ↔ cpp-essentials/basics/05-classes"). It adds
only the edges the plan didn't already set.

## 5. Check (in parallel)
- `novice-learner` on the topic's new and changed Cards, in `requires` order.
- `learning-designer` on the same Cards, with the plan path, so it can check
  each Card against its rung and tier.

## 6. Fix
Merge both reports into one list: majors first, deduplicated, one line each
with the fix. Send each teacher its Cards' findings. One round; a second
round only for remaining majors. Findings you decide not to apply go in the
report with the reason.

## 7. Done means
From the repo root, all of these:

    tool/validate cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode   # 0 errors
    scripts/check-code cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode   # 0 FAIL/WEAK
    scripts/check-code <deck> --remote --id <new or changed compile-graded ids>   # ok
    scripts/estimate-time <deck> --topic <topic-path>   # nothing over budget that the report doesn't justify

Then commit once for the topic (`feat: Teach <topic> …`), if the session's git
rules allow it.

## 8. Report (to the learner)
≤ 15 lines: concepts covered; Cards new / changed (with version bumps) /
untouched; deepest chain and how many study days it takes to unlock at the
learner's pace; the time profile (median per Kind, stretch Cards); the
learner-simulation summary (where it stalled before and after the fixes);
anything left open. Link the plan file.
