# How Cards in this repo teach

The authoring standard for every Card. `docs/FORMAT.md` decides what *loads*;
this decides what *teaches*. Agents in `.claude/agents/` all follow it.

The learner's goal: a solid base of associated long-term patterns that make
complex problems recognisable quickly, built as a durable habit. So: small
retrievable units, linked into a graph, met from several angles.

## 0. Who the learner is

- An experienced programmer (Go, general coding) **rebuilding** C++ and CS
  foundations, studying daily, preparing for C++ and coding interviews.
- They know variables, loops, functions, arrays, structs, maps, slices,
  pointers and goroutines as **Go** ideas. The C++ spelling and semantics of
  each still need a Card. Assume nothing else unless a Card's `requires`
  chain has taught it (§3 "Novice-complete").
- **Go is a reference, not the frame.** Teach C++ in C++ terms; the
  interviewer asks about C++, not about how it differs from Go. Mention Go
  only where a Go habit would actively mislead in C++ (unsigned `size()`,
  no garbage collector, copies by default, no `defer`), once, in the
  explanation or `elaborate`, never as the question or its answer
  options ("which Go type…"). Budget: at most ~1 Card in 10 in a topic
  names Go; a Card that would read the same with the Go clause deleted
  should have it deleted.
- **Strict terminology** (Walter Brown's standard: say what the Standard
  says). Interviewers at compiler, database and HFT shops notice loose
  words. A *lambda expression* is source code; evaluating it yields a
  *closure object* of a unique *closure type*. Stored, copied, passed and
  called is the closure object, never "the lambda". Likewise: an
  *argument* is passed, a *parameter* receives it; *declaration* vs
  *definition*; *object* (has storage and lifetime) vs *value*; *lvalue
  expression*, not "lvalue variable"; *undefined behaviour*, not "crash";
  *template* (`std::vector`) vs *specialization* (`std::vector<int>`).
  Colloquial shorthand is a finding wherever it appears on a Card.
- The end state: they recognise a pattern from a problem in seconds, produce
  its idiom from memory, and **talk about the topic confidently for a minute**
  in an interview. Every topic should lead there.
- Their time is the budget. A Card that takes minutes of bookkeeping, or
  stalls on an undefined word, costs more than it teaches (§3.1).

### The ladder: how one concept is met

Each concept climbs these rungs in order, one Card (or more) per rung, each
rung `require`-ing the one below. Skip a rung only when it adds nothing, and
say which rung and why in the report. A concept with steps never skips rungs
2 or 4; no concept skips rungs 3 or 5. A concept *has steps* when using it
changes state in an order the learner must follow (an algorithm, an ownership
transfer, overload resolution); a single rule or property (a deleted copy, a
size) has none. Proportion: a typical ladder is 4–8 cards; more means the
concept is really two, or some cards duplicate each other.

1. **Meet it**: a `basic` on one minimal concrete example of the problem it
   solves. "What goes wrong without it" is its own Card on the same rung.
2. **See it worked**: for anything with steps (an algorithm, a lifetime
   sequence, overload resolution), a worked example on a tiny input (§3.1).
3. **Recognise it**: the deciding property and the contrast with its
   look-alike, one card each (§2 rules 4, 7); add a symptom card when the
   concept is met through a symptom (a bug, a compiler error, a problem
   statement), and a cost card when its cost differs from the look-alike's.
4. **Run it**: a `trace` of one small run, within budget (reading before
   writing).
5. **Produce it**: `cloze` → `parsons` → `code` / `chunk`, from least to most
   generation, for the load-bearing tokens and the idiom. Write a `parsons`
   only when the idiom has ≥ 4 lines whose order is a decision, and a `chunk`
   only for ≥ 2 lines that recur verbatim in real code.
