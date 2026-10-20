# Card templates by Kind

Each template loads as written once the `<…>` placeholders are filled. The
rules in the comments are PEDAGOGY.md's, quoted so you can check the Card
as you write; PEDAGOGY.md wins if they ever differ. Deck
`defaults.compile` is GCC 14.2 (`g142`), `-std=c++23 -Wall -Wextra`.
Times are PEDAGOGY §4. Rungs are PEDAGOGY §0.

Every Card carries an `elaborate`, except a `basic` with no `requires` and a
`worked-example` Card (§4). Phrase it to be said aloud: "Say in one
sentence, as to an interviewer, why…", "what would break if…", "where else
does this shape appear?".

## basic: rung 1 (meet) or rung 3 (recognise), ~15 s

````markdown
---
id: <id>
kind: basic
version: 1
level: <1-2 for rung 1, 3 for rung 3>
tags: [<topic>, <subtopic>]
requires:
  - <bare-id-in-this-deck>
  - <other-deck>/<id>
elaborate: <One sentence to say aloud; leave out on a basic with no requires.>
refs:
  - <url>
---

## <One question, naming the context: "in C++23", "for std::vector">

```cpp
<3–8 lines of concrete code: the minimal example of the problem or the property>
```

---

**<The answer, one claim, ≤ 15 words.>**

<≤ 40 words of why: the deciding property, and what goes wrong without it.
Illustrative code ≤ 8 lines; code that is the answer ≤ 3 lines.>
````

The `---` line between front and back is required. Rung 1's "what goes wrong
without it" is its own Card on the same rung.

## basic, vocabulary: rung 1 for a term later Cards lean on

