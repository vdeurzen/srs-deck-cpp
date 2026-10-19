---
name: audit
description: Sweep an existing Deck or topic for Cards that take too long, assume undefined background, skip a rung, or combine too many ideas. A simulated learner attempts every Card cold (novice-learner), learning-designer reviews it, and estimate-time / lint-shape / graph do the mechanical part. The result is one decision per Card in curriculum/reviews/; with --fix the teachers apply it. Use periodically, or when /card-feedback shows a recurring cause.
argument-hint: <deck>[/<topic-prefix>] [--fix]
disable-model-invocation: true
---

# /audit $ARGUMENTS

Audit `<deck>[/<topic-prefix>]` against PEDAGOGY.md and TEACHING.md, as the
learner would meet it. Read-only unless `--fix` is given.

## 1. Mechanical pass
    scripts/estimate-time <deck> [--topic <prefix>]
    scripts/lint-shape <deck> [--topic <prefix>]
    scripts/graph cpp-essentials interview-essentials cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode --topic <deck>/<prefix>
Also read `curriculum/feedback.md` entries for the scope.

## 2. Learner and reviewer passes
Split the scope's Cards into batches of ~25 by topic, in `requires` order. For
each batch, dispatch `novice-learner` and `learning-designer` (with the
reviewer brief from `.claude/skills/teach/briefs.md`) in parallel
(at most ~8 agents at once; for a whole Deck, run batches in waves). Each
learner writes its report under `curriculum/reviews/`; reviewers return
findings to you.

## 3. Decide per Card
Write `curriculum/reviews/<date>-<scope>-audit.md`. One line per Card that
needs something; Cards not listed are OK:

    <qid> | <decision> | <what, ≤ 20 words> | <bump?>

Decisions: `SHRINK` (keep the lesson, cut the load) · `CONVERT` (a count or
rule asked as a trace → `basic`/`cloze`) · `WORKED FIRST` (add a worked
example beneath it) · `SPLIT` · `REQUIRE <qid>` · `DEFINE <clause>` · `NEW
VOCAB <one line>` · `SHARPEN` (ambiguous or leaking) · `FIX` (wrong) · `LATER`
(belongs after the sprint, or in a deeper Deck; moving it would orphan its
history, so recommend a new Card in the right place and leave this one, or
pause it).
End with a summary: counts per decision, the recurring gaps with the one fix
that covers each, and the five changes that would help the learner most.

## 4. Without --fix
Report the summary and the path to the audit file, and stop. The learner
decides what to apply.

## 5. With --fix
- Check `git status` for uncommitted Card edits you didn't make, and leave
  those Cards out (list them).
- Dispatch the right teacher per batch with the audit file, its lines for
  that batch and the teacher brief (`.claude/skills/teach/briefs.md`);
  `prereq-mapper`, with its brief, for the REQUIRE lines and new Cards' seams. Then
  rerun `novice-learner` on the changed Cards only.
- Done means the validate and check-code commands in CLAUDE.md print 0 errors,
  `scripts/check-code --remote --id <changed compile-graded ids>` passes, and
  `scripts/estimate-time` shows nothing over budget in scope that the audit
  file doesn't justify.
- Append what was applied to the audit file. Commit once per Deck if the
  session's git rules allow.