6. **Talk about it**: an `explain` capstone per leaf topic with ≥ 4 Cards (or
   the parent topic's capstone requires one of its Cards), its 5 rubric items
   answering its question (§4), each taught by a card it reaches, answered aloud. It
   requires the cards its rubric items come from (≤ 5); at least one is the
   concept's rung-4 or rung-5 card, so it unlocks after the learner has run
   and produced the concept. A concept stated with "and" is two ladders
   sharing one capstone.

## 1. The mental model behind the rules

- Working memory holds ~4 chunks. A card that needs more held at once fails
  as a retrieval exercise and becomes rereading. (Hermans, *The Programmer's
  Brain*; Sweller, cognitive load theory)
- Experts read in chunks and schemata from long-term memory. Cards exist to
  build those chunks (idioms, invariants, signatures, deciding properties) so
  working memory is free for the novel part of a real problem.
- Retrieval beats restudy when it is effortful but usually succeeds (Bjork,
  desirable difficulties; Dunlosky 2013). A Card failed often is mis-sized or
  out of order, not "desirably difficult". Difficulty that doesn't exercise
  the target idea is just noise.
- Reading before writing: recognise, trace and predict before producing.

## 2. Atomic cards

1. **One idea per card.** If the **bold answer** makes two independent
   claims, whatever joins them ("and", ";", ":", a list), split it; the why
   may join clauses that support that one claim. If the front has
   two questions, it is two cards. (Wozniak rule 4; Matuschak "focused")
2. **Answer size.** Lead with the answer in ≤ 15 words (bold), then ≤ 40 words
   of why. In a `basic` back, code that *is* the answer is ≤ 3 lines;
   illustrative code is ≤ 8 lines; a worked-example step table (on the
   front, §3.1) is ≤ 5 rows;
   none of these count toward the words, but a table cell or code comment
   is ≤ 6 words (longer ones count as prose). A list of > 3 items is a cloze
   series or a chunk, never one blob. Total `basic` back ≤ 60 words of prose.
3. **Precise prompt, one defensible answer.** Name the context: "in C++23",
   "for `std::vector`", "with `-O2`". (Matuschak "precise")
4. **Recognition over definition.** "This call doesn't dispatch — why?" beats
   "What is a virtual function?". Ask for the deciding property, the symptom,
   the consequence, the counter-example. (Hermans; Parent; Brown)
5. **Never leak the answer.** Not in the front, a hint, another blank, blank
   length, a chip that is the only grammatical or plausible one, a chip set
   where the prerequisites alone rule out all but one, a comment, identifier
   or function name in the shown code, the problem statement, a sibling
   card's front (a card in the same topic outside this card's `requires`
   closure; a lower rung this card requires teaches, it doesn't leak), or the
   card's id, tags or topic path (FORMAT doesn't say
   these are hidden at review, so treat them as shown; only `refs`, on the
   answer side, may name the technique). Vary identifiers and examples across cards. Test: answer using
   the prerequisites but *without this card's target idea*; if you still get
   it right (by elimination, a comment, a name, the title), it leaks.
6. **Hints narrow, never restate.** A hint names a category ("a cast",
   "a library concept"), not a synonym of the answer.
7. **Contrast pairs** for confusable things (`move`/`forward`,
   `class`/`struct`, virtual/CRTP, BFS/DFS): each gets its own card plus a
   card whose answer is the deciding property. (Wozniak interference rule)
8. **Concrete first.** Every abstract rule appears with a minimal concrete
   example: 3–8 lines of code, or a diagram of ≤ 5 boxes or nodes.
9. **Pattern + the bug it prevents.** Every idiom is paired with what goes
   wrong without it, in the back's why or as its own rung-1 card. (Pusz;
   Gregory)
10. **Canonical terms.** Use the standard's words (value category, ODR-use,
    SFINAE context), and no history unless it explains the design. (Brown)
11. **Answerable in ~15 s.** Longer is an `explain` or a hands-on card.
12. **Don't memorise lookups.** API lists and derivable trivia stay out; the
    structure that lets you find them goes in. (Nielsen)
