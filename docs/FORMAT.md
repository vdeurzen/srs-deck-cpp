# Deck format

Exported from the srs app at 6e2c0da+uncommitted by `tools/export_deck_kit.sh`. Do not
edit: rerun the export instead. Section numbers (§) refer to the app's SPEC,
of which only the parts an author needs are reproduced here.

Validate before every push:

    tool/validate <deck-dir> [<deck-dir> ...]

## 4. Deck format

A deck is a **directory** with this layout:

```
deck.yaml
topics/<topic-path>/<card-id>.md
```

A git repository holds one or more of them — a deck at its root, or several at any depth (ADR-0008):

```
decks/cpp-core/deck.yaml
decks/algo-systems/deck.yaml
```

Discovery walks the checkout skipping `.git`; every directory holding a `deck.yaml` is a deck root. One deck root inside another is an error naming both — silently ignoring the inner one would hide a whole deck. Two decks in one checkout declaring the same `id` is an error for the same reason a duplicate card id is.

### 4.1 `deck.yaml`

```yaml
id: cpp-core # required, [a-z0-9-]+, namespace for card ids
name: C++ Core
description: Fundamentals through C++23, plus interview depth.
language: cpp # highlight.js language id used for code blocks
format: 1 # deck format version; the app refuses unknown versions
relations: # optional; the decks this deck's cards may declare prerequisites in
  - deck: cpp-core
    role: builds-on # optional, and the only role format 1 defines
defaults: # optional, merged into every card's front matter
  compile:
    compiler: g142
    std: c++23
    flags: [-Wall, -Wextra, -Werror]
```

`relations` schedules nothing on its own. It is the scope for §4.2's `requires`: a deck id is self-declared and can collide (§5, ADR-0002), so a deck that could name any other deck's cards without saying so first would be reaching into a namespace it has no claim on. The loader rejects a relation to the declaring deck itself, a duplicate target, and any `role` other than `builds-on`. See ADR-0007.

### 4.2 Card front matter (all kinds)

```yaml
---
id: value-categories-prvalue # required, stable within the deck, [a-z0-9-]+
kind: basic | cloze | code | explain | chunk | parsons | trace # required
version: 1 # required, bump to reset scheduling
tags: [c++17, value-categories] # optional
level: 1 # optional, 1 = basics ... 5 = interview depth
requires: # optional, cards this card builds on
  - value-categories-prvalue # bare id = a card in this deck
  - cpp-core/move-semantics-basics # qualified = a card in a related deck
refs: # optional, shown on the answer side
  - https://en.cppreference.com/w/cpp/language/value_category
elaborate: How does this differ from Go's value/pointer semantics? # optional
---
```

`elaborate` is an unrated reflection prompt shown below the answer (see 4.8). The `misconception` tag marks cards whose front is a plausible but wrong claim; the back explains why it is wrong. Use it for Go-to-C++ negative transfer.

`requires` names **cards**, never decks, topics or items: a cloze prerequisite is met only when every one of its items is. `level` and `requires` say different things and neither replaces the other — `level` is how hard a card is, scoped to one deck and comparable with nothing outside it; `requires` is what a card is made of, and crosses decks. `requires` may not appear in `deck.yaml`'s `defaults`: it would make every card in the deck a prerequisite of itself. What the scheduler does with the graph is §7; what the loader will and will not accept is §4.11.

The topic is the relative directory under `topics/`. The full card id is `<deck.id>/<id>`.

### 4.3 `basic`

Body split by a line containing only `---`. Front above, back below. Both Markdown.

```markdown
---
id: rvo-mandatory
kind: basic
version: 1
level: 2
---

## When is copy elision mandatory in C++17?

When initialising an object from a **prvalue** of the same type
(`T t = T{};`, return of a prvalue). NRVO stays optional.
```

### 4.4 `cloze`

Anki syntax `{{c1::text}}` and `{{c1::text::hint}}`. Each cloze number produces an item `<id>#c1`, `<id>#c2`, scheduled independently. The other items of the same card are buried for the rest of the day (see `dayOf`, §7) after one is reviewed. If a cloze number disappears from the card, its item is orphaned like any other.

### 4.5 `code` (compile-checked fill-in)

Body: one fenced code block (language from `deck.yaml`) with cloze markers, a separator, an optional explanation. Front matter adds:

```yaml
compile: # merged over deck defaults
  harness: | # appended after the user's code
    static_assert(sizeof(Foo) == 16);
    int main() {}
input: chips | type # default chips
choices: # required when input is chips; per cloze number
  c1:
    - "std::function<int(int)>"
    - "std::function_ref<int(int)>"
    - "int(*)(int)"
```

