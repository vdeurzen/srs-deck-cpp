# core-a review (core/01-basics, 04-language, 05-interview, 06-idioms, 07-tracing)

Method: read all 60 Cards; compiled and ran every trace/probe program and the layout, alignas, slicing, signed/unsigned, range-for cases with g++ 16.2 -std=c++23 (all stated values correct); `scripts/check-code cpp-essentials` reports 0 problems; all `requires` resolve.

## const-constexpr-constexpr-function-dual-use-cloze  (core/01-basics/const-constexpr-consteval/constexpr-function-dual-use-cloze.md)
- **confusing**: c1 "could" with hint "a modal verb": "can" and "may" are equally defensible, so a correct learner is graded wrong. **Fix:** rewrite as "...only that some call {{c1::is allowed::permission or obligation?}} to be evaluated..." or blank the contrast "may / must" ("A `constexpr` function *may* run at compile time; only a constant-expression context *requires* it": blank `requires`).

## ub-three-behaviours  (core/01-basics/undefined-behaviour/three-behaviours.md)
- **confusing**: the three terms are never defined, so `sizeof(int)` (implementation-defined) vs `f(g(), h())` (unspecified) cannot be told apart by someone meeting them here. **Fix:** add hints: c1 "each compiler documents its choice", c2 "one of several allowed, not documented", c3 "no requirements at all".

## trace-temporaries-in-range-for  (core/07-tracing/lifetimes-and-references/temporaries-in-range-for.md)
- **confusing**: the last back sentence ("Before P2718 (C++23, GCC 15+) only the temporary bound directly is rescued...") is garbled, and `elaborate` names P2718 without saying what it is. **Fix:** "Before C++23 (P2718, in GCC 15+), only a temporary bound directly to the hidden reference survived; in `for (x : make().items())` the `make()` result died before the loop. C++23 extends all temporaries in the range-initializer." Drop "P2718" from `elaborate`: "which compilers you ship with keep such a holder alive?"

## ptr-lifetime-extension  (core/01-basics/references-and-pointers/lifetime-extension.md)
- **confusing**: `make` and `Noisy` are defined only in another Card's example (not self-contained). **Fix:** add a snippet: `struct Noisy { ~Noisy(); }; Noisy make(char);` and state "Noisy's destructor is the observable event".

## exceptions-noexcept-operator  (core/04-language/exceptions/noexcept-operator.md)
- **weak**: the `noexcept(expr)` operator is never introduced (the required Card covers the specifier), so the learner guesses its meaning. **Fix:** prompt line "`noexcept(expr)` here is the operator, not the specifier; it asks the compiler whether `expr` may throw" before the code.

## value-categories-overload-binding  (core/01-basics/value-categories/overload-binding.md)
- **weak**: near-duplicate of `vc-named-rvalue-ref-is-lvalue` (named `T&&` is an lvalue); "T" is unspecified (a template `T&&` is a forwarding reference). **Fix:** say "for a concrete type such as `std::string`" and either drop the Card or make it the overload-resolution consequence only (show `f(x)` calls the `const&` overload and the `std::move(x)` fix).

## ptr-reference-vs-pointer  (core/01-basics/references-and-pointers/reference-vs-pointer.md)
- **weak**: asks for a "single property" but the answer is two ("none" or "a different one later"). **Fix:** ask "What must the caller be able to express that only a pointer allows?" -> **"An absent target (null)."** Move re-seating to the back.

## exceptions-strong-vs-basic  (core/04-language/exceptions/strong-vs-basic.md)
- **weak**: no concrete example. **Fix:** add `v.push_back(x)` throwing on reallocation: strong leaves `v` unchanged; a loop of `push_back`s is only basic.

## raii-explain-owning-type  (core/01-basics/lifetime-and-raii/explain-owning-type.md)
- **weak**: rubric items 2 and 5 each bundle 2-3 claims (null check, fclose, never throws; two-handle unwinding), and move assignment is never checked. **Fix:** split item 2 to "destructor is the single release point and must not throw (it runs during unwinding)"; fold null-check into item 4; reduce item 5 to "two handles: each in its own member so unwinding releases the first if the second throws".

