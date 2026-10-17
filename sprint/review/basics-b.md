# basics-b review (08-inheritance .. 16-concurrency-basics)

Code Cards: `scripts/check-code cpp-essentials` passes (0 problems). Trace values re-run with g++ 16.2 -std=c++23 (first-matching-handler, unwind, tick, remove_if, countdown, at, reserve, construct order, dispatch): all correct.

## linkage-extern-global-variable  (cpp-essentials/topics/basics/13-headers-and-linkage/linkage-extern-global-variable.md)
- **confusing**: "What should the header say instead?" has two defensible answers: `extern int verbosity;` and, in C++17, `inline int verbosity = 1;`. A learner who answers `inline` argues. **Fix:** add "so that exactly one .cpp holds the definition" to the front, or accept inline variables in the back as the header-only alternative.

## tmpl-constrained-auto  (.../09-templates-basics/tmpl-constrained-auto.md)
- **confusing**: no `requires`, yet it uses concepts, `std::integral` and abbreviated templates, introduced in tmpl-concept-intro. Unlock order could show it first. **Fix:** `requires: [tmpl-concept-intro]`.

## err-pick-a-channel  (.../12-error-handling/err-pick-a-channel.md)
- **confusing**: c3 text after the blank ("for example a `bool`, an error code or an empty `std::optional`") gives away "return it as a value". Blanks c2/c3 are free phrases, so grading is arguable. Three ideas in one card. **Fix:** split into three single-blank cloze/basic Cards; blank one word (`assert`, `throw`, `return`), and drop the leaking example sentence.

## tmpl-explain-templates  (.../09-templates-basics/tmpl-explain-templates.md)
- **confusing**: rubric item 4 (checked only at instantiation) and item 5 (constraint moves the error) come from tmpl-error-at-instantiation and tmpl-concept-error, which are not in `requires`. Item 2 also bundles deduction conflict with explicit arguments. **Fix:** require both Cards; keep item 2 to one claim.

## virtual-delete-through-base  (.../08-inheritance/virtual-delete-through-base.md)
- **weak**: `requires virtual-construct-order` is unneeded (nothing here uses construction order), and the card never shows the missing `~Reverb` running. **Fix:** require only virtual-enable-dispatch; add to the back "`~Reverb` and its `samples` member never run".

## virtual-pure-syntax  (.../08-inheritance/virtual-pure-syntax.md)
- **weak**: the c2 hint "the term for a class you cannot create objects of" restates the answer (rule 6). "Without a body" is also not strictly true (a pure virtual may be defined). **Fix:** hint "a class category"; say "declares `area` with no implementation for the base to give".

## virtual-static-dynamic-type  (.../08-inheritance/virtual-static-dynamic-type.md)
- **weak**: the answer `Dog` can be read straight off `Dog rex;`, so it tests nothing. **Fix:** make the reference come through a function (`void f(Animal& pet)` called with `f(rex)`), or ask "which type does the compiler use to pick `pet.speak()` for a non-virtual speak, and which at run time for a virtual one?".

## linkage-inline-header-fix  (.../13-headers-and-linkage/linkage-inline-header-fix.md)
- **weak**: the hint "the specifier that allows identical definitions in many files" nearly spells the answer. `static` would also stop the link error, which the "stays one function" wording excludes only subtly. **Fix:** hint "a keyword before the return type"; keep "one function shared by the whole program".

## linkage-which-step-fails  (.../13-headers-and-linkage/linkage-which-step-fails.md)
- **weak**: "Every file compiles; the build then stops with `undefined reference`" leaves only the linker. A lookup, not recognition. **Fix:** show the two error messages (`'area' was not declared` vs `undefined reference`) and ask which step reports each.

## linkage-odr-counting  (.../13-headers-and-linkage/linkage-odr-counting.md)
- **weak**: c1 and c2 carry the same hint, and the blanks are multi-word phrases, so self-grading is vague. **Fix:** blank "one" and "every"; give distinct hints.

## tmpl-function-syntax  (.../09-templates-basics/tmpl-function-syntax.md)
- **weak**: the distractors (`template T`, `typename T`, `<typename T>`) are ungrammatical fragments, not misconceptions, and the answer is the only complete-looking chip. **Fix:** use real slips: `template <T>`, `template <typename T>;`, `template <typename T, typename U>` (fails: U not deducible).

