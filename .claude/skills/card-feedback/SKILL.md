---
name: card-feedback
description: Fix a Card the learner struggled with during review. Takes a card id (or several) and what happened ("took 3 minutes", "didn't know what Lomuto is", "two answers seemed right"), diagnoses the cause, fixes the Card (shrink, split, add a rung beneath it, add a prerequisite, define a term), bumps `version` if the question changed, validates, and logs it in curriculum/feedback.md. Use when the learner reports a problem with a specific Card.
argument-hint: <card-id>[,<card-id>…] <what happened>
---

# /card-feedback $ARGUMENTS

The learner just met a Card that didn't work for them. Their experience is
the ground truth: don't argue it away, find the cause. The first argument is
one or more card ids (bare or `<deck>/<id>`, comma-separated); the rest is
what happened.

## 1. Find and read
- Locate each Card: `grep -rlx "id: <id>" */topics`. For a bare id that
  exists in several Decks, prefer the active ones (`cpp-essentials`,
  `interview-essentials` during the sprint) and say which you picked.
- If `git status` shows the file has uncommitted changes you didn't make,
  another session is editing it: report the diagnosis and the proposed fix
  instead of editing.
- Read the Card, its direct `requires`, and the names of its transitive
  closure (`scripts/graph … --topic <its topic>` helps). Run
  `scripts/estimate-time <deck> --id <id>`.
- Read `curriculum/feedback.md` for earlier entries on this Card or topic.

## 2. Diagnose
Name the cause(s) from the list in `curriculum/feedback.md`. Ask: what would
the learner have had to hold in mind, or already know, to answer this in its
tier (TEACHING §3)? Where exactly did that break? If the complaint is vague
("confusing"), attempt the Card yourself as `novice-learner` would, or
dispatch that agent on this one Card.

## 3. Fix, smallest that removes the cause
| Cause | Default fix |
| --- | --- |
| too-long, bookkeeping | shrink to one run / fewer probes / a smaller input (PEDAGOGY §3.1); a count or bound becomes a `basic`/`cloze` |
| missing-rung | add the worked example or the simpler Card beneath it (TEACHING §2) and `require` it |
| unknown-term | `require` the Card that teaches it (grep the allowed Decks); else a one-clause definition; else a new vocabulary Card |
| too-many-ideas | split: the original id keeps the part closest to its front |
| ambiguous, leaks | sharpen the front so exactly one answer survives; vary the surface cue |
| wrong | verify against the source or by compiling and running, then correct |
| too-easy | leave it, or move the next rung's question onto it if that rung is missing |

Edit one Card yourself, following `card-craft`. For new Cards or splits of
more than one Card, dispatch the right teacher (`cpp-teacher` for C++,
`systems-teacher` for algorithms, systems and LeetCode) with your diagnosis,
the fix, and the teacher brief from `.claude/skills/teach/briefs.md` (there's
no lesson plan; the rung and tier come from your diagnosis). Bump `version` when the question or the expected answer changed;
not for wording, refs or `requires`.

## 4. Done means
    tool/validate cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode   # 0 errors
    scripts/check-code <deck> --id <changed compile-graded ids> && scripts/check-code <deck> --remote --id <same>
    scripts/estimate-time <deck> --id <changed and new ids>   # within tier

## 5. Log and report
Append one line per Card to `curriculum/feedback.md` in its format. If this
topic now has 3+ entries with the same cause, recommend `/audit
<deck>/<topic>` in your report. Tell the learner in ≤ 5 lines: the cause, what
changed, whether the Card resets (version bump) and what new Cards will
appear. Commit if the session's git rules allow (`fix: <id> — <cause>`).