The front shows a 3–8 line example and asks which part is the term ("Which
expression here is the prvalue?"), never "define X". The bold answer is
the term or the part, so this Card counts as teaching the term (§3).

## basic, worked example: rung 2, ≤ 60 s

The **front** shows the tiny input and the full annotated step table, then
asks one self-explanation question about the row that decides the outcome.
It never asks for the outcome itself. No `elaborate`.

````markdown
---
id: <trace-id>-worked
kind: basic
version: 1
level: 2
tags: [<topic>, worked-example]
requires:
  - <the concept's rung-1 card; the closure must teach every term in the table>
refs:
  - <url>
---

## <Algorithm> on `<tiny input>`

| step (subgoal) | state | why |
| --- | --- | --- |
| <init> | <≤ 6 words> | <≤ 6 words> |
| <expand> | … | … |
| … (≤ 5 rows) | | |

Why does <the deciding thing happen> at <row>?

---

**<The reason, ≤ 15 words.>**

<≤ 40 words: the invariant or rule that row shows.>
````

## trace, faded: rung 4 (optional), then the full trace

Same input as the worked example, every row given except one probe. Use the
trace template below with the given rows in the prose or in comments. It
requires the worked example and the concept's deciding-property Card. The
full trace uses a *different* input and requires the faded trace (or, if
there is none, the worked example and the deciding-property Card).

## trace: rung 4, ≤ 60 s

PEDAGOGY §3.1 applies: one run; ≤ 5 input elements; ≤ 4 loop iterations;
≤ 8 state changes; ≤ 4 changing values held at once; ≤ 3 probes, each at a
decision point, with ≤ 2 values each; no comma counters, helper types or
`a[i++]`. A count or a bound is a `basic`/`cloze`, not a trace.

````markdown
---
id: <id>
kind: trace
version: 1
level: 3
tags: [<topic>, tracing]
probes:
  1: { <var>: "<value>" }
  2: { <var>: "<value>" }
requires:
  - <id>-worked
elaborate: <One sentence to say aloud.>
refs:
  - <url>
---

<One line: what the code does, and when each probe is read.>

```cpp
<5–15 lines>
<statement at a decision point>;   // @1
<statement where state changes hands>;   // @2
```

---

<The decision each probe sits on and the invariant; only this run. One short
closing sentence may name the compiler that produced the values.>
````

The `// @N` markers and the `probes` keys must match exactly; values are
strings. Every value comes from compiling and running an instrumented copy.

## misconception basic: rung 3, right after the concept it corrects

````markdown
---
id: <id>
kind: basic
version: 1
level: <n>
tags: [<topic>, misconception]
requires:
  - <the concept it corrects>
elaborate: <Ties the correction to the learner's own code or Go habit.>
refs:
  - <url>
---

Many expect <the belief a competent engineer actually holds>.

```cpp
<≤ 8 lines, or a ≤ 5-element input>
```

## <Asks for a specific result: the value, the overload chosen, the line that fails; ≥ 3 plausible outcomes>

---

**<The correction, ≤ 15 words.>**

```cpp
<refuting code, ≤ 8 lines, if the front's code doesn't already refute it>
```

<Why the belief is tempting, ≤ 40 words.>
````

Test: swap the belief for its opposite. If the answer is still obvious,
rewrite the Card.

## cloze: rung 5 (least generation); the subgoal sequence

````markdown
---
id: <id>
kind: cloze
version: 1
level: <n>
tags: [<topic>]
requires: [<id>]
elaborate: <One sentence to say aloud.>
refs:
  - <url>
---

<One sentence, or a snippet of ≤ 8 lines. Blank only the load-bearing token:
{{c1::answer}} or {{c1::answer::category hint}}. ≤ 3 cloze numbers, ideally 1.
Escape a literal :: inside a marker: {{c1::std\::move}}.>

---

<Optional: one or two lines of why.>
````

Each `cN` is reviewed alone, and its siblings may be shown filled, so no
blank may give away another. A single-item cloze makes a better
prerequisite.

## parsons: rung 5, ≤ 60 s

Write one only when the idiom has ≥ 4 lines whose order is a decision.

````markdown
---
id: <id>
kind: parsons
version: 1
level: <n>
tags: [<topic>]
distractors:           # 0–2, each encoding a real mistake; none on the first parsons of an idiom
  - "<a line encoding a real mistake>"
compile:
  harness: |
    constexpr bool check() { <run the assembled function>; return <condition>; }
    static_assert(check());
    int main() {}
requires: [<the concept's cloze, or its trace>]
elaborate: <One sentence to say aloud.>
refs:
  - <url>
---

<One line: what the function does and its inputs, using the subgoal names.
Order the lines.>

```cpp
<≤ 9 movable lines, each with exactly one right place; ≤ 1 #include;
interchangeable declarations on one line>
```

---

**<The procedure's name and its subgoals in order.>** <Why the order
matters, and the bug each distractor encodes.>
````

## code: rung 5 (most generation), ≤ 30 s for one blank

````markdown
---
id: <id>
kind: code
version: 1
level: <n>
tags: [<topic>]
input: chips
choices:
  c1:
    - "<reference answer>"
    - "<the most common wrong answer>"
    - "<another plausible misconception>"
compile:
  harness: |
    constexpr bool check() {
      <check the property the front states, not just that the distractors fail;
       for an index or bound: the key at the last element, keys absent below
       and above, and a run of duplicates>
      return <condition>;
    }
    static_assert(check());
    int main() {}
requires: [<the concept card it exercises>]
elaborate: <One sentence to say aloud.>
refs:
  - <url>
---

<One or two sentences: the situation, the property to achieve, and what to
complete. Never state the answer.>

```cpp
<≤ 10 lines, one blank ideally: {{c1::reference answer}}>
```

---

**<Why the reference is right, ≤ 15 words.>** <What each distractor gets wrong.>
````

Every distractor must fail at compile time: `static_assert` over `constexpr`
code runs the code inside the compiler, and the app never executes. Check
with `scripts/check-code --id`, then `--remote`.

## chunk: rung 5, for ≥ 2 lines that recur verbatim in real code, ≤ 30 s

````markdown
---
id: <id>
kind: chunk
version: 1
level: <n>
tags: [<topic>, idiom]
expose_ms: <1500 × lines + 2000, clamped to 4000–12000>
compile:
  harness: |
    static_assert(<check over the snippet>);
    int main() {}
requires: [<id>]
elaborate: <One sentence to say aloud.>
refs:
  - <url>
---

```cpp
<≤ 7 lines counting #includes, ≤ 80 chars each, one statement per line, no
trailing comments>
```

---

**<The idiom's name.>** <Why each line exists (with the subgoal names); what
breaks without it.>
````

Set `compile: null` when the snippet isn't a whole program (it is then
graded by text). Leaving `compile` out inherits the Deck default, which has
no harness, and the loader rejects that. Reread the snippet at its
`expose_ms`.

## explain: rung 6 capstone, ~60 s aloud

````markdown
---
id: <id>
kind: explain
version: 1
level: <4-5>
tags: [<topic>, interview]
requires:
  - <one Card per rubric item, ≤ 5; at least one is a rung-4 or rung-5 Card>
elaborate: <One sentence to say aloud.>
refs:
  - <url>
---
<The question, naming the listener ("An interviewer asks…"). Never list the
rubric's topics or their order.>
---
- [ ] <(1) concept: the problem it solves | choosing: the cue>
- [ ] <(2) the mechanism | the pattern it selects>
- [ ] <(3) a concrete example | a one-line example problem>
- [ ] <(4) the cost or trade-off | the complexity>
- [ ] <(5) a pitfall or contrast | the look-alike and how to tell it apart>
````

Exactly 5 items, each one claim a listener can tick from speech alone,
≤ 20 words, no code to spell out, each taught by a Card in the closure. Use
the concept order for a language or library feature, the choosing order for
a pattern a problem statement must trigger, and both Cards for something
that is both.

## mixed recognition: after ≥ 2 patterns have recognition Cards

A `basic` that states a problem in one line and asks which pattern applies;
the cue is the back's why. Alternatively, the candidates are listed on the
front and it asks for the cue. Rules:
- Draw the look-alikes from different topics.
- State the constraint as sizes or counts ("n ≤ 10⁹, 10⁵ queries"), never as
  a target complexity.
- A problem whose name names the technique goes only on the back and in
  `refs`.
- Keep pattern names out of `tags`.
- It requires the recognition Card of every pattern its answer names (≤ 3).

## stretch, ≤ 180 s (TEACHING §3)

Any Kind, with `stretch` added to `tags`, at the top of a ladder only. It
requires every rung it combines, has one defensible answer, is never a
trace of several runs, and nothing but another stretch Card requires it.