Example:

````markdown
---
id: function-ref-signature
kind: code
version: 1
level: 3
input: chips
choices:
  c1: ["std::function<int(int)>", "std::function_ref<int(int)>", "int(*)(int)"]
compile:
  harness: |
    static_assert(std::is_same_v<decltype(call), int(std::function_ref<int(int)>)>);
    int main() {}
---

Complete the parameter type so the function accepts any callable without owning it.

```cpp
#include <functional>
int call({{c1::std::function_ref<int(int)>}} f) { return f(1); }
```
````

---

`function_ref` is a non-owning reference to a callable (P0792, C++26).

````

Rules:

- `chips`: each blank shows the shuffled `choices` for that cloze number as tappable chips. The reference answer must be among the choices; the loader rejects the card otherwise.
- `type`: monospace text field per blank, autocorrect off, a toolbar of hard-to-type tokens (`<>`, `::`, `&&`, `{}`, `()`, `;`).
- Submitted code = template with blanks substituted, then `compile.harness` appended. **Correct iff exit code 0 and no error diagnostics.**
- Success proposes Good, failure shows stderr, reveals the reference, proposes Again. Either can be overridden.
- If `compile` is absent (non-C++ decks), the card is graded by string match against the reference, whitespace-normalised.

### 4.6 `explain` (free recall against a rubric)

Front: a question to answer aloud. Back: a Markdown checklist rubric. The app shows the question and a timer, then the rubric with checkboxes. Suggested rating from the fraction ticked: ≥90 % Easy, ≥70 % Good, ≥40 % Hard, else Again. Overridable.

```markdown
---
id: explain-move-semantics
kind: explain
version: 1
level: 4
---
Explain move semantics to a senior interviewer. Cover motivation, mechanism, and two pitfalls.
---
- [ ] Motivation: avoid deep copies of resource-owning types
- [ ] `T&&` binds to rvalues; `std::move` is a cast
- [ ] Moved-from state: valid but unspecified
- [ ] Implicit move on return; `return std::move(x)` pessimises
- [ ] Rule of five / zero
- [ ] Pitfall: `const` members block moves
- [ ] Pitfall: forwarding reference vs rvalue reference in templates
````

### 4.7 `chunk` (recall a snippet after brief exposure)

Trains recognising idioms as single units (Hermans, _The Programmer's Brain_, ch. 2). Body: one fenced code block, a separator, an explanation naming the idiom. Front matter:

```yaml
kind: chunk
expose_ms: 8000 # how long the snippet is shown, default 8000
input: chips | type # chips = the snippet's lines and tokens as a shuffled chip pool; default chips
compile: # optional; if present the reproduction is compile-checked with the harness
  harness: |
    int main() {}
```

Flow: show the snippet for `expose_ms` with a progress bar, hide it, user reproduces it, then the original is shown side by side with a diff. Correctness: compile check if `compile` is present, otherwise whitespace-normalised equality. Suggested rating Good on exact match, Hard on compile-ok-but-different, Again otherwise.

````markdown
---
id: chunk-erase-remove
kind: chunk
version: 1
level: 2
expose_ms: 6000
---

```cpp
v.erase(std::remove_if(v.begin(), v.end(), pred), v.end());
```
````

---

The erase-remove idiom. In C++20 prefer `std::erase_if(v, pred)`.

````

### 4.8 `parsons` (reorder scrambled lines)

Parsons problems reduce extraneous load by removing syntax typing (Hermans, ch. 10). Body: one fenced code block containing the correct program in order, a separator, an explanation. Front matter:

```yaml
kind: parsons
distractors:             # optional extra lines that must NOT be used
  - "delete p;"
indent: true             # default true: the user must also set indentation (tap to shift); false = lines only
compile:                 # optional; if present, the assembled program is compile-checked
  harness: |
    int main() {}
````

Flow: lines (plus distractors) shown shuffled as a chip list; the user taps to move them into the answer area; long press reorders. Correctness: compile check if `compile` is present, else exact line order with distractors excluded. Suggested rating from the number of moves beyond the minimum: 0 extra Easy, up to 2 Good, up to 5 Hard, else Again.

Lines that are legitimately interchangeable (for example two independent declarations) make exact-order grading unfair; authors should add `compile` for such cards or restructure them.

### 4.9 `trace` (predict state)

