# Audit: cpp-essentials sample (40 Cards)

Method: PEDAGOGY.md section 0/2/3/3.1/4, each Card read against its transitive `requires` closure. Facts re-run under g++ 16.2 (trace values, slicing, alignas, iterator invalidation, lock_guard). lint-shape flags only `expr-conditional-operator` (not in the sample).
Verdicts: OK / OK-nit (fine, cosmetic fix) / PROBLEM.

| # | Card | Verdict | Problem -> fix |
|---|---|---|---|
| 1 | spaceship-basics | OK | |
| 2 | virtual-call-in-constructor | OK-nit | Trace within budget (1 value, 2 probes, 4 changes; BD / BDDB verified). Back explains GCC vptr internals and "Verified by running..." -> cut both sentences. |
| 3 | linkage-extern-global-variable | OK | |
| 4 | iter-explain-vector-growth | PROBLEM (weak) | Rubric items 2, 4, 5 each hold two claims ("allocated and transferred", "transfers every element, so reserve", "dangles; keep an index"); "contiguous" is taught by no closure Card -> one claim per item; add a contiguity sentence to iter-size-vs-capacity or drop it from item 1. |
| 5 | stdalgo-find-vs-find-if | PROBLEM (give-away) | Binary choice solved by name: `_if` + "greater than 10" = a condition. No closure Card teaches `std::find` or the (first, last, value) shape -> show a call `std::find(v.begin(), v.end(), 10)` and ask what it can and cannot test, or ask for the call. |
| 6 | class-this-pointer | PROBLEM (give-away) | Member named `where()` returning `this` plus `Tally* p = b.where()` makes `&b` guessable without knowing `this` -> rename to `self()`-free neutral name like `get()`, or ask what `this->count` means. Back also adds `*this` and `this->` (extra ideas). |
| 7 | string-literal-is-char-array | OK-nit | Back carries type, decay and `pet.size()` -> keep 4 elements + `'\0'` + `const char[4]`. |
| 8 | conc-lock-the-counter | PROBLEM (weak) | The common wrong answer, the braced temporary `std::lock_guard<std::mutex>{m};` (compiles, unlocks at once), is not a chip; the offered unnamed form fails for a different reason (it redeclares `m`, no default constructor), confirmed by compiling. Harness is `int main(){}` so mutual exclusion is never checked -> swap chip 2 for the braced temporary and use a constexpr flag harness like raii-guard-destructor. |
| 9 | err-noexcept-broken-promise | OK | |
| 10 | class-default-ctor-restore | OK | |
| 11 | linkage-odr-counting | PROBLEM (order) | Uses `inline` twice, but `inline` is taught only by linkage-inline-header-fix, which requires this Card (inverted). Three blanks; `every` is guessable from `exactly one` -> add a one-clause definition of `inline` on the front, or reorder; cut to c1 and c3. |
| 12 | templates-instantiation | OK | |
| 13 | io-cout-insertion | OK | |
| 14 | conc-atomic-or-mutex | PROBLEM (wrong) | "No thread ever waits" is false: contended atomics stall on the cache line. Back also adds a second idea (when a mutex is needed) -> bold "No thread blocks or sleeps: each increment is one indivisible instruction"; move the mutex clause to elaborate. |
| 15 | layout-alignas-sizeof | OK | |
| 16 | raii-guard-destructor | OK-nit | `constexpr ~Lock()` and the bool* flag are machinery the closure does not teach; the answer needs only "named object". Acceptable for the harness; add `constexpr` destructor to the front clause. |
| 17 | conc-thread-argument-by-reference | PROBLEM (give-away) | `#include <functional>` in the shown code is the only hint to `std::ref`; the other two chips are the Go-style guesses, so the odd chip wins -> include both headers in the harness only, or add a chip such as `std::cref(total)`. |
| 18 | types-auto-deduces | OK | Depth 0, within the baseline. |
| 19 | iter-range-for-alias | OK | |
| 20 | vc-explain-value-categories | PROBLEM (weak) | Item 4 states three binding rules, item 3 four examples, item 2 two claims; all taught by the closure (vc-plain-ref..., vc-classify-cloze, ...) -> split item 4: keep "T& binds only lvalues; const T& also takes temporaries"; drop `T&&` or give it its own Card. |
| 21 | virtual-function-intro | OK | Worked example, 2 rows. |
| 22 | tmpl-concept-error | OK | |
| 23 | iter-growth-invalidates | OK | Most common wrong answer `*it` is a chip and fails (verified). |
| 24 | err-throw-catch-intro | OK | |
| 25 | class-init-list-vs-body | OK-nit | Counts 2 and 3 verified. Back says "temporary" but life-temporary-full-expression is not in the closure; `class-member-function-this` is not needed -> drop that edge, say "a nameless Name(7)". Remove "Verified by running...". |
| 26 | class-delete-copy | OK | |
| 27 | exceptions-catch-by-value-slices | PROBLEM (weak) | Two try/catch runs in one trace (section 3.1: one run), 4 changing values. Values verified (false, true; libstdc++ gives "std::exception") -> trace only the by-value run, ask `value_kept`; the by-ref contrast is already in err-catch-by-reference-why. |
| 28 | const-ref-parameter | PROBLEM (give-away/order) | Front lists both properties ("never copied", "a temporary can still be passed") so two chips remain; no closure Card teaches that only `const&` binds a temporary (vc-plain-ref-rejects-temporary is not in the closure) -> add that Card to `requires`, state only "read-only parameter called with `std::string("a b c")`". |
| 29 | life-copy-init-not-assign | PROBLEM (term) | "copy constructor" is not defined on the front or in the closure (class-delete-copy, which defines it, comes later) -> add the clause "(the constructor that builds a new object from one of the same type)". |
| 30 | staticpoly-static-vs-dynamic | OK | |
| 31 | ptr-reference-must-bind | OK | |
| 32 | life-delete-matches-new | OK-nit | `new int[5]{}` is unexplained syntax; no closure Card teaches `new[]` -> write `new int[5]` and say "an array of five". |
| 33 | iter-array-fixed-size | OK-nit | The `3` in `std::array<int, 3>` is unexplained -> add "a fixed-size array of 3 ints". |
| 34 | virtual-static-dynamic-type | PROBLEM (give-away) | "dynamic type" undefined on the front, and `Animal& pet` fed `Dog rex` leaves two answers where Animal is visibly the declared one -> define "type of the object actually there" in a clause, and ask where a call in `groom` resolves; or offer 3 types. |
| 35 | smart-pointers-sink-parameter | OK | |
| 36 | linkage-inline-meaning | OK | |
| 37 | conc-thread-shares-memory | OK-nit | `std::thread worker(bonus)` is not defined on the front, and the comment "wait for bonus to finish" gives away the join. Add "runs `bonus` on a new thread"; drop the comment. |
| 38 | types-static-cast-value | OK | Distractors verified to fail. |
| 39 | types-uninit-local-read | OK | |
| 40 | structured-bindings-basics | PROBLEM (term) | `auto [a, b] = p;` is not defined, so the answer is a 1-or-9 coin flip -> add a clause "declares a and b for p's two members", then ask copy or alias. |

## Summary
- Clean OK: 20 of 40 (50%). OK including cosmetic nits: 27 of 40 (68%). Real problems: 13 (33%).
- Recurring problem types: give-aways by name or elimination (5, 6, 17, 28, 34), undefined terms (11, 29, 40, and nits 32, 33, 37), compound rubric items (4, 20), weak distractor and harness (8), one false claim (14), trace with two runs (27).
- Depth-0 Cards: only types-auto-deduces; uses nothing beyond the baseline.
- Complaint 1, background knowledge: mostly fixed. Closures are short and chained, and 6 Cards still use an undefined term.
- Complaint 2, trace overload: fixed. Two traces are within budget; one runs two try blocks.
- Complaint 3, give-aways: not fully fixed. 5 of 40 still leak.
