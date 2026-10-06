# Review: cpp-core

Phase 1 (correctness) review, 2026-10-06: all 137 Cards, in three parts by
topic. Majors were fixed in place; minors that are trivial were fixed, the rest
are left for Phase 4 (card shape) and marked as open below. Only one Card's
`version` was bumped (`callables-function-ref-signature`: rewritten off
`std::function_ref`, which GCC 14 lacks).

Separately fixed before the review, from `scripts/check-code`:
`templates-requires-clause`, `move-semantics-destructor-suppresses-move`
(distractors that passed), `parsons-schedule-on-pool` (distractors that
compiled in place of a line; two still pass as an extra line — LOOSE, waiting
on pre-filled parsons lines).

State after Phase 1: `tool/validate` 0 errors; `scripts/check-code` 0
problems, 5 LOOSE parsons Cards across both Decks.


---

## Review: cpp-core coroutine cards (Phase 1, correctness)

Scope: `04-language/coroutines-*` (42 cards), `07-tracing/coroutine-execution`
(3 traces), `06-idioms/chunks/{awaiter-skeleton,coroutine-frame-owner}`,
`06-idioms/parsons/coroutine-generator-skeleton`. (`parsons/schedule-on-pool`
excluded by brief; `chunks/io-uring-*` are `compile: null` liburing snippets
tagged `coroutines` — skimmed, nothing to report.)

Checked against [dcl.fct.def.coroutine], [expr.await], [stmt.return.coroutine],
cppreference, P0913/P0981/P2300/P2718, libstdc++ 16 `<generator>` and
`liburing.h`. Every one of the 13 compile-graded cards in scope passes
`scripts/check-code` (reference compiles, every distractor fails). All three
traces were re-run (GCC 16.2, `-std=c++23 -Wall -Wextra`): every probe value
matches (`RVRS`/`RVRSVE`/`true`; `0`/`1,10,true`/`2,20,true`/`3,false`;
`GI`/`GIBRF`/`GIBRF,true`). All 19 distinct ref URLs resolve (HTTP 200).
`tool/validate cpp-core algo-systems` → 0 errors. No `version` bumped.

### Findings

### MAJOR

#### M1 — `coroutines-generator-dangling-parameter` — the "use-after-free" example is well-formed C++23