Tracing exercises build a mental model of execution (Hermans, ch. 4 and 5). Body: one fenced code block with numbered probe comments, a separator, an explanation. Front matter lists the expected values:

```yaml
kind: trace
probes:
  1: { x: "1", y: "2" }
  2: { x: "2", y: "2" }
  out: "2 2" # optional expected stdout
```

```cpp
int x = 1, y = 2;
x = y;         // @1
y = x;         // @2
std::cout << x << ' ' << y;
```

Flow: the user fills a table with one row per probe and one column per variable; an `out` field if present. Correctness: cell-by-cell exact match after trimming. Suggested rating from the fraction correct with the same thresholds as `explain`. No execution is performed; expected values are authored.

### 4.10 Elaboration

If a card has `elaborate`, it is shown after the answer and the rubric, as a dismissable panel with the prompt and a free-text box. Nothing is graded or scheduled from it; the text is stored in `elaborations(card_id, t, text)` and shown again the next time the card comes up, so the user can build on earlier reflections.

### 4.11 Loader behaviour

- Parse all decks on startup and after any deck update. Report errors in Diagnostics with deck, file, and line. Never crash, never skip silently.
- Duplicate ids within a deck are an error. Unknown `format` is an error for the whole deck.
- A card that disappears from a deck is kept as "orphaned" and excluded from review; its events are retained.
- A changed file with the same `version` keeps its schedule. The loader records the content hash so the update report can list "changed".
- A card whose `kind` changed without a `version` bump is flagged in the update report **distinctly from "changed"**, with a one-tap "Reset these items" action that appends reset events. Same treatment when a cloze card loses a cloze number. The app never resets implicitly. See §15.

`requires` is checked in two places, because `DeckLoader` parses one directory and knows nothing of any other (§3):

- **The loader**, per card, rejecting the card as it rejects a bad `kind`: a malformed entry, a self-reference, a bare id that names no card in this deck, a qualified id whose deck is not in `relations`, and any cycle wholly inside this deck.
- **The catalogue**, once every deck is loaded, resolving qualified ids against the cards actually installed. It cannot reject anything — the referenced deck may legitimately be absent — so it classifies instead. A prerequisite whose deck is not installed, is removed, is paused, or whose card is missing or orphaned is **dangling** and is ignored. A cycle that only exists across decks has every edge in it dropped. Both are listed in Diagnostics (§10.8); neither is ever allowed to lock a card permanently. See ADR-0007.


### 7.1 Prerequisites and the learning curve

`requires` (§4.2) makes one directed graph over every installed deck's cards. The scheduler reads it in exactly one place — the **new** group — and in two ways. See ADR-0007.

**Locking (the gate).** A card is **known** when every live item it produces has been rated Hard or better at least once, at the card's current `version`, since its last reset, with `practice = 0`. A new item whose card has a prerequisite that is not known is **locked** and is not introduced.

- Locking applies **only to items with no `item_state`**. Overdue and due-today are never tested against the graph, so nothing the user is already reviewing can be withdrawn by a reset, a `version` bump or a deck update three cards upstream.
- Practice never makes a card known, for the reason every other scheduling reader filters practice out (§6).
- A dangling prerequisite (§4.11) does not lock and does not count towards depth.
- Settings carries **Respect prerequisites**, default on. Off, nothing is ever locked; depth ordering still applies, so the switch degrades to a better-ordered version of the pre-prerequisite behaviour rather than to no curriculum at all.
- Practice (below) and Browse (§10.4) reach locked cards unchanged: neither is the schedule.

**Depth (the order).** A card's depth is 0 when it has no live prerequisites, otherwise one more than the deepest of them, computed over the resolved graph so it is always finite. Depth is the first key of the new group's order, ahead of `level`; decks still interleave round-robin, so depth orders *within* a deck and the cross-deck curve is enforced by locking rather than by the sort.

When the new group comes up short because the remainder is locked, Home says so (§10.1): a gate the user cannot see reads as a broken app.
- A deck can be paused; paused decks contribute nothing to due counts or notifications.
- **Practice** is study outside the schedule: a shuffled sample of up to 20 live items from one deck or all of them, drawn fresh each session and independent of what is due. Answers are recorded as practice events (§6) and change nothing — no due date, no burying, no new allowance, no streak, no nudge. Paused decks *can* be practised: pausing is a statement about scheduling.


# Per-Kind guide (from the cpp-core Deck)

## Card front matter

Every Card file opens with YAML front matter and needs, at minimum:

