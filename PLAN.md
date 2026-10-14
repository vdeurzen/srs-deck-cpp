# Plan: HFT interview prep — implement-it questions, HFT design, LeetCode patterns

Started 2026-10-12. Built from four read-only surveys of the existing Decks. The
previous plan (bringing cpp-core and algo-systems up to standard) is finished and
archived in `PLAN-done-2026-10.md`. Its ground rules still apply.

The trigger: a friend was asked "implement `vector::push_back`" in an interview. The
aim is to cover the *design decisions* behind that whole family of questions, plus the
HFT-specific design questions, plus LeetCode templates to drill alongside the actual
problem grinding. There's no interview date, so the order is by payoff: be ready
whenever.

## Status

| Phase | State |
| --- | --- |
| 0 Spike + housekeeping | done (2026-10-12) |
| 1 Raw storage (cpp-core) | done (2026-10-12): 11 Cards, depth ≤ 4, reviewed |
| 2 Vector (hft-interview) | done (2026-10-12): 21 Cards incl. `inplace-vector-overflow`; capstones at depth 11 (cpp-core move/exception spine), reviewed |
| 3 SPSC + order book (hft-interview) | done (2026-10-13): spsc 6 Cards, order-book 8 Cards, reviewed |
| 4 LeetCode first 25 | done (2026-10-13): 26 Cards, reviewed |
| 5 Trivia + gap fills | done (2026-10-14): trivia 7 Cards, algo-systems 9 Cards, reviewed |
| 6 Other std components (hft-interview) | done (2026-10-14): smart-pointers 8, type-erasure 4, optional 4, string 2, flat-map 1, reviewed |
| 7 LRU, rate limit, packets, pools (hft-interview) | done (2026-10-14): lru 4, rate-limit 6, packets 3, pools 3, reviewed |
| 8 LeetCode rest + deferred items + capstones | in progress: leetcode groups D/E/F done (2026-10-14, 49 Cards); next rec- capstones, then deferred hft-interview items |

## 0. Decisions (2026-10-12)

1. **Placement is hybrid.**
   - Fundamentals the Decks lack go into the existing Decks, beside their siblings. The
     main one is raw storage: nothing in the repo taught `construct_at`,
     `uninitialized_*`, `destroy`, `allocator_traits` or `launder`.
   - Interview-shaped material goes into the new Deck **`hft-interview`**: the
     implement-X chains, the SPSC / order-book / LRU builds, capstones and trivia.
   - LeetCode templates go into the new Deck **`leetcode`**.
   - Both new Decks build on all four existing Decks, and nothing requires them. Pausing,
     Practice and new-card interleaving work per Deck (tags only filter Browse and
     Stats), so each Deck can be paused or studied on its own.
   - Moving a Card between Decks later would change its full id and orphan its history.
2. **No interview date yet.**
   - Phases run in payoff order: vector → SPSC / order book → LeetCode basics →
     trivia → the rest.
   - Keep `requires` shallow (fan-in ≤ 2, prerequisites are concept Cards), so new Cards
     unlock quickly.

## Ground rules

These are carried over from the previous plan:
- Card ids never change and Cards are never deleted.
- Bump `version` only when the question changes meaning.
- Done means `tool/validate` and `scripts/check-code` over all six Decks report 0
  errors.
- Each new compile-graded Card also passes `scripts/check-code --remote --id …`.
- `scripts/graph` shows no surprise depths.
- A teacher agent writes each topic, `prereq-mapper` wires its seams, and
  `learning-designer` reviews it before the commit.
- Commit once per topic.

## 1. What already exists (reuse via `requires`; do not restate)

- **Vector growth and amortisation are already well covered:**
  - algo-basics: `linear-dynamic-array-growth`, `linear-growth-code`, `linear-growth-trace`, `complexity-geometric-growth`
  - algo-systems: `foundations-growth-factor`, `foundations-growth-below-two`
  - cpp-basics: `iter-size-vs-capacity`, `iter-reserve-keeps-buffer`, `iter-growth-invalidates`
  - cpp-core: `move-semantics-vector-move-if-noexcept`, `exceptions-strong-vs-basic`, `exceptions-commit-by-swap`, `move-semantics-perfect-forwarding`