**What was wrong.** Front and back used `for (char c : chars(std::string{"hi"}))`
as the dangling case, and the back asserted "the range-for's lifetime extension
applies to the temporary *range object*, not to the arguments". That was true
through C++20; C++23 adopted P2718R0 ("lifetime extension in range-based for
loops"), which extends *every* temporary in the range-initialiser to the end of
the loop. Verified: GCC 16 `-std=c++23` runs the inline form correctly (string
destroyed after the loop); the two-statement form `auto g = chars(std::string{"hi"}); for (char c : g)`
is a stack-use-after-scope under ASan. The deck targets C++23, so the card
taught a wrong rule — and a `misconception` card whose "wrong" claim is actually
true in the target standard inverts its own purpose. (GCC 14 — the app's
compiler — does not implement P2718, which is why the old text looked right.)

**Fix applied.** Front example changed to the two-statement form (the recalled
fact — "the frame copies the *reference*, not the referent" — is unchanged, so
`version` kept). Back rewritten: same mechanism, two-statement example, an
explicit paragraph saying the inline spelling is rescued by P2718 on GCC 15 /
Clang 19 but not by the frame and not on GCC 14. Also dropped the claim that
`-Wdangling`/`-Wdangling-reference` "catch some of these" (neither targets this
pattern). *Judgement call:* if the owner prefers the inline example to stay on
the front, bump `version` and keep the P2718 paragraph.

### MINOR

#### m1 — `coroutines-eager-vs-lazy-start` — wrong claim about exceptions in eager coroutines *(fixed)*

Back said an exception before the first `co_await` "reaches `unhandled_exception()`
while the caller has no handle yet, so a promise that stores the exception for
later has no one to hand it to". Not so: `get_return_object()` has already run,
so the return object exists and a stored `std::current_exception()` *can* be
rethrown later — provided `final_suspend()` suspends; with `suspend_never` the
frame (and the stored exception) is gone. Rewritten to say exactly that.

#### m2 — `coroutines-co-return-forms` — flowing off the end without `return_void` is UB, not a diagnosed error *(fixed)*

Passage said running off the end "requires" `return_void()`, implying a compile
error like the `co_return;` case. [stmt.return.coroutine]/3: it is undefined
behaviour; GCC 16 compiles it silently even with `-Wall`. One clause added
outside the cloze markers. Also `refs` anchor `#co_return` does not exist on the
cppreference page (anchors are `Execution`, `Promise`, `co_await`, `co_yield`);
changed to `#Execution`.

#### m3 — `coroutines-promise-return-value` — same dead `#co_return` anchor *(fixed)*

#### m4 — `coroutines-promise-type-cloze` — "`initial_suspend`/`final_suspend` decide whether the coroutine starts suspended" *(fixed)*

Only `initial_suspend` decides the start. Removed `/final_suspend`.

#### m5 — `coroutines-scheduling-stop-token-plumbing` — `std::inplace_stop_token` presented as available *(fixed)*

It is C++26 (P2300), absent from GCC 14. Marked as such.

#### m6 — `chunks-coroutine-frame-owner` — explanation says the pattern is "why every real task type is move-only", but the snippet is non-movable *(fixed, Phase 4: prose now says the minimal owner is non-movable and a real type adds a move ctor; snippet unchanged)*

Copy ops deleted, no move ctor/assignment declared, so `FrameOwner` cannot be
moved either. Not wrong as a minimal RAII owner; prose slightly overstates.
Adding a move ctor would change the memorised snippet, so left for Phase 4.

#### m7 — `coroutines-co-return-forms` — hint for c3 nearly restates the answer *(fixed, Phase 4: hint is now "a diagnosed error, not merely undefined behaviour")*

Hint quotes GCC's diagnostic ("declares both return_value and return_void");
answer is "ill-formed". Borderline leak; Phase 4 hint pass.

#### m8 — `coroutines-promise-type-cloze` — c3 hint "eager vs lazy start" is a near-synonym of the answer *(fixed, Phase 4: hint is now "its first scheduling decision")*

Phase 4.

#### m9 — `coroutines-generator-elements-of` — "quadratic" is loose *(fixed, Phase 4: now "d resumes per element, O(n·d) for the traversal")*

Nested hand-written loops cost O(depth) resumes per element, i.e. O(n·d)
overall — quadratic only for a degenerate (list-shaped) tree. Phrasing, not a
wrong fact.

#### m10 — `coroutines-generator-explain` / `coroutines-generator-no-co-await` / `coroutines-await-transform-hook` — "`await_transform` is deleted" *(fixed, Phase 4: all three now say a deleted `await_transform()` overload is declared, so any `co_await e` finds a declaration and no viable call)*

Precisely, `std::generator::promise_type` declares `void await_transform() = delete;`
(a nullary, deleted overload); any `co_await e` then finds a declaration and
has no viable call. Same effect, slightly different mechanism; fine as taught.

### Verified correct (no change)

`what-makes-a-coroutine`, `plain-return-forbidden` (constexpr/consteval, ctor/dtor,
`main`, C varargs, deduced return — all per [dcl.fct.def.coroutine]/1 and
[dcl.spec.auto]), `return-object-timing` (params copied → promise constructed →
`get_return_object` → `initial_suspend`), `explain-transformation`,
`suspension-points-cloze`, `generator-basic`, `awaiter-await-ready`,
`await-suspend-return-types` (incl. [expr.await]/5.1 exception-from-
`await_suspend` rule), `await-suspend-transfer`, `await-transform-hook`,
`await-transform-injection`, `awaitable-vs-awaiter`, `symmetric-transfer`
(P0913), `elements-of` (allocator argument confirmed in libstdc++),
`generator-is-a-view` (`reference` is `T&&` when `V` is void — confirmed),
`yield-value-hook`, `done-and-destroy-preconditions`, `explain-promise-protocol`,
`final-suspend-noexcept` (GCC message confirmed: "required to be non-throwing"),
`frame-allocation` (P0981), `handle-from-promise`, `handle-operations` (`\::`
escaped), `handle-typed-vs-erased`, `parameters-copied` (already uses the
two-statement form), `promise-return-value`, all 11 `coroutines-scheduling-*`
(`io_uring_prep_cancel(sqe, const void*, int)` matches liburing;
`continues_on`/`starts_on` are the P2300R10 names), the three traces, the two
chunks, and the parsons skeleton.

---

## Review: cpp-core/topics/09-execution/** + 06-idioms/chunks/sender-pipeline

Checked against the C++26 working draft [exec] (eel.is, Oct 2026) and P2300R10.
All edits keep `version` (question meaning unchanged). `tool/validate`: 0 errors.
No compile-graded cards in scope (all basic/cloze/explain/chunk with compile: null).

### Findings

### Major

- **M1 `execution-split-multi-shot`** — Presented `split` as current std::execution. It is in
  P2300R10 but was removed from the C++26 draft by P3682 (Sofia 2025); `ensure_started`/
  `start_detached` were removed earlier by P3187. Also claimed `connect` takes the sender
  "by value". **Fixed:** front note on status; back says single-shot senders are connected as
  rvalues (lvalue connect fails to compile); new "C++26 status" paragraph pointing to
  `counting_scope` + `spawn`/`spawn_future`, `stdexec::split` still exists.
- **M2 `execution-three-channels`** — c2 hint said `set_value` is "the only one allowed to
  throw"; c4 sentence said only `set_error`/`set_stopped` are noexcept. In the draft all three
  are `MANDATE-NOTHROW` ([exec.set.value]). **Fixed:** hint trimmed; c4 sentence now "All three
  completion functions — set_value included — are required to be {{c4::noexcept}}", with the
  catch-and-route-to-set_error explanation. Answer unchanged.
- **M3 `execution-explain-model`** — Same noexcept error in a checklist item. **Fixed.**
- **M4 `execution-bulk`** — Used the pre-P3481 signature `bulk(sndr, shape, f)`; C++26 is
  `bulk(sndr, policy, shape, f)` plus `bulk_chunked`/`bulk_unchunked`. Also said other indices
  are "still waited for" after a throw; the draft says only a subset of `f` invocations may have
  run. **Fixed:** question signature, policy paragraph, exception sentence.

### Minor

- **m1 `execution-stopped-channel`** — "a timeout is a `when_all` with a timer" is wrong
  (`when_all` waits for the timer on success and only cancels on error/stopped).
  **Fixed:** timer calls `request_stop()` on the work's stop source.
- **m2 `execution-senders-and-coroutines`** — listed `split` as a std algorithm. **Fixed** →
  `let_value`. (Could also mention C++26 `std::execution::task` (P3552); not done.)
- **m3 `execution-completion-signatures`** — `get_completion_signatures(sndr, env)` is the R10
  CPO form; C++26 (P3557) is `consteval get_completion_signatures<Sndr, Env...>()`. **Fixed**
  (both forms named).
- **m4 `execution-scheduler-and-schedule`** — "thread pools come from the implementation or a
  library" ignores C++26 `parallel_scheduler` (P2079). **Fixed.**
- **m5 `execution-sync-wait`** — error mapping is AS-EXCEPT-PTR: `error_code` →
  `system_error`, other types thrown as is. **Fixed.**
- **m6 `execution-starts-on-vs-continues-on`** — didn't mention `starts_on` was `on` before
  P3175, and that `on` now names a different adaptor. **Fixed** (one clause).
- **m7 `execution-sender-is-a-description`** — "usually trivially-copyable" overclaims (captured
  lambdas, strings). **Fixed** → "cheaply movable".
- **m8 `execution-environment-queries`** — c3 says adaptors forward any query they don't answer;
  in the draft only queries with `forwarding_query` true are forwarded (FWD-ENV), which c4 then
  states. Slight tension. **Not fixed** (proposed: c3 "forward *forwarding* queries to...").
- **m9 `execution-connect-and-start`** — "the lifetime rules below" refers to another card.
  **Not fixed** (Phase 4 wording).
- **m10 all cards** — refs are only the cppreference hub + wg21.link/p2300; the facts above
  depend on later papers (P3187, P3682, P3481, P3557, P2079, P3175). Proposed: add
  https://eel.is/c++draft/exec section links per card. **Not fixed.**

Verified correct: then/let_value semantics and lifetime claim, `when_all` join/stop/concatenation
and single-value-signature requirement, `sync_wait` optional<tuple>/nullopt/one-value-signature
and run_loop `get_scheduler`/`get_delegation_scheduler` env, `continues_on` ≡ former `transfer`,
`schedule_from(sch, sndr)` lowering, `as_awaitable`/`with_awaitable_senders`/`unhandled_stopped`,
`never_stop_token` default, `inplace_stop_source` in `when_all`, `stopped_as_optional`,
`upon_stopped`, cloze escaping (`std\::optional<std\::tuple<...>>`), chunk card text.

---

## Findings — cpp-core (01-basics, 02-types, 03-library, 04-language/spaceship-and-comparisons, 05-interview, 06-idioms non-coroutine/non-sender, 07-tracing/lifetimes-and-references, 08-transfer)

Paths relative to `cpp-core/topics/`. Out of scope (other agents): destructor-suppresses-move, requires-clause,
function-ref-signature, schedule-on-pool, coroutine/sender chunks and parsons.

Verification: `scripts/check-code --id` on all 21 in-scope compile-graded Cards (g++ 16.2) → 0 problems, 0 loose
(every distractor fails). All 5 traces re-run instrumented under `-fsanitize=address,undefined` → every probe matches.
`tool/validate cpp-core algo-systems` → 0 errors. No `version` bumped: each fix leaves the question and answer the same.

### MAJOR (all fixed)

#### M1 — `03-library/ranges-and-views/borrowed-range-cloze.md` — the example trap doesn't exist
`std::ranges::filter_view(std::vector{1,2,3}, pred)` does not dangle: since P2415 (a DR against C++20), `views::all_t`
of an rvalue container is `owning_view`, which moves the vector into the view (checked: ASan clean, correct sum).
**Fix.** Changed the example to `auto it = std::ranges::find(std::vector{1,2,3}, 2);`, which returns
`std::ranges::dangling`. c1 and c2 keep their answers.

#### M2 — `02-types/move-semantics/moved-from-state.md` (+ rubric line in `explain-move-semantics.md`) — the moved-from rule was too strict
The back said standard types promise only "destructible, assignable", and that any other use is a logic error. That's wrong.
[lib.types.movedfrom] says "valid but unspecified": the invariants hold, so any operation without preconditions
(`size()`, `empty()`, `clear()`) is fine. Only operations with preconditions need care. Also, `unique_ptr`/`shared_ptr` do
specify a null moved-from state. **Fix.** Rewrote the back and the rubric item.

#### M3 — `04-language/spaceship-and-comparisons/spaceship-basics.md` — `==` from `<=>`
The back claimed that defining `operator<=>` gives `==`/`!=` "unless you also declared `operator==`". In fact only a
**defaulted** `<=>` implicitly declares `==`; a hand-written `<=>` gives no equality. **Fix.** Corrected the back.

#### M4 — `08-transfer/go-to-cpp/nil-vs-nullptr-optional.md` c2 — "the call itself is fine"
Calling a non-static member function through a null pointer is already UB, whatever the body does. The card's own hint
said the same, so the passage contradicted it. **Fix.** c2 now reads "the call itself is {{c2::undefined behaviour, even if
the body never touches `this`}}". The answer is still "undefined behaviour", so the version stays.