```yaml
---
id: value-categories-taxonomy # [a-z0-9-]+, unique across the whole Deck
kind: basic # basic | cloze | code | explain | chunk | parsons | trace
version: 1 # bump only to reset this Card's scheduling
---
```

`level` (1 = basics … 5 = interview depth) and `tags` are optional but
encouraged — Browse and Stats filter on both. **`refs` is required by this
Deck's authoring convention** (not by the loader): every Card cites at least
one cppreference page or WG21 paper it is drawn from, shown on the answer
side. The `io` Cards are the one place that convention bends: `io_uring` is
a kernel interface with neither, so those Cards cite `man7.org` pages
instead.


## The seven Kinds this Deck uses

### `basic`

Front matter, then a Markdown question, then a line containing only `---`,
then the Markdown answer:

```markdown
---
id: rvo-mandatory
kind: basic
version: 1
level: 2
refs:
  - https://en.cppreference.com/w/cpp/language/copy_elision
---

## When is copy elision mandatory in C++17?

---

When initialising an object from a **prvalue** of the same type…
```

The `---` separator is required even though the SPEC's own illustrative
example omits it for brevity — `parseBasicBody` rejects a body with none.

### `cloze`

One passage with `{{cN::text}}` or `{{cN::text::hint}}` markers. Each
distinct `cN` becomes its own Item, scheduled independently; reviewing one
buries the Deck's other cloze siblings of the same Card for the rest of the
day (§7).

**The escaping gotcha**: the text (and hint) inside a marker ends at the
first *unescaped* `::`. C++ is full of literal `::`, so writing
`{{c1::std::move}}` silently truncates the answer to `std` and treats
`move` as a hint. Escape every literal `::` inside a marker as `\::`:
`{{c1::std\::move}}`. This does **not** apply outside `{{ }}` — plain prose
and code outside a marker never needs escaping.

### `code`

Prose, one fenced code block with `{{cN::...}}` blanks, an optional
explanation after another `---`. Front matter adds `input` (`chips` by
default), `choices` per blank under `chips`, and `compile.harness` — C++
appended after the filled-in template, `static_assert`s plus `main()`.

**ADR-0005, non-negotiable**: correctness is "compiles cleanly", not string
matching. That means every Harness must actually discriminate — write the
`static_assert`s so that swapping in at least one of the Card's own
Distractors either fails to compile or compiles and fails the assertion.
A Harness that would pass for anything syntactically valid teaches nothing.
Every `code` Card in this half of the Deck was hand-verified this way against
a local `g++ -std=c++23` (GCC 13.3): the reference answer compiles clean, and
at least one Distractor demonstrably does not produce a passing
`static_assert`.

**Coroutine Cards discriminate at compile time, not at run time.** The
compile service sends `filters: { execute: false }` (SPEC §9), so the program
is only ever compiled — a Harness whose `main` returns non-zero on a wrong
answer proves nothing. Coroutine bodies are not `constexpr`, so a
`static_assert` cannot observe their behaviour either. The Cards under
`04-language/coroutines-*` therefore discriminate in the two ways that do
work: a wrong token fails to compile (`co_return 42;` needs `return_value`,
not `return_void`; `final_suspend` must be `noexcept`; a typed
`coroutine_handle<P>` cannot serve two coroutine types), or a
`static_assert` pins a *type* (`decltype(await_suspend(...))` must be
`std::coroutine_handle<>`). For each of these Cards every Distractor — not
merely one — was confirmed to fail to compile.

The one exception to local verification is `callables-function-ref-signature`,
which uses `std::function_ref` (P0792, targeted at C++26) — not yet
available in this environment's toolchain. It is authored to the letter of
SPEC §4.5's own example and left for #28 to verify against the real
`g142` compiler on Compiler Explorer.

Under `input: chips`, the loader rejects the Card outright if the reference
answer is not among its own `choices` — so this one, at least, cannot be
gotten wrong by an author.

### `explain`

A question, then `---`, then a Markdown checklist rubric (`- [ ] ...`
items). This Deck's convention is **at least five rubric items** per
`explain` Card — enough that the suggested-Rating thresholds (§4.6) mean
something.

### `chunk`

