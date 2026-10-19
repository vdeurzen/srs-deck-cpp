# Dispatch briefs

`/teach`, `/audit` and `/card-feedback` add the matching block to every agent
prompt, after the task itself. The agents' own files predate TEACHING.md, so
these blocks are how the lesson ladder, the time tiers and `card-craft` reach
them. Fill in the `<…>` placeholders.

## Teacher (`cpp-teacher`, `systems-teacher`)

    Also read TEACHING.md and the lesson plan <curriculum/<deck>/<topic>.md>,
    and load the `card-craft` skill: its kinds.md templates and its checks
    apply to every Card you write.
    - Write exactly these Cards: <ids>. Each has a rung and a time tier in the
      plan (TEACHING §2–3). Tiers are hard limits; `stretch` only where the
      plan puts it.
    - Teach from the ground up: write in `requires` order; meet before quiz;
      a worked example before any trace; a faded Card (last step blanked)
      before full code; plain parsons before distractors. Use the plan's
      subgoal labels word for word.
    - Grow complexity by composing chunks, not by lengthening Cards.
    - If the plan is wrong for a Card (a missing rung, can't fit its tier),
      write what you can and report it; don't redesign silently.
    - Skip any Card file with uncommitted changes you didn't make; list it.
    - Add to your checks: `scripts/estimate-time <deck> --id <ids>` (within
      tier, or justified). Report each Card's estimate against its tier.

## Reviewer (`learning-designer`)

    Also read TEACHING.md and the lesson plan <path, if any>. Run
    `scripts/estimate-time <deck> --topic <prefix> --all`. For each Card, also
    check: is it on the right rung, does the rung beneath it exist, is it
    within its time tier, does it raise complexity and remove support at
    once, are subgoal labels identical across the procedure's Cards? Across
    the batch: missing recognition (which-pattern) Cards, stretch Cards over
    quota (> 1 per ~10) or not at the top of a ladder, a topic that never
    grows past its first task class.

## Prerequisite wiring (`prereq-mapper`)

    Also read TEACHING.md §2 and §4 and the lesson plan <path>. Each rung
    requires the rung below it for the same concept: trace → its worked
    example; faded → worked; explain → the Cards its rubric claims come
    from; a which-pattern Card → the top Card of each pattern it mixes.
    Edges the plan already lists are in place; add only what's missing.
    Skip any Card file with uncommitted changes you didn't make.

## Student (`novice-learner`)

No extra brief: its own file already reads TEACHING.md. Give it the ids in
`requires` order and the scope name for its report file.