## err-own-exception-type  (.../12-error-handling/err-own-exception-type.md)
- **weak**: `std::string` is a strawman distractor, and only 3 chips. **Fix:** swap in `std::error_code` or `std::bad_alloc` (fails the harness's `ConfigError("...")`/message use) so each wrong choice is something a candidate might believe.

## err-explain-failure-paths  (.../12-error-handling/err-explain-failure-paths.md)
- **weak**: the question asks "when a function should not throw at all", but the rubric only covers `noexcept` as a promise and exceptions vs return values. **Fix:** change the question to "...and what `noexcept` promises", or add a rubric claim about when not to throw.

## ub-passing-tests-prove-nothing  (.../14-undefined-behaviour/ub-passing-tests-prove-nothing.md)
- **weak**: `scores[10]` in a 10-element array plainly looks wrong, so it is a strawman, and "Is it correct?" is a yes/no. **Fix:** show a loop `for (i = 0; i <= n; ++i)` where the off-by-one is subtle, and ask "what can this program print on a different compiler?".

## ub-optimiser-assumes-no-overflow  (.../14-undefined-behaviour/ub-optimiser-assumes-no-overflow.md)
- **weak**: bold answer is about 28 words (limit 15). **Fix:** bold "Signed overflow is undefined, so the compiler assumes it never happens." and move the rest below.

## stdalgo-accumulate-init  (.../11-algorithms-and-lambdas/stdalgo-accumulate-init.md)
- **weak**: the back adds a second fact (`accumulate` lives in `<numeric>`), a lookup that is not tested. **Fix:** delete that sentence.

## conc-data-race-one-writer  (.../16-concurrency-basics/conc-data-race-one-writer.md)
- **weak**: yes/no front; the belief it targets ("only one writer, so it's safe") is not stated. **Fix:** tag it misconception, add an `elaborate` prompt, and ask "what may A observe, and what does the standard guarantee?".

## conc-waiting-destructor  (.../16-concurrency-basics/conc-waiting-destructor.md)
- **weak**: no "in C++20" in the front, no back (what a `jthread` destructor does, plus request-stop), and no consequence. A lookup of a name. **Fix:** front "In C++20, which type ...?"; add a back: joins in its destructor, so the forgotten-join `terminate` cannot happen.

Reviewed 77 cards: 0 wrong, 4 confusing, 14 weak; OK: 59.

## Applied
- linkage-extern-global-variable: fixed (front adds "so that exactly one `.cpp` file holds the definition"; back names C++17 `inline` variable as the header-only alternative).
- tmpl-constrained-auto: fixed (`requires: [tmpl-concept-intro]`).
- err-pick-a-channel: fixed by split into three single-blank cloze Cards, leaking example dropped. The id keeps the throw case, because cpp-core/exceptions-far-away-failure requires it for that idea. New: err-channel-assert-bug (requires err-assert-vanishes-ndebug), err-channel-return-value (requires err-pick-a-channel).
- tmpl-explain-templates: fixed (requires tmpl-deduction-conflict, tmpl-distinct-types, tmpl-concept-error, which reaches tmpl-error-at-instantiation; fan-in stays 3). Item 2 is now one claim; item 5 drops `std::integral auto` so tmpl-constrained-auto isn't needed.
- virtual-delete-through-base: fixed (requires only virtual-enable-dispatch; back says `~Reverb` and `samples` never run).
- virtual-pure-syntax: fixed (hint "a class category"; "gives it no implementation").
- virtual-static-dynamic-type: fixed (reference now reaches `pet` through `groom(Animal&)`).
- linkage-inline-header-fix: fixed (hint "a keyword before the return type"; "one function shared by the whole program" kept).
- linkage-which-step-fails: fixed differently. A second compiler-error blank would leak by elimination, so the card keeps one blank and drops "Every file compiles", which gave the step away.
- linkage-odr-counting: fixed (blanks "one" / "every", distinct hints).
- tmpl-function-syntax: fixed (distractors `template <T>`, `template <typename T>;`, `template <typename T, typename U>`; explanation covers each).
- err-own-exception-type: fixed (`std::string` replaced by `std::bad_alloc`; kept 3 chips).
- err-explain-failure-paths: fixed (question now asks "when to return an error instead, and what `noexcept` promises"; requires err-channel-return-value in place of err-pick-a-channel).
- ub-passing-tests-prove-nothing: fixed (`i <= 5` loop over 5 scores; asks what it may print elsewhere. The `410` output was checked with g++ 16.2 at -O0 and -O2).
- ub-optimiser-assumes-no-overflow: fixed (11-word bold answer; `return false` checked with g++ 16.2 -O2).
- stdalgo-accumulate-init: fixed (`<numeric>` sentence deleted).
- conc-data-race-one-writer: fixed (misconception tag, elaborate, belief stated in front, why-tempting + fix in back).
- conc-waiting-destructor: fixed (front "In C++20"; passage adds what the destructor does and the consequence; request-stop left out to keep one idea).