One fenced code block — the snippet to memorise — then, after an optional
`---`, an explanation naming the idiom. Front matter's `expose_ms` (default
8000) is how long the snippet is shown before it is hidden; this Deck's
convention is to keep every `chunk` snippet small enough to actually read
in that window — a handful of lines, not a whole class — and to check that
by re-reading each one at its configured duration rather than trusting the
default. A `chunk` Card's `compile` block is optional: when the snippet is
not a self-contained program (`06-idioms/chunks/erase-remove.md`, whose
`v` and `pred` are deliberately undefined — it is one line out of a larger
context), the Card overrides the Deck's `defaults.compile` back to nothing
with an explicit `compile: null`, and correctness falls back to
whitespace-normalised equality (SPEC §4.7). Leaving `compile` unset instead
of null does **not** opt out — it inherits `defaults.compile`, which has no
`harness`, and the loader rejects that.

Three more Cards here are `compile: null`, for a different reason: their
subject is not compilable anywhere this Deck can reach. `chunks-io-uring-
submit` and `chunks-io-uring-completion-loop` need `liburing`, which is not
part of the standard library, and `chunks-sender-pipeline` needs
`std::execution`, which is C++26 (P2300) and not implemented by the `g142`
configuration the Deck targets. Each says so in its own explanation rather
than leaving the reader to wonder why the snippet is graded by text.

### `parsons`

One fenced code block holding the correct program in order, then an
explanation. Front matter's optional `distractors` are extra lines that
must not appear in the answer; `indent` (default true) asks the user to
also get indentation right. This Deck's convention: every `parsons` Card
here carries a `compile` block, both because C++ member and lambda
declarations are often legitimately reorderable (making exact-line-order
grading unfair, per SPEC §4.8) and because a Harness lets the reproduction
be graded by whether it actually works, not just whether it matches one
authored ordering byte-for-byte.

### `trace`

One fenced code block with numbered `// @N` Probe comments, then an
explanation. Front matter's `probes` names the expected value of every
traced variable at each Probe, keyed by Probe number, plus an optional
`out` for expected stdout. **No code is ever executed by the app for this
Kind** — every expected value is authored by hand, so a wrong one teaches
the wrong thing and nothing catches it. Every `trace` Card in this Deck was
verified by actually compiling and running an instrumented copy of its
snippet against a local `g++ -std=c++23` (GCC 13.3) and reading back the
printed values; the explanation on each Card says so and names the
compiler. `trace-temporaries-in-range-for` was additionally run under
`-fsanitize=address` to confirm the range-for's lifetime-extended
temporary is not, in fact, a dangling-reference trap. The loader itself
checks that a Card's `// @N` markers and its `probes` keys agree exactly,
in both directions.

The three Cards under `07-tracing/coroutine-execution` trace the coroutine
protocol itself, so their snippets are longer than the rest: two carry the
promise or awaiter whose hooks they are tracing, because the letters
accumulated in `hooks` are only readable if the hooks are on screen.
`trace-coroutine-lazy-generator` instead names, in a comment, the
`Generator<T>` from `parsons-coroutine-generator-skeleton` rather than
repeating twenty lines of it; the program that was actually compiled and run
to author its expected values used exactly that definition.

`trace-moved-from-state` is worth a special note: the C++ standard only
guarantees a moved-from object is left in a *valid but unspecified*
state, not a specific one. Its expected values are `libstdc++`'s actual,
observed behaviour (GCC 13.3 empties a moved-from short `std::string` via
its small-string optimisation) — a different standard library implementation
is free to leave it holding something else, as long as destroying or
reassigning it is still safe. The Card's explanation says this explicitly
rather than presenting an implementation detail as a language guarantee.

### The `misconception` tag and `elaborate`

`08-transfer/go-to-cpp` Cards state a plausible but wrong claim a Go
programmer would believe on the front (or, for a `cloze`, embedded in the
passage), and the back explains why it is wrong. Every Card in this Topic
carries `tags: [..., misconception]` and an `elaborate` prompt connecting
the correction back to something the reader already knows from Go (SPEC
§4.2, §4.10) — shown as a dismissable free-text panel below the answer,
never graded or scheduled.

SPEC §4.2 defines the tag generally ("cards whose front is a plausible but
wrong claim"), and three Cards outside that Topic now use it, because the
belief each corrects is one a competent C++ programmer actually holds:
`coroutines-generator-dangling-parameter` ("the frame copies the
parameters, so a temporary is safe"),
`coroutines-scheduling-io-uring-lifetime` ("destroying the coroutine
cancels the read"), and `execution-senders-are-not-futures` ("a sender is
a future with a working `.then()`"). Each carries an `elaborate` prompt
pointing the correction back at the reader's own code. Filtering Browse on
the tag is then "the things I am most likely to be wrong about", which is
worth more than keeping the tag exclusive to one Topic.

