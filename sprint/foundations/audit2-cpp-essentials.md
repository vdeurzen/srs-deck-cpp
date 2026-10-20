# Audit 2: cpp-essentials sample (40 Cards)

Method: transitive `requires` closure per Card, read as the learner meets it. Facts and trace values checked by hand (no wrong facts found).

| # | Card | Verdict |
|---|------|---------|
| 1 | ub-definition | OK |
| 2 | ptr-reference-vs-pointer | OK |
| 3 | variadic-forward-pack | OK (requires a code Card, `move-semantics-perfect-forwarding`, for the rung-1 idea; locks it behind practice, not hit as a problem) |
| 4 | atomics-synchronizes-with | OK |
| 5 | ptr-ref-extension-trap | OK |
| 6 | raii-owner-in-destructor | PROBLEM untaught construct: `if (!f)` and `if (f)` use a pointer as a condition; closure has only `ptr-null-pointer`-less path (not in closure; only `ptr-holds-an-address`). Fix: require `ptr-null-pointer` and write `f == nullptr` / `f != nullptr`, or drop the null guard from the example. |
| 7 | move-semantics-explain-mechanism | OK (all 5 rubric items taught in closure) |
| 8 | virtual-vptr-sizeof | PROBLEM untaught: `= default` (class-default-delete-where not in closure), trailing `const` on `area()` (no const Card in closure); vptr/vtable first appear in the back, so a learner can only guess (`1` for an "empty" struct). Fix: require `class-default-delete-where` and `const-member-on-const-ref`, or drop `= default`/`const` from the shown code; add a one-clause front definition ("each polymorphic object carries one hidden pointer to its class's function table") or a rung-1 vptr Card first. |
| 9 | vocab-explain-variant | OK |
| 10 | layout-declaration-order | OK |
| 11 | threads-data-race-is-ub | OK |
| 12 | raii-ctor-throw-unwinds-members | OK (7 state changes, 2 probes, within budget; values verified by reasoning) |
| 13 | atomics-chunk-cas-loop | OK (6 lines, expose_ms 11000 correct; `weak` is introduced in the back only, minor) |
| 14 | lambda-explain-closures | OK |
| 15 | cast-functional-notation | OK |
| 16 | class-rule-of-zero | PROBLEM untaught chip + near give-away: `shared_ptr<int[]>` is never taught in the closure, and the front lists the three required behaviours (frees, not copyable, cheap move), so the chips fall by elimination (`unique_ptr` is the only move-only owner). Fix: require `smart-shared-ptr-intro`; shorten the front to "Buffer is the sole owner of its heap array; declare no special members" and let the learner recall which member type does the work. |
| 17 | virtual-is-a | OK |
| 18 | vc-lvalue-has-identity | OK |
| 19 | virtual-pure-syntax | PROBLEM (minor) untaught: trailing `const` in `double area() const`. Fix: remove `const` from the example or require `const-member-on-const-ref`. |
| 20 | conc-check-then-act | OK (0 or -1 verified by reasoning) |
| 21 | containers-stable-references | PROBLEM untaught: `std::deque` and `std::list` are taught nowhere upstream, and the front gives no candidates, so it is unanswerable; "sequence container" is undefined. Fix: first add a rung-1 Card ("deque: blocks, O(1) index, appends never move elements"), or list the candidates on the front with one clause each. |
| 22 | string-basics | OK |
| 23 | smart-pointers-explain-shared-ptr | OK |
| 24 | const-explain-signatures | OK |
| 25 | constexpr-fn-static-assert | PROBLEM give-away (weak): the front says a constexpr function "may be evaluated by the compiler", so "while compiling" is guessable among two options without knowing `static_assert`. Fix: drop that sentence; ask "Does this program build, and what happens when you run it?" |
| 26 | move-semantics-const-member-copies | OK |
| 27 | life-explain-copies | OK |
| 28 | initialization-aggregate-braces | OK |
| 29 | err-throw-jumps-to-catch | OK (total 4, log "4!" correct) |
| 30 | exceptions-which-guarantee | PROBLEM untaught: range-for `for (int x : extra)`; `iter-range-for-intro` is not in the closure. Fix: add `iter-range-for-intro` to `requires`, or use an indexed loop. |
| 31 | containers-reference-invalidated-by-growth | OK |
| 32 | vocab-variant-intro | PROBLEM give-away: "what does v hold after `v = "hi"`" is answered "hi" without the target idea (exactly one alternative). Fix: ask `v.index()` after the assignment (1), or "can v still produce the int 3?" |
| 33 | containers-explain-choosing | OK |
| 34 | class-invariant-who-checks | OK |
| 35 | life-ctor-dtor-count | OK (alive 2, 1, 1 correct) |
| 36 | fn-namespace-clash | OK |
| 37 | ptr-arrow-null-check | OK (distractors fail the constexpr harness) |
| 38 | atomics-trace-message-passing | PROBLEM duplicate and non-discriminating: same program and the same "42, never 0" question as `atomics-memory-order-intro`; a learner without the memory model also answers 42. Fix: delete it, or trace a case where the answer depends on the idea (e.g. the flag set before the payload write, probe what the consumer may see, with a harness-style deterministic variant). |
| 39 | vc-named-rvalue-ref-is-lvalue | OK |
| 40 | class-struct-members | OK |

## Totals
- OK: 31/40 (77.5%). Problems: 9 Cards.
- Untaught term/construct: 6 (raii-owner-in-destructor, virtual-vptr-sizeof, virtual-pure-syntax, containers-stable-references, exceptions-which-guarantee, class-rule-of-zero).
- Give-away: 3 (class-rule-of-zero as secondary, constexpr-fn-static-assert, vocab-variant-intro).
- Duplicate/non-discriminating: 1 (atomics-trace-message-passing).
- Wrong fact: 0. Over-budget trace: 0.
- Depth-0 Cards (fn-namespace-clash, class-struct-members): both within the Go baseline.

## Complaints
1. Background knowledge: mostly fixed; remaining gaps are incidental syntax in code (`= default`, trailing `const`, pointer-as-condition, range-for) and two unseen types (`deque`, `shared_ptr`).
2. Trace working memory: fixed. All 5 traces in the sample (ctor-throw, err-throw, which-guarantee, ctor-dtor-count, message-passing) are within the §3.1 budget.
3. Give-aways: mostly fixed; 3 residual (above), mild.
