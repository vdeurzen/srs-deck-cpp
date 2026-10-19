# Card templates by Kind

Every template loads as written (after filling the `<…>` placeholders). Deck
`defaults.compile` is GCC 14.2 (`g142`), `-std=c++23 -Wall -Wextra`. Tiers
are TEACHING §3. Sizes are PEDAGOGY §2 and §4.

## basic (T1): rungs 1, 6

````markdown
---
id: <id>
kind: basic
version: 1
level: <1-5>
tags: [<topic>, <subtopic>]
requires:
  - <bare-id-in-this-deck>
  - <other-deck>/<id>
refs:
  - <url>
---

## <One question, naming the context: "in C++23", "for std::vector">

```cpp
<3–8 lines of concrete code, if the question is about code>
```

---

**<The answer in ≤ 15 words.>**

<≤ 40 words of why: the deciding property, and what goes wrong without it.>
````

The `---` line between front and back is required.

## basic, worked example (T2): rung 2

The front names the procedure and a tiny input; the back is the worked run.
Its trace (rung 4) uses a *different* input and `require`s this Card.

````markdown
---
id: <trace-id>-worked
kind: basic
version: 1
level: 2
tags: [<topic>, worked-example]
requires:
  - <the concept card>
refs:
  - <url>
---

## Worked: <algorithm> on `<tiny input, ≤ 4 elements>`

What does it do at each step?

---

| step (subgoal) | state | why |
| --- | --- | --- |
| <init> | … | … |
| <expand> | … | … |
| … (≤ 6 rows) | | |

**<The result in one line, plus the invariant that made it work.>**
````

## basic, puzzle (T1): rung 0, optional

The problem before the rule. The front is answerable by reasoning, and the
back teaches the concept fully, since this is the learner's first meeting with it.

````markdown
## This prints `<value>`, not `<expected value>`. What went wrong?

```cpp
<≤ 8 lines that show the symptom>
```

---

**<The mechanism, named.>** <≤ 40 words: how it works, and the fix.>
````

## misconception basic (T1–T2): rung 6

````markdown
---
id: <id>
kind: basic
version: 1
level: <n>
tags: [<topic>, misconception]
requires:
  - <the concept it corrects>
elaborate: <One question tying the correction to the learner's own code or Go habit.>
refs:
  - <url>
---

## <A belief a competent engineer actually holds, stated neutrally, with code. Prefer "what happens?">

---

**<What really happens.>** <Why the belief is tempting, then the minimal
refuting code or fact.>
````

## cloze (T1 per blank): rungs 1, 3; subgoal sequence

````markdown
---
id: <id>
kind: cloze
version: 1
level: <n>
tags: [<topic>]
requires: [<id>]
refs:
  - <url>
---

<One passage or short snippet. Blank only the load-bearing token:
{{c1::answer}} or {{c1::answer::category hint}}. At most 3 blanks, ideally 1–2.
Escape a literal :: inside a marker: {{c1::std\::move}}.>

---

<Optional: one or two lines of why.>
````

Each `cN` is reviewed alone, so every blank must be answerable from the passage
without the others.

## code (T2; T3 if several blanks): rungs 3, 5, 7

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
    - "<plausible misconception 1>"
    - "<plausible misconception 2>"
compile:
  harness: |
    constexpr bool check() {
      <exercise the filled-in code on values that tell the answers apart>
      return <condition>;
    }
    static_assert(check());
    int main() {}
requires: [<id>]
refs:
  - <url>
---

<One or two sentences: the situation, and what to complete. Never state the answer.>

```cpp
<≤ 10 lines, one blank ideally: {{c1::reference answer}}>
```

---

**<Why the reference is right, ≤ 15 words.>** <What each distractor gets wrong.>
````

The harness must make every distractor fail at compile time. `static_assert`
over `constexpr` code runs the code inside the compiler. Never use a `main()`
whose return value reports the result. Check with `scripts/check-code --id`,
then `--remote`.

## chunk (T2): rung 4/5 for idioms

````markdown
---
id: <id>
kind: chunk
version: 1
level: <n>
tags: [<topic>, idiom]
expose_ms: 8000
compile:
  harness: |
    static_assert(<check over the snippet>);
    int main() {}
requires: [<id>]
refs:
  - <url>
---

```cpp
<≤ 7 lines, an idiom that recurs in real code, with subgoal comments>
```

---

**<The idiom's name.>** <Why each line exists; what breaks without it.>
````

Use `compile: null` when the snippet isn't a self-contained program (it is then
graded by text). Leaving `compile` out inherits the defaults, which have no
harness, and the loader rejects that.

## parsons (T3): rung 5

````markdown
---
id: <id>
kind: parsons
version: 1
level: <n>
tags: [<topic>]
distractors:           # leave out until the plain version exists; then 1–2 real bugs
  - "<a line encoding a real mistake>"
compile:
  harness: |
    constexpr bool check() { <run the assembled function>; return <condition>; }
    static_assert(check());
    int main() {}
requires: [<id>]
refs:
  - <url>
---

<One line: what the function does and its inputs. Order the lines.>

```cpp
<≤ 9 movable lines, each with exactly one right place, with subgoal comments;
put interchangeable declarations on one line>
```

---

**<The procedure's name and its subgoals in order.>** <Why the order matters,
and the bug each distractor encodes.>
````

## trace (T3): rung 4

Within PEDAGOGY §3.1: one run, ≤ 5 input elements, ≤ 4 loop iterations, ≤ ~8
state changes, ≤ 3 probes at decision points with ≤ 2 values each, plain code.

````markdown
---
id: <id>
kind: trace
version: 1
level: <n>
tags: [<topic>, tracing]
probes:
  1: { <var>: "<value>" }
  2: { <var>: "<value>", <var2>: "<value>" }
requires:
  - <id>-worked
refs:
  - <url>
---

<One line: what the code does, and when each probe is read.>

```cpp
<5–15 lines>
<statement>;   // @1
<statement>;   // @2
```

---

<The decision each probe sits on, and the invariant. "Values from running the
snippet with g++ <version>, -std=c++23.">
````

The `// @N` markers and the `probes` keys must match exactly, in both
directions. Values are strings.

## explain (T4): rung 8

````markdown
---
id: <id>
kind: explain
version: 1
level: <4-5>
tags: [<topic>, interview]
requires:
  - <the rung-6/7 Cards its rubric items come from>
refs:
  - <url>
---
<One question to answer aloud in ~1 minute, framed as an interviewer would ask it.>
---
- [ ] <claim 1: "names X because Y">
- [ ] <claim 2>
- [ ] <claim 3>
- [ ] <claim 4>
- [ ] <claim 5>
````

Exactly 5 distinct, checkable claims, each taught by a Card in `requires`.
A bigger topic gets several `explain` Cards plus a synthesis capstone.

## stretch (≤ 180 s)

Any Kind, plus `stretch` in `tags`, at the top of a ladder only (TEACHING §4):
it `require`s every rung it combines, has one defensible answer, and is never
a trace of several runs.
