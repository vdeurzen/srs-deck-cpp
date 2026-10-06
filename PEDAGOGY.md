# How Cards in this repo teach

The authoring standard for every Card. `docs/FORMAT.md` decides what *loads*;
this decides what *teaches*. Agents in `.claude/agents/` all follow it.

The learner's goal: a solid base of associated long-term patterns that make
complex problems recognisable quickly, built as a durable habit. So: small
retrievable units, linked into a graph, met from several angles.

## 1. The mental model behind the rules

- Working memory holds ~4 chunks. A card that needs more held at once fails
  as a retrieval exercise and becomes rereading. (Hermans, *The Programmer's
  Brain*; Sweller, cognitive load theory)
- Experts read in chunks and schemata from long-term memory. Cards exist to
  build those chunks (idioms, invariants, signatures, deciding properties) so
  working memory is free for the novel part of a real problem.
- Retrieval beats restudy, when it is effortful but succeeds (~85 %). Difficulty
  that doesn't exercise the target idea is just noise. (Bjork; Dunlosky 2013)
- Reading before writing: recognise, trace and predict before producing.

## 2. Atomic cards

1. **One idea per card.** If the answer contains "and", split it. If the front
   has two questions, it is two cards. (Wozniak rule 4; Matuschak "focused")
2. **Answer size.** Lead with the answer in ≤ 15 words (bold), then ≤ 40 words
   of why. Code answers ≤ 3 lines. A list of > 3 items is a cloze series or a
   chunk, never one blob. Total `basic` back ≤ 60 words of prose.
3. **Precise prompt, one defensible answer.** Name the context: "in C++23",
   "for `std::vector`", "with `-O2`". (Matuschak "precise")
4. **Recognition over definition.** "This call doesn't dispatch — why?" beats
   "What is a virtual function?". Ask for the deciding property, the symptom,
   the consequence, the counter-example. (Hermans; Parent; Brown)
5. **Never leak the answer.** Not in the front, not in a hint, not by blank
   length or a unique surface cue. Vary identifiers and examples across cards.
6. **Hints narrow, never restate.** A hint names a category ("a cast",
   "a library concept"), not a synonym of the answer.
7. **Contrast pairs** for confusable things (`move`/`forward`,
   `class`/`struct`, virtual/CRTP, BFS/DFS): each gets its own card plus a
   card whose answer is the deciding property. (Wozniak interference rule)
8. **Concrete first.** Every abstract rule appears with a minimal concrete
   example: 3–8 lines of code, or a small diagram of memory/stack/tree.
9. **Pattern + the bug it prevents.** Every idiom card says what goes wrong
   without it. (Pusz; Gregory)
10. **Canonical terms.** Use the standard's words (value category, ODR-use,
    SFINAE context), and no history unless it explains the design. (Brown)
11. **Answerable in ~15 s.** Longer is an `explain` or a hands-on card.
12. **Don't memorise lookups.** API lists and derivable trivia stay out; the
    structure that lets you find them goes in. (Nielsen)

## 3. Sequencing (`requires`)

- Vocabulary → single mechanism → interaction → judgement/trade-off. A card
  needs only what its `requires` provide. (Sweller isolated-then-integrated)
- Only **direct** prerequisites: "can't answer this without that". Fan-in 1–2,
  rarely 3. More means the card should be split.
- Worked example before rule recall; `code`/`trace` require the concept card
  they exercise; `explain` capstones require the cards their rubric items
  come from.
- Re-angle a mature idea in a costlier kind as it matures:
  basic → cloze → code → trace → parsons → explain.
- Misconception card directly after (requires) the concept it corrects.

## 4. Which kind, when