## callables-explain-capture-lifetime  (core/05-interview/function-ref-and-callables/explain-capture-lifetime.md)
- **weak**: items 3 and 4 bundle two claims each (`[=]` captures `this` + C++20 deprecation; `[*this]` + `[m = m]`). **Fix:** drop the deprecation clause; split item 4 to just "`[*this]` or an init-capture copies the data, so the closure owns it".

## raii-owner-in-destructor  (core/01-basics/lifetime-and-raii/owner-in-destructor.md)
- **weak**: back is over the 60-word limit and adds a second idea (std::string/unique_ptr are this idiom); front phrase "tie ... to" nearly gives "destructor". **Fix:** cut the last paragraph into the `elaborate`; front "What mechanism guarantees the `fclose` on every path?".

## value-categories-guaranteed-elision  (core/01-basics/value-categories/guaranteed-elision.md)
- **weak**: the right chip is the only one without a named `local`, a surface cue. **Fix:** give each distractor the same shape as the answer, e.g. `Pinned p; return p;` and `return Pinned(std::move(Pinned{}));`, so the choice rests on the rule, not on chip shape.

## raii-storage-durations  (core/01-basics/lifetime-and-raii/storage-durations.md)
- **weak**: hints "the enclosing block decides" / "nothing ends it but you" restate the answers. **Fix:** hints "a duration" for all three, or none.

## const-constexpr-const-vs-constexpr-cloze  (core/01-basics/const-constexpr-consteval/const-vs-constexpr-cloze.md)
- **weak**: c1 is a 4-word free-text blank, hard to self-grade consistently. **Fix:** blank one token: "`const` promises only that a value is not {{c1::modified}} after initialization."

## ptr-dangling  (core/01-basics/references-and-pointers/dangling.md)
- **weak**: "generation-checked handles" is undefined here; the back also mixes the answer with implementation-defined trivia. **Fix:** drop the handle sentence; keep "copying `p` is not UB, dereferencing or deleting it is".

Reviewed 60 cards: 0 wrong, 4 confusing, 11 weak; OK: 45.

## Applied
- const-constexpr-constexpr-function-dual-use-cloze: skipped. FORMAT.md grades a `cloze` by reveal and self-rating, not string match, so a learner who writes "can" or "may" just rates it correct. The modal blank already carries the may/must contrast.
- ub-three-behaviours: fixed. Each blank now has a defining hint, so the three terms can be told apart.
- trace-temporaries-in-range-for: fixed. Rewrote the pre-C++23 sentence. `elaborate` no longer names P2718; the explanation now says what P2718 is.
- ptr-lifetime-extension: fixed. Front has a self-contained `Noisy`/`make` snippet and names the destructor as the observable event.
- exceptions-noexcept-operator: fixed. Added a line before the code saying operator, not specifier.
- value-categories-overload-binding: fixed. Uses a concrete `std::string` snippet and is now about the overload-resolution consequence (it silently copies; `std::move` picks `&&`), unlike vc-named-rvalue-ref-is-lvalue (a binding error).
- ptr-reference-vs-pointer: fixed differently. The suggested "null" answer would duplicate its prerequisite ptr-pointer-param-meaning, so the Card now asks for the one other property: `r = y;` assigns through `r` and never re-points it (checked by running: x becomes 2).
- exceptions-strong-vs-basic: fixed. Added the `push_back` vs loop-of-`push_back`s example, back trimmed to ≤ 60 words.
- raii-explain-owning-type: fixed. Items 2, 4 and 5 now each make one claim; the null check moved to the moves item, which now covers move assignment too.
- callables-explain-capture-lifetime: fixed. Dropped the deprecation clause; item 4 is a single claim.
- raii-owner-in-destructor: fixed. Front reworded so it no longer hints "destructor"; last paragraph moved to `elaborate`.
- value-categories-guaranteed-elision: fixed. The `std::move(local)` distractor is replaced by `return std::move(Pinned{});` (added `#include <utility>`), so "no local" is not a cue; the explanation covers the xvalue case. Both distractors fail to compile, local and remote.
- raii-storage-durations: fixed. Removed the hints that restated the answers.
- const-constexpr-const-vs-constexpr-cloze: fixed. c1 now blanks `modified` only.
- ptr-dangling: fixed. Dropped the generation-checked-handles sentence.