13. **Self-contained.** Everything the learner needs is on the card. Never
    lean on a problem number, another card or an outside example: "LC 209"
    or "the next card" means nothing to someone who hasn't memorised it.
    Name a problem and state it in one line ("Minimum Size Subarray Sum:
    shortest subarray with sum ≥ target, all values positive"). The
    number may follow the name in parentheses, as a lookup handle only, and
    belongs in `refs` as the problem's URL. Exception, a recognition card:
    if the problem's name names the technique ("Sliding Window Maximum"), the
    name goes only on the back and in `refs`; the front states the problem
    neutrally.
14. **Mixed recognition.** Depth ordering meets a topic as a block, but the
    interview skill is choosing between patterns. Once ≥ 2 patterns have
    recognition cards, add cards that state a problem in one line and ask
    one thing: which pattern applies (the cue is the back's why), or the cue
    alone when the candidates are listed on the front. Draw the look-alikes
    from different topics. For a C++ feature the "problem" is a one-line
    situation ("one config, two readers that outlive each other") and the
    answer is the feature. State the constraint that forces a pattern as
    sizes or counts ("n ≤ 10⁹, 10⁵ queries"), never as a target complexity,
    which names the technique by elimination. Each requires the recognition card of every
    pattern named in its answer (≤ 3); if one is missing, write it first.
    (Rohrer & Taylor 2007; Kornell & Bjork 2008)

## 3. Sequencing (`requires`)

- Vocabulary → single mechanism → interaction → judgement/trade-off. A card
  needs only what its `requires` provide. (Sweller isolated-then-integrated)
- Only **direct** prerequisites: "can't answer this without that". Fan-in
  ≤ 2 concept edges (3 for a mixed-recognition card), plus up to 2 vocabulary
  cards that only supply a term the card uses. An `explain` capstone may
  require one card per rubric item (≤ 5). More means the card should be split.
- Follow the §0 ladder; a card requires the nearest lower rung that exists
  for its concept (within rung 5: cloze, then parsons, then code/chunk). A
  worked example comes before any trace or rule-recall card for a multi-step
  sequence; `code`/`trace` require the concept card they exercise; `explain`
  capstones require the cards their rubric items come from.
- Misconception card directly after (requires) the concept it corrects.
- **Novice-complete.** Assume nothing beyond the §0 baseline. Every term, symbol, notation, library name and language construct
  a card uses is either defined on the **front** in one clause (at most one
  such definition per card, never of the card's own target idea) or taught
  by a card its `requires` chain reaches, meaning a card whose front asks
  about the term or whose bold answer is the term (a passing mention doesn't
  teach). The back introduces only the target idea. To supply a term,
  require the **lowest rung** that teaches it (its rung-1 or rung-3 `basic`),
  never a `trace`, `code`, `parsons`, `chunk` or `explain` card: those pull the
  whole hands-on chain upstream and lock the card behind unrelated practice. A depth-0 card uses
  nothing beyond the §0 baseline; `level: 1` alone doesn't make a foundation. "Vocabulary" cards are not trivia when a later
  card leans on the word: they are the foundation, and they come first.
  A vocabulary card is still recognition: show a 3–8-line example and ask
  which part is the term ("which expression here is the prvalue?"), not
  "define X".

### 3.1 Working-memory budget for `trace` (and any card you simulate in your head)

Simulating code costs working memory, and there are only ~4 slots. A trace
teaches when the learner can hold the whole run; past that it becomes
bookkeeping. (Sweller, element interactivity; Hermans ch. 4–5)

- **One run.** One input, one call. Comparing runs is several cards, or a
  `basic` that asks for the deciding property.
- **Small.** ≤ 5 elements of input, ≤ 4 loop iterations, ≤ 8 state changes
  in total, and ≤ 4 changing values held at once (each loop variable,
  pointer, call frame or array element the code writes counts as one; input
  shown on screen and never written does not). ≤ 3 probes, each at a decision
  point (a branch, or the statement where state changes hands: a move, a
  destructor run, a reassignment), ≤ 2 values each (a probe of n numbers
  counts n). The back explains only this run.
- **≤ 60 s** for someone who knows the concept. If it takes longer, shrink it.
- **No extraneous machinery.** No comma-operator counters, instrumented
  lambdas, helper types, or side effects inside an expression (`a[i++]`)
  the learner must decode before the lesson starts.
- **Formula lessons are not traces.** If the point is a count or a bound
  (n − 1 comparisons on sorted input), ask for it as reasoning (`basic`/`cloze`),
  maybe with a 2–3 element example, not as a simulation.
- **Worked example first, then fade.** (a) A `basic` (tag `worked-example`)
  whose **front shows** the tiny input and the full annotated step table
  (≤ 5 rows), then asks one self-explanation question about the row that
  decides the outcome ("why does bar 0 pop at i = 2?"). Its back answers why
  (≤ 15 + 40 words). It never asks for the outcome itself, and its
  `requires` closure teaches every term in the table. (b) Optionally a `trace` on the same input
  with every row given except one probe. (c) The full `trace` on a different
  input. (b) and (c) are rung 4: (b) requires (a) and the concept's
  deciding-property card; (c) requires (b), or (a) and the deciding-property
  card if there is no (b). This applies to any multi-step
  sequence, not only algorithms: lifetimes, overload resolution, pointer
  arithmetic. (Sweller & Cooper, worked-example effect; Renkl, fading; Chi,
  self-explanation)

## 4. Which kind, when

| Kind | Use for | Rules |
| --- | --- | --- |
| `basic` | a fact, rule, reason, contrast | §2 sizes; one question |
| `cloze` | the load-bearing token in a sentence or a snippet of ≤ 8 lines | ≤ 3 cloze numbers, ideally 1–2; assume sibling items show filled (FORMAT doesn't say), so no cN may give away another; prefer a single-item cloze as a prerequisite (a cloze counts as known only when every item is); never blank what grammar gives away; escape `\::` |
| `code` | producing the semantically significant part (`noexcept`, the constraint, the bound) | one blank ideally, ≤ 10 lines; distractors are *plausible misconceptions*; distractors include the most common wrong answer; the harness checks the property the front states (not only that the offered distractors fail) and fails every distractor at compile time (for an index or bound, assert the key at the last element, absent keys below and above all elements, and a run of duplicates); the front never states the answer |
| `trace` | mechanism and misconception exposure | 5–15 lines; within the §3.1 budget; probe decision points, not every step; values verified by running |
| `parsons` | ordering an idiom or algorithm | ≤ 9 movable lines, each with exactly one right place; ≤ 1 `#include`; interchangeable declarations on one line; 0–2 distractors that encode a real mistake; compile harness pins values |
| `chunk` | idioms that should become automatic | ≤ 7 lines counting `#include`s, ≤ 80 chars, one statement per line, no trailing comments; order-determined, recurs in real code; `expose_ms` = 1500 × lines + 2000, clamped to 4000–12000, and reread the snippet at that duration; explanation names the idiom and why each line exists; `constexpr` harness where possible |
| `explain` | mechanisms that are more than a list of facts | the front asks one clear question (why, how, what goes wrong, which would you pick) and names the listener, and never lists the rubric's topics or their order; exactly 5 rubric items (docs/FORMAT.md asks for at least five), and every item is part of the answer to *that* question: a true fact that answers something else goes in `elaborate` or another card; items are plain claims with no slot labels ("Problem:", "Cost:") and no fixed order, written in the order a good spoken answer takes; each is one distinct claim a listener can tick from speech alone ("names X because Y"), ≤ 20 words, with no code to spell out; a front that names a concrete problem is graded on that problem's answer, never on a different example problem, and no item merely restates the question ("Example: Kth Largest Element" on a k-th-largest question); one concept or one problem per card (five problems are five cards or a mixed-recognition series); while writing, check the answer against problem solved → mechanism → example → cost → pitfall (for a which-technique question: cue → pattern → complexity → look-alike) and include the ones the question needs, not all of them; a bigger topic is several `explain` cards + a synthesis capstone of exactly 5 items that requires them |

**Time to answer**, for someone who knows it (a rung-1 card is judged by
whether, after one viewing of its back, it is retrievable in that time): `basic`/`cloze` ~15 s (a `worked-example` basic ≤ 60 s, reading its table
included);
`code`/`chunk` ≤ 30 s; `parsons`/`trace` ≤ 60 s; `explain` ~60 s aloud.

**Misconception cards** (`tags: [misconception]`): the front states the belief
a competent engineer actually holds as a neutral premise ("Many expect X."),
then asks for a specific result about ≤ 8 lines of code or a ≤ 5-element
input (a value, the
overload chosen, the line that fails, the rule that makes it UB) with ≥ 3
plausible outcomes, rather than a true/false guess. Test: swap the belief for
its opposite; if the answer is still obvious, rewrite. No strawmen. Back within §2 rule 2: the bold correction (≤ 15 words),
the refuting code (≤ 8 lines), and why the belief is tempting (≤ 40 words).
Always an `elaborate` prompt tying it back to the learner's own code, or
to a Go habit when that habit is the source of the belief (§0).

**`elaborate`**: every card carries one, except a `basic` with no `requires`
and a `worked-example` card. Phrase it to be said aloud: "Say in one sentence, as to an interviewer, why…",
"what would break if…", "when would you not…", "where else does this shape
appear?". One sentence, answered aloud or typed in 1–3 sentences; the app
shows the last answer next time (FORMAT §4.10), so ask something the learner
can extend (a new place the shape appears), not restate.

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
- **Feynman / Oakley / Sanderson**: plain words first; a puzzle whose every
  piece is already in the `requires` chain; find where the explanation
  hand-waves, and make that a card.

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
Carruth, "There Are No Zero-cost Abstractions" (CppCon 2019). Sweller &
Cooper, "The use of worked examples…" (1985). Renkl, "Learning from worked-out
examples" (fading). Chi et al., self-explanation (1989). Rohrer & Taylor,
"The shuffling of mathematics problems improves learning" (2007). Kornell &
Bjork, "Learning concepts and categories" (2008).