- **Smart pointers / type erasure:** the cpp-core `smart-pointers-*` cards (control block, make_shared, deleter size), `staticpoly-type-erasure-skeleton`, `callables-explain-function-*`, `strings-sso`, `vocab-optional-*`.
- **HFT concepts are strong; the "write it" step is missing:**
  - algo-systems queues and lock-free: `ll-spsc-ring`, `ll-spsc-orders`, `ll-spsc-cached-index`, `seq-ring-buffer-mask`, `ll-mpmc-*`, `ll-seqlock-*`
  - order book and pools: `ll-order-book*`, `ll-freelist-pool`, `ll-arena-vs-pool`, `seq-intrusive-*`, `seq-handle-generation`
  - other structures: the 38 `hash-*` cards, `heap-timer-wheel*`, `trace-lru-*`
  - latency (excellent): `ll-hardware-numbers`, `ll-tlb-reach`, `ll-rdtsc-ordering`, `ll-coordinated-omission`, `ll-explain-hot-path*`, …
- **LeetCode:** algo-basics has concept, trace and code cards for two pointers, windows, prefix sums, binary search, BFS, Kahn, Dijkstra, union-find, knapsack and LCS. Few patterns have a memorisable template chunk, and nothing is linked to problem numbers.

## 2. Compile-checking implement-it Cards (verified on g142, 2026-10-12)

`check-code` only compiles, but `static_assert(test())` on a `consteval` test *runs*
the code inside the compiler. Constant evaluation rejects leaks, use after free, reads
outside an object's lifetime and out-of-bounds writes, so the compiler works as a
sanitizer.

Every case below was compiled on local GCC 16 and on g142 through Compiler Explorer.
The cases are in the job's scratch directory and aren't kept. Re-derive one from the
description here if needed.

**MiniVec harness.** The container uses `std::allocator<T>`, `std::construct_at` and
`std::destroy`, with `T = std::string` of 20 chars (long enough to heap-allocate). It
pushes 5 elements, then does `w.push_back(w[0])` on a full vector.

Variant results on both compilers:

| variant | result | why it fails |
|---|---|---|
| correct order: construct new at `nb+n`, then relocate, destroy, deallocate | pass | — |
| deallocate before constructing the new element | **fail** | use after deallocation |
| destroy before constructing the new element | **fail** | uninitialised member |
| relocate (move) old elements, then construct the new one | **fail** | value assert: the alias was moved from. This is the `push_back(v[0])` bug, visible. |
| skip deallocate | **fail** | allocated storage not deallocated |
| `std::move` / `b_[n] = x` into raw storage | **fail** | uninitialised element |
| growth `2*cap` from capacity 0 | **fail** | out of bounds |
| skip `destroy` of the old elements | **pass** | moved-from strings own no heap memory. Use the live counter below. |

**Live counter.** A type whose constructor and destructor bump `*int` lets the harness
assert `live == 0`. A skipped `destroy` then **fails**.

**Copy counter for `move_if_noexcept`.**
- With a throwing move: `move_if_noexcept` gives 3 copies (pass); `std::move` gives 0
  copies (**fail**). A plain `old[i]` also gives 3 copies and *passes*.
- With a `noexcept` move: `move_if_noexcept` gives 0 copies (pass); plain `old[i]`
  **fails**.
- So a Card that uses both harnesses discriminates all three choices.

**FakeAtomic.**
- Template the queue on its atomic type: `template<class T, size_t N, class A = std::atomic<size_t>>`.
- A constexpr `FakeAtomic` records `last_load` and `last_store`.
- A `release` store passes; `relaxed` and `seq_cst` **fail**.
- Layout is pinned with `using Q = Spsc<int,4>; static_assert(offsetof(Q, head_) % 64 == 0)`.
  Use the alias: the comma in `Spsc<int, 4>` breaks the `offsetof` macro.

**Packet parsing.**
- `std::bit_cast` + `std::byteswap` on a constexpr byte array pass; leaving out the
  swap **fails**.