| Kind | Use for | Rules |
| --- | --- | --- |
| `basic` | a fact, rule, reason, contrast | §2 sizes; one question |
| `cloze` | the load-bearing token in a sentence or short snippet | ≤ 3 blanks, ideally 1–2; never blank what grammar gives away; escape `\::` |
| `code` | producing the semantically significant part (`noexcept`, the constraint, the bound) | one blank ideally, ≤ 10 lines; distractors are *plausible misconceptions*; harness fails every distractor at compile time; the front never states the answer |
| `trace` | mechanism and misconception exposure | 5–15 lines; probe decision points, not every step; values verified by running |
| `parsons` | ordering an idiom or algorithm | ≤ 9 movable lines, each with exactly one right place; ≤ 1 `#include`; interchangeable declarations on one line; 0–2 distractors that encode a real mistake; compile harness pins values |
| `chunk` | idioms that should become automatic | ≤ 7 lines, order-determined, recurs in real code; explanation names the idiom and why each line exists; `constexpr` harness where possible |
| `explain` | mechanisms that are more than a list of facts | exactly 5 rubric items, each a distinct checkable claim ("names X because Y"); a bigger topic is several `explain` cards + a ≤ 5-item synthesis capstone that requires them |

**Misconception cards** (`tags: [misconception]`): the front states a belief a
competent engineer actually holds, neutrally (prefer "what happens?" with code
to "true or false"). No strawmen. Back: what really happens, why the belief is
tempting, minimal refuting code. Always an `elaborate` prompt tying it back to
the learner's own code or Go experience.

**`elaborate`**: "what would break if…", "when would you not…", "where else
does this shape appear?". One sentence, answerable in 1–3.

## 5. Teaching voices to borrow

- **Kate Gregory**: what to write now, not history; standard library first;
  "who owns this?"; spot-the-C-ism; kind, non-shaming tone.
- **Walter E. Brown**: state the problem the feature solves before the syntax;
  build metaprogramming from small named steps; exact standard terms; a
  minimal rule demo, then the variant that breaks it.
- **Phil Nash**: test-first as a learning tool ("here's the failing assertion —
  minimal code?"); survey the options before prescribing (error channels:
  optional/expected/exceptions/codes); frame choices by "what must the caller
  do?"; small steps.
- **Mateusz Pusz**: make wrong code unrepresentable; "what bug does this type
  prevent?"; judge an API by what the user writes and can get wrong; state the
  compile-time vs run-time cost.
- **Sean Parent**: name the algorithm hiding in the raw loop; local reasoning;
  regular types; pre/postconditions and invariants per function; value
  semantics over shared state.
- **Andrei Alexandrescu**: start from the problem that forces the abstraction;
  minimal interface; counter-intuitive measurements break performance myths;
  policy vs host.
- **Chandler Carruth**: think about the machine (source + the assembly line
  that costs); what the optimiser may assume (UB as input); no zero-cost
  abstractions — name the cost and who pays it; benchmarks lie without care.
- **Felienne Hermans**: name the pattern so it becomes a chunk; trace by hand;
  read before write; variable roles; misconceptions as first-class content.
- **Klaus Iglberger / Nicolai Josuttis**: before/after refactoring steps;
  edge-case completeness as a source of sharp gotcha cards.
- **Feynman / Oakley / Sanderson**: plain words first; a puzzle before the
  rule; find where the explanation hand-waves, and make that a card.

## Sources

Hermans, *The Programmer's Brain* (2021). Sweller, van Merriënboer & Paas,
"Cognitive architecture and instructional design" (1998). Bjork & Bjork,
desirable difficulties. Dunlosky et al., "Improving students' learning…"
(2013). Wozniak, "20 rules of formulating knowledge". Matuschak, "How to write
good prompts" (andymatuschak.org/prompts). Nielsen, "Augmenting long-term
memory". Gregory, "Stop Teaching C" (CppCon 2015). Parent, "C++ Seasoning"
(GoingNative 2013). Nash, "Test Driven C++" (CppCon 2020), "Modern C++ Error
Handling" (CppCon 2024). Pusz, "A C++ Approach to Physical Units" (CppCon
2019). Alexandrescu, "Speed Is Found in the Minds of People" (CppCon 2019).
Brown, "Modern Template Metaprogramming: A Compendium" (CppCon 2014).
Carruth, "There Are No Zero-cost Abstractions" (CppCon 2019).