#### M5 — `06-idioms/chunks/if-constexpr-dispatch.md` — the rationale was false
The back said `describe<double>` "never has to compile `std::to_string(value)`" and that a plain `if` would fail. But
`std::to_string(double)` exists, and a plain `if` compiles for `double` (checked). **Fix.** The explanation now uses
`T = std::string` as the case where `if constexpr` is needed.

#### M6 — `01-basics/value-categories/reference-binding-cloze.md` c2 — the hint cued the wrong rule
The hint pointed to "const reference extends lifetime", but the blank asks what `const T&` can bind to.
**Fix.** The hint now reads "adding const lifts the lvalue-only restriction".

#### M7 — `02-types/templates-and-concepts/concepts-vs-sfinae.md` — "concepts add no expressive power"
This contradicted the card's own subsumption bullet. It also missed that a requires-clause can constrain non-template members,
such as a conditionally trivial special member, which SFINAE cannot do. **Fix.** Reworded the closing paragraph.

### MINOR — fixed (trivial)

- m1 `01-basics/const-constexpr-consteval/if-constexpr-discard.md`: "`*t` is never even parsed" is wrong; the discarded statement is parsed, just not instantiated. Fixed.
- m2 `01-basics/value-categories/temporary-materialization.md`: "whenever a prvalue needs a result object" contradicted its own `T t = T{};` example. Now "used where a glvalue is needed".
- m3 `01-basics/initialization/magic-statics.md`: the front asks what the standard calls it, but the standard names nothing. The back now says so and cites [stmt.dcl]/3.
- m4 `02-types/move-semantics/noexcept-move.md`: `vector` copies on reallocation only if the type is copyable (this `Widget` isn't). Fixed.
- m5 `02-types/templates-and-concepts/deduction-guide.md`: the garbled sentence "pointer outlives the temporary…" now reads "non-owning pointer to the literal"; also says aggregate CTAD, not constructor.
- m6 `03-library/ranges-and-views/sort-projection.md`: "every range algorithm accepts [a projection]" changed to "most…that compare or test elements" (`ranges::copy`/`fill` don't).
- m7 `03-library/ranges-and-views/lazy-cloze.md`: views can own (`owning_view`, `single_view`), so "does not own" became "typically does not own".
- m8 `05-interview/function-ref-and-callables/explain-type-erasure.md`: marked `std::function_ref` as C++26 (the app targets C++23).
- m9 `06-idioms/chunks/crtp.md`: the only ref was P0847 (deducing this); added cppreference's CRTP page.
- m10 `06-idioms/parsons/jthread-stop-token.md`: the destructor calls `request_stop()` before `join()`. Added.
- m11 `06-idioms/parsons/visit-with-overloads.md`: "the compiler rejects it if a new alternative is uncovered" isn't true when an existing lambda accepts it by implicit conversion. Added that caveat.

### MINOR — open (for Phase 4)

- m12 `01-basics/initialization/default-value-zero.md`: "built-in type at block scope" is imprecise. It should say automatic storage; a block-scope `static int x;` is zero.
- m13 `01-basics/const-constexpr-consteval/consteval-immediate-function-cloze.md`: "every call must be a constant expression" ignores calls in an immediate-function context and C++23 immediate escalation (P2564).
- m14 `01-basics/value-categories/std-move-cloze.md`: "which is why `x` still has an address" muddles things. `x` has an address because it is a variable, not because `std::move(x)` is an xvalue.
- m15 `03-library/ranges-and-views/composition-cloze.md` c1 and `lazy-cloze.md` c3: the hints contain the answer ("`operator|`", "constant time").
- m16 `02-types/templates-and-concepts/instantiation.md`: "unused member never compiled" should say not *instantiated*; also, unused virtual members may be instantiated anyway ([temp.inst]).
- m17 `02-types/templates-and-concepts/requires-expression.md`: the harness specializes `std::hash<Widget>` returning a non-`size_t`, which breaks Cpp17Hash. It's harmless because nothing runs, but it's a poor model.
- m18 `05-interview/function-ref-and-callables/explain-lambda-capture.md`: implicit `this` capture via `[=]` was deprecated in C++20, not removed; "pre-C++20" reads as gone.
- m19 `06-idioms/chunks/raii-guard.md`: `ScopeGuard` is copyable, so a copy fires the callback twice, contradicting "exactly once". An empty `std::function` in the destructor calls `terminate`. Consider deleting the copy operations.
- m20 `06-idioms/parsons/rule-of-five.md`: the copy assignment did `delete[]` before `new`. If `new` threw, `data_` dangled and got a double delete. **FIXED (promoted to Phase 1):** it now allocates and copies into `fresh`, then deletes, then assigns. That gives the strong guarantee and makes self-assignment safe without a check; one explanation paragraph added. Version kept (the question is unchanged). `check-code --id parsons-rule-of-five` is ok, and the assembled program runs clean under ASan/UBSan, including `b = b`.
- m21 `06-idioms/chunks/visit-overload-set.md`: since C++20, aggregate CTAD makes the deduction guide unnecessary. Worth a sentence.
- m22 `08-transfer/go-to-cpp/goroutines-vs-threads.md` c2/c3: thread stacks are a virtual reservation (glibc default 8 MiB), not committed memory. What runs out first is address space, kernel thread limits and scheduler cost, not RAM as such.
- m23 `08-transfer/go-to-cpp/defer-vs-raii.md`: **strawman front.** No Go programmer believes repeating cleanup before every `return` plus `catch` is the *only* way. The real negative transfer is "I need a defer-like scope-guard lambda everywhere" or "destructors are like finalizers". Reframe in Phase 4 (bumps version).
- m24 `07-tracing/lifetimes-and-references/*`: explanations cite "GCC 13.3". Re-verified on g++ 16.2, all probes unchanged. `trace-temporaries-in-range-for`'s front is mildly strawman (that nobody expects the list to die mid-loop), but fine.
- m25 `06-idioms/chunks/io-uring-*.md`: tagged `coroutines` but reviewed. The liburing signatures (`io_uring_prep_read`, `peek_cqe` returning 0 / `-EAGAIN`, `get_sqe` NULL when full) are correct; no errors.

No issues: aggregate-braces, array-ctad, most-vexing-parse, consteval-template-argument, const-vs-constexpr-cloze,
constexpr-function-dual-use-cloze, categories-cloze, overload-binding, taxonomy, perfect-forwarding, rule-of-five (basic),
explain-concepts, two-phase-lookup, filter-transform-pipeline, smart-pointers (all 4), defaulted-spaceship,
ordering-categories, rewritten-not-equal, std-invoke-member, erase-remove, ranges-pipeline, gc-vs-ownership,
interfaces-vs-concepts, slices-vs-span.