- `reinterpret_cast` in a constant expression **fails** (good: that makes it a
  distractor, but don't use it in a reference).

**LeetCode.**
- constexpr works for `vector`, `string`, `array<int,26>`, `push_heap`/`pop_heap` with
  `greater<>`, and `equal_range`.
- `priority_queue` and `unordered_map` are not constexpr. Pin a `priority_queue` with
  `static_assert(is_same_v<PQ::value_compare, greater<int>>)`.

**Not constexpr in C++23 / g142:**
- `std::uninitialized_move` and `std::uninitialized_copy` (constexpr only from C++26).
  Relocate with a `construct_at` loop. `storage-uninitialized-move` stays a `basic`.
- Placement new, `reinterpret_cast`, `memcpy` (put it behind `if !consteval`).
- `std::atomic` operations.

**GCC versions differ.** Reading a trivial `int` after `destroy_at` is rejected by
GCC 16 but **accepted by g142**. Local `scripts/check-code` (GCC 16) can therefore
report a distractor as failing when the app accepts it. That is why `check-code` gained
`--remote` (Compiler Explorer, each Card's own `compiler`), which is now required for
new compile-graded Cards. Distractors must not rely on trivial-type lifetime
diagnostics.

**Follow-up (not in this plan's scope):** run `scripts/check-code --remote` once over
the existing four Decks to find any distractor that only fails on GCC 16.

## 3. Cards

Kinds: b = basic, c = cloze, code, chunk, parsons, trace, explain (≤ 5 rubric items).
Every Card cites a ref.

### 3a. `cpp-core/topics/03-library/raw-storage` — done (11 Cards)
| depth | id | kind | requires |
|---|---|---|---|
| 1 | storage-new-array-wrong | b | cpp-basics/iter-size-vs-capacity |
| 2 | storage-allocate-vs-construct | b | storage-new-array-wrong, cpp-basics/class-constructor-intro |
| 3 | storage-construct-at | code | storage-allocate-vs-construct |
| 3 | storage-live-range-invariant | b | storage-allocate-vs-construct |
| 3 | storage-allocator-traits | b | storage-allocate-vs-construct |
| 4 | storage-destroy-at-pop | b | storage-live-range-invariant, storage-construct-at |
| 4 | storage-placement-new-not-constexpr | b | storage-construct-at |
| 4 | storage-destroy-then-deallocate | code | storage-construct-at |
| 4 | storage-uninitialized-move | b, misconception | storage-construct-at |
| 4 | storage-launder | b, L5 | storage-construct-at |
| 4 | storage-transparent-replacement | b, L5 | storage-construct-at |

Notes for later Cards:
- `a.deallocate(buf, wrong_n)` is **not** diagnosed on g142, so it can't be a distractor.
- `std::destroy` is specified as a forward loop ([specialized.destroy]); the order in which a *container* destroys its elements is what is unspecified.

### 3b. `hft-interview/topics/01-implement-std/vector` (prefix `vec-`)
| id | kind | front / point | requires |
|---|---|---|---|
| vec-three-pointers | b | begin / end / cap, 24 bytes | cpp-basics/iter-size-vs-capacity |
| vec-zero-capacity-growth | code | `next_capacity(cap)`; `2*cap` fails at 0 | ↑ |
| vec-max-size-overflow | b | Check `max_size` and throw `length_error` before doubling | ↑ |
| vec-realloc-order | parsons | allocate → construct new → relocate → destroy → deallocate → swap | cpp-core/storage-destroy-then-deallocate, cpp-core/storage-uninitialized-move |
| vec-push-back-self-alias | b, misconception | `v.push_back(v[0])` on a full vector | vec-realloc-order |
| vec-relocate-move-if-noexcept | code | blank `move_if_noexcept(old[i])`; copy counter run with *both* a throwing and a noexcept move (§2) | cpp-core/move-semantics-vector-move-if-noexcept, vec-realloc-order |
| vec-realloc-rollback | trace | copy throws at element 2: size, what gets destroyed | ↑, cpp-core/exceptions-strong-vs-basic |
| vec-emplace-back-forward | code | blank `std::forward<Args>(args)...` | cpp-core/move-semantics-perfect-forwarding, cpp-core/storage-construct-at |
| vec-push-back-delegates | b | Why `push_back(T&&)` is one line | ↑ |
| vec-reserve-contract | c | exact, only if `n > cap`, never shrinks | cpp-basics/iter-reserve-keeps-buffer |
| vec-reserve-in-loop | b, misconception | `reserve(size()+1)` every push gives O(n²) | ↑ |
| vec-resize-value-inits | b | `resize` vs `reserve` for a 1M-double buffer you overwrite | ↑ |
| vec-erase-shift | code | move left, destroy the last element | cpp-core/storage-destroy-then-deallocate |
| vec-insert-aliasing | b | `insert(begin(), back())`: copy the value first | vec-push-back-self-alias |
| vec-trivially-relocatable | b | When `memcpy` is OK; why not libstdc++ `string` | cpp-core/templates-conditionally-trivial, cpp-core/strings-sso |
| vec-push-back-fast-path | chunk | inline `[[likely]]` fast path, cold out-of-line `realloc_insert` | vec-realloc-order |
| vec-copy-assign-guarantee | b | Copy assignment reusing capacity: basic guarantee only | cpp-core/exceptions-commit-by-swap |
| vec-explain-push-back | explain | Capstone: implement `push_back` | vec-realloc-order, vec-push-back-self-alias, vec-relocate-move-if-noexcept |
| vec-build-mini-vector | code | Capstone: the grow-and-construct body of a constexpr MiniVec | vec-explain-push-back |
| vec-explain-hft-vector | explain | The HFT angle: growth below 2, cold path, reserve up front, `inplace_vector` | vec-explain-push-back, algo-systems/foundations-growth-below-two, algo-systems/ll-warm-path |


**As built (2026-10-12):**
- Depths are 1–11. The depth-11 Cards are `vec-build-mini-vector` and `vec-explain-push-back`, via `cpp-core/move-semantics-vector-move-if-noexcept` (depth 9). This was accepted: those are real edges.
- `inplace-vector-overflow` (from §3c) was written early so it could back `vec-explain-hft-vector`.
- `vec-explain-hft-vector` lost its growth-below-2 rubric item to keep fan-in ≤ 3. `algo-systems/foundations-growth-below-two` is no longer required.
- `vec-build-mini-vector` blanks the new capacity (`2 * cap`), not the deallocate size: wrong sizes are never diagnosed.
- Every shown snippet uses the member names `b, n, cap, a`.

### 3c. `hft-interview/topics/01-implement-std/*` (other components, 3–7 Cards each)
- **smart-pointers:**
  - `uptr-reset-order` (code)
  - `uptr-array-specialisation` (b)
  - `sptr-refcount-orders` (code, FakeAtomic: inc relaxed / dec acq_rel)
  - `sptr-weak-plus-one` (trace)
  - `sptr-make-shared-retention` (b)
  - `sptr-aliasing-ctor` (b)
  - `sptr-explain-implement` (explain)
- **type-erasure:**
  - `erasure-fnptr-vtable` (chunk)
  - `erasure-sbo-nothrow-move` (b)
  - `erasure-explain-implement-function` (explain)
- **optional:**
  - `opt-union-storage` (code)
  - `opt-conditionally-trivial-dtor` (b)
  - `opt-emplace-destroys-first` (trace)
- **string:**
  - `sso-layout` (b: libstdc++ 15 chars vs libc++ 22, labelled as implementation behaviour)
  - `sso-null-terminator-capacity` (b)
- **inplace:** `inplace-vector-overflow` (b: `try_push_back`), which requires algo-systems/seq-inline-capacity.
- **flat-map:** `flatmap-explain-implement` (explain), which requires algo-systems hash-robin-hood, hash-backward-shift and hash-swiss-control-byte.

**As built (Phase 6):**
- **Added:** `sptr-relaxed-increment`, `erasure-libs-inline-rule`, `opt-union-member-lifetime`.
- **`std::function` inline storage is not a nothrow-move rule in either library:**
  - libstdc++ needs the target trivially copyable, small and aligned.
  - libc++'s default ABI needs it to fit 24 bytes and be nothrow copy-constructible. The trivially-copyable rule is only `_LIBCPP_ABI_OPTIMIZED_FUNCTION`.
  - The nothrow-move mandate belongs to `std::any`.
  - `erasure-sbo-nothrow-move` therefore asks the design question for the learner's own `Fn`.
- **Constexpr harnesses must not cast from `void*`.** That is P2738, which GCC accepts early and Clang rejects in C++23. Check types and identities instead.
- **Refcount orders are labelled by library:** libc++ uses a relaxed increment, libstdc++ uses `acq_rel` for both, and both use `acq_rel` for the decrement.
- **`flatmap-explain-implement` is Robin Hood throughout;** Swiss is in `elaborate`. The validator rejects text after an explain rubric.

**Deferred to Phase 8 (from Phase 6 reviews):**
- `uptr-explain-implement`
- a `std::function` copy/move vs heap trace
- harder Kinds for the SSO and SBO facts

### 3d. `hft-interview/topics/02-hft-design/*` (the "write it" step for existing concepts)
| topic | cards | chain |
|---|---|---|
| spsc | `spsc-try-push` (code), `spsc-publish-order` (code, FakeAtomic), `spsc-try-pop-parsons` (parsons), `spsc-layout-chunk` (chunk, `offsetof % 64`), `spsc-explain` (explain) | seq-ring-buffer-mask → ll-spsc-ring → ll-spsc-cached-index → these; follow-up branch into ll-mpmc-* |
| order-book | `book-match-cross` (code), `book-modify-priority` (b), `book-matching-fills-trace` (trace), `book-explain` (explain) | seq-intrusive-unlink → ll-freelist-pool → ll-order-book-best → these |
| lru | `lru-touch` (code, index links in `std::array`), `lru-explain` (explain) | trace-lru-splice, ll-freelist-pool |
| rate-limit | `bucket-refill` (code), `bucket-vs-window` (b), `bucket-explain-per-venue` (explain) | ll-measurement |
| packets | `packet-reinterpret-ub` (b, misconception), `packet-bit-cast-header` (code) | cpp-basics/types-reinterpret-cast-intro |
| pools | `pool-typed-storage` (code, `construct_at` into byte slots), `pool-pmr-arena` (code) | ll-freelist-pool, cpp-core/storage-construct-at |

**As built (Phase 3):**
- **spsc.** `spsc-publish-order` became a basic misconception Card ("a relaxed tail store passes x86 tests"), because a code Card would duplicate `ll-spsc-orders`. `spsc-stale-cache-trace` was added.
- **The parsons harness** uses a FakeAtomic that records how far acquire loads have reached, plus a `Slots` wrapper. Of all 720 orderings, only the reference compiles.
- **`spsc-try-push`** blanks both full-tests as one `c1`, so the inner re-check doesn't give the answer away.
- **order-book.** `book-fifo-fill`, `book-trade-price` and `book-fifo-vs-prorata` were added. `book-cancel-empties-level` was dropped because it duplicates `ll-order-book-best`.
- **Order-book priority facts** are scoped to CME FIFO products. Trade price cites BYX Rule 11.13.
- **Depth.** spsc is 11–13; order-book is 6–17, via `ll-memory-pools` → the algo-basics complexity chain of L1/L2 Cards. Both were accepted.

**As built (Phase 7):**
- **Token bucket.** A bucket sized at the limit also admits capacity + rate × T, so 200 in one second at 100/s; it does not avoid the 2× problem. The real fix is sizing: capacity + rate × T ≤ limit. `bucket-burst-bound` was added as the concept Card.
- **Added:** `lru-evict-map`, `lru-std-list-allocates` (2 allocations + 2 frees per miss in any node-based container), `bucket-truncation`, `bucket-monotonic-clock` and `packet-start-lifetime-as`.
- **pmr.** Both pmr Cards are basics: pmr isn't constexpr, and every upstream choice compiles.
- **Packet UB.** Implicit object creation (N4950 [intro.object]/13) can supply a `Hdr`. The cast still points at `buf[0]`, so it needs `launder` or `start_lifetime_as`. Library availability is given as a feature-test macro, not as compiler versions.
- **Pools.** `ll-freelist-pool` is a real prerequisite, so pools sit at depth 12–14.

**Deferred to Phase 8 (from Phase 7 reviews):**
- a trace of the clock step
- a contrast Card: implicit creation vs `launder` vs `start_lifetime_as` vs `memcpy`
- a pmr code Card (`release()` / `null_memory_resource`)
- the "stamps to a preallocated buffer" Card (open since Phase 5)

**As built (Phase 8, leetcode groups D–F):**
- **More g142 limits.**
  - A nested braced `vector<vector<int>>{{…}}` written directly in a `static_assert` is rejected. Build it inside a `constexpr bool` function, or from `initializer_list<initializer_list<…>>`.
  - The parsons ordering check needs one Compiler Explorer request per variant. Batching variants into one translation unit gives false results.
- **Text-graded chunks (`compile: null`)** mark correct variants (`a++`, `max(cur + x, x)`) wrong. Every text-graded chunk with real variants now has a compile-checked parsons sibling: `arr-kadane-parsons`, `dp-coin-ways-parsons`.
- **No compiler names or "measured" figures on Cards.** Traces say the values follow from the code; derived costs are derived, e.g. `gr-grid-dfs-depth` gives m·n frames against a typical 8 MB stack.
- **Signal fronts carry no bold.** Bold that cued the answer was removed from committed signal Cards too.
- **Added:**
  - from reviews: `arr-3sum-frame-parsons`, `bit-precedence-trap`, `rq-segment-signal`
  - deferred from Phase 4: `gr-kahn-build-code`, `bt-reuse-signal`, `arr-window-signal`, `arr-window-trace`
- **Still deferred:** Kadane, edit-distance and Held–Karp signal/template Cards.

### 3e. `hft-interview/topics/03-trivia` (lightning round, shallow edges)
- `trivia-overload-puzzles` (trace: `f("hi")` picks `bool`)
- `trivia-mi-sizeof` (code: two vptrs)
- `trivia-this-adjustment` (b)
- `trivia-init-order-fiasco` (b)
- `trivia-constinit-fix` (code)
- `trivia-volatile-not-atomic` (b, misconception)
- `trivia-exceptions-cost` (b: zero-cost happy path vs µs throw)

Reuse cpp-core `layout-*` and `ub-*` via `requires`; don't copy them.

### 3f. Gap fills in existing Decks (siblings live there)
These four were proposed in algo-systems/REVIEW.md and never written:
- `ll-icache-layout` (b)
- `ll-cas-retry-loop` (code)
- `ll-wire-timestamps` (b)

Also new in algo-systems:
- `ll-cold-path-attrs` (c)
- `ll-mesi-states` (c)
- `ll-tsc-invariant` (b)
- `hash-linear-probe-find` (code)
- `ll-explain-latency-measurement` (explain)

**As built (Phase 5):**
- **Trivia.** `trivia-constinit-fix` has one blank, the specifier.
- **Overload trace.** It probes `f(0)`, `f(&n)`, `f(std::string("x"))` and `f("hi")`. A `string_view` overload does *not* beat `bool` for `"hi"`; only `const char*` does.
- **No observed numbers or toolchain behaviour.** Link-order results and throw timings stay off the Cards.
- **Gap fills.** `ll-mesi-rfo` was added. `ll-cas-retry-loop` asks for re-testing the precondition after a failed CAS (the CAS mechanism itself is in the existing chunks). `hash-linear-probe-find` asks for probing past tombstones (the step and the stop rule are in algo-basics). The `cold` call-block split is labelled "observed, not documented".
- **Open.** No Card yet backs "stamps to a preallocated buffer, aggregated off the hot thread". It is a candidate for Phase 7. The SDM TSC section number varies by edition, so the Card cites it by name.

### 3g. `leetcode` Deck (topic prefixes)
`00-stl` stl-, `01-arrays` arr-, `02-search` bs-, `03-stacks` mono-, `04-heaps` pq-,
`05-lists` list-, `06-trees` tree-, `07-graphs` gr-, `08-backtracking` bt-, `09-dp` dp-,
`10-bits` bit-, `11-ranges` rq-, `12-recognition` rec-.

**Per-pattern recipe (3–5 Cards):**
1. A *signal* basic card: a problem-statement fragment → the pattern and its invariant.
2. A template *chunk* (≤ 7 lines).
3. A *trace* on a tiny input, with values taken from a compiled run.
4. A *code* card blanking the bug-prone line.
5. A misconception card where one is real.

There is one explain capstone per *family* (windows, DP, graphs), not one per pattern.

**Linking to LeetCode:** `refs` holds the LeetCode URL plus cppreference or cp-algorithms. `tags` holds the pattern plus `lc-<n>`, at most 3 per Card. `elaborate` points to sibling problems.

**First 25:**
| # | id | kind | requires | LC |
|---|---|---|---|---|
| 1 | stl-pq-min-heap-type | code | algo-basics/heap-min-comparator | 215 |
| 2 | stl-pq-lambda-comparator | code | 1, cpp-basics/stdalgo-comparator-strict | 347 |
| 3 | stl-multiset-erase-one | b, misc. | – | 480 |
| 4 | stl-map-subscript-probe | code | cpp-basics/iter-map-subscript-inserts | 1 |
| 5 | stl-pair-key-hash | code | algo-systems/hash-combine-keys | 149 |
| 6 | stl-int-min-traps | b, misc. | cpp-basics/ub-signed-overflow-no-wrap | 7 |
| 7 | stl-equal-range-count | code | algo-systems/chunks-lower-bound-lookup | 34 |
| 8 | arr-window-variable-chunk | chunk | algo-basics/linear-variable-window-shrink | 3, 76 |
| 9 | arr-window-negatives | b, misc. | 8 | 560 vs 209 |
| 10 | arr-prefix-hash-signal | b | algo-basics/linear-prefix-sum-range | 560 |
| 11 | arr-prefix-hash-chunk | chunk | 10 | 560, 974 |
| 12 | arr-prefix-hash-trace | trace | 11 | 560 |
| 13 | bs-first-true-chunk | chunk | algo-basics/search-first-true-predicate | 875 |
| 14 | mono-stack-signal | b | algo-basics/linear-stack-recognition | 739 |
| 15 | mono-next-greater-chunk | chunk | 14 | 739, 496 |
| 16 | mono-histogram-trace | trace | 15 | 84 |
| 17 | arr-intervals-merge-chunk | chunk | cpp-basics/stdalgo-sort-by-length | 56, 57 |
| 18 | list-reverse-chunk | chunk | algo-basics/linear-list-node | 206 |
| 19 | list-fast-slow-chunk | chunk | 18 | 141, 876 |
| 20 | gr-multi-source-bfs-code | code | algo-basics/graph-bfs-grid-trace | 994 |
| 21 | gr-kahn-chunk | chunk | algo-basics/graph-kahn-trace | 207, 210 |
| 22 | gr-dijkstra-heap-chunk | chunk | algo-basics/graph-dijkstra-popped-final, 2 | 743 |
| 23 | bt-subsets-chunk | chunk | algo-basics/technique-backtracking-undo | 78, 46 |
| 24 | bt-combination-start-index | code | 23 | 39 vs 40 |
| 25 | dp-lis-patience-chunk | chunk | algo-basics/technique-dp-state, 13 | 300 |

**As built (Phase 4):**
- **Renamed** (unpushed): every template that can't be written as ≤ 7 natural lines became `parsons`. That gives `arr-prefix-hash-parsons`, `list-reverse-parsons`, `list-fast-slow-parsons`, `gr-dijkstra-heap-parsons` and `dp-lis-patience-parsons`. For each, every single-line move was compiled on g142 and only the reference passes.
- **Chunk rule:** ≤ 7 lines, ≤ ~80 chars, one statement per line, no trailing comments, `#include`s counted. The harness can only follow the snippet, so a chunk that needs declarations it can't contain is either graded by text (`compile: null`, checked separately) or becomes parsons.
- **Prerequisite changes:** Dijkstra requires `stl-pq-min-heap-type`, not the lambda Card. LIS requires `algo-basics/search-lower-bound-meaning`, not `bs-first-true-chunk`.
- **Added:** `mono-histogram-bounds`.
- **Prefix-hash** records the prefix before adding `x`, so it needs no `{0,1}` seed. The Card names the editorial form.

**Deferred to Phase 8 (from reviews):**
- `gr-kahn-build-code` (blank `adj[p[1]].push_back(p[0]); ++indeg[p[0]]`)
- `bt-reuse-signal` (LC 39/40/78/90: `j` or `j + 1`?)
- a window signal Card and trace
- code or parsons angles on the remaining chunks
- traces for multiset, equal_range and the heap comparator

**Then:**
- dp-edit-distance, dp-grid-paths, dp-unbounded-knapsack, dp-interval, dp-bitmask
- arr-kadane, arr-difference-array, arr-two-sum-3sum-dedup
- tree-inorder-iterative, tree-lca, rq-segment-tree
- bit-lowbit, gr-grid-dfs, gr-dijkstra-template
- the remaining stl- fluency cards: iota argsort, structured-binding copies, projections, `v(n)` vs `v{n}`, `accumulate` 0LL (extend cpp-basics/stdalgo-accumulate-init)
- the rec- explain capstones

## 4. Phases (one commit per topic; each phase leaves every Deck loadable)

| Phase | Content | Owner | ~Cards |
|---|---|---|---|
| 0 | ✅ Spike (§2); `check-code --remote`; deck.yaml + README for both Decks; CLAUDE.md; `.claude/agents/*`; old plan archived | me | 0 |
| 1 | 3a raw storage | cpp-teacher | 8 |
| 2 | 3b vector | cpp-teacher | 20 |
| 3 | 3d SPSC + order book | systems-teacher | 9 |
| 4 | 3g first 25 (can run alongside 1–3) | systems-teacher | 25 |
| 5 | 3e trivia + 3f gap fills | cpp-teacher / systems-teacher | 15 |
| 6 | 3c other std components | cpp-teacher | 20 |
| 7 | 3d LRU, rate limit, packets, pools | systems-teacher | 11 |
| 8 | 3g rest + capstones | systems-teacher | ~35 |

Total about 145 new Cards.

**Steps for every topic:**
1. The teacher writes the Cards.
2. `prereq-mapper` wires the seams.
3. `learning-designer` reviews them, and its fixes go into the same commit.

**Gate before each commit:**
```
tool/validate cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode
scripts/check-code cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode
scripts/check-code <decks...> --remote --id <the topic's ids>
scripts/lint-shape hft-interview leetcode
scripts/graph cpp-basics cpp-core algo-basics algo-systems hft-interview leetcode
```
The scripts take Deck directories as arguments, and nothing in them is hardcoded.

## 5. Risks
- **Locking.** New Cards stay locked until their cross-Deck prerequisites are known. Keep fan-in ≤ 2, and require shallow concept Cards. Watch the depth histogram: if `hft-interview` goes past about 8, it won't be usable in time.
- **Capstones that grow too big.** "Implement vector" is never one Card. It is atomic decision Cards, then a parsons card of ≤ 9 lines, then one explain card with 5 items.
- **Duplicates and interference.** A new Card asks the *interview* question and requires the concept Card. It never repeats the concept Card's front.
- **Implementation-specific facts** (libstdc++ growth ×2, SSO 15) are labelled as such.
- **Latency numbers.** Keep only the order-of-magnitude numbers that drive a decision (PEDAGOGY §2.12). Extend `ll-hardware-numbers` rather than adding a list.
- **cpp-core in active review.** Adding the raw-storage topic doesn't disturb existing schedules. Bump no existing `version`.
