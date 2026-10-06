# Review: algo-systems

165 Cards / 225 items across 18 Topics, reviewed Card by Card by topic reviewers,
every finding re-checked by an adversarial verifier, then consolidated here. The
Deck's design policy — that each mechanism is taught from several angles on
purpose — has been applied to the findings: every `duplication` finding and every
finding resting on "another Card already covers this" was re-judged, and what was
dropped is listed in **Findings → Dropped under the variation policy**.

---

## Status after Phase 1 (2026-10-06)

"What to do first" steps 1–10 are done: every MAJOR, MINOR, NIT and refs
finding has been worked, each re-verified against primary sources first (LLVM
`TargetPassConfig`/`PHIElimination.cpp`, the Linux seqlock, Go 1.23/1.24 docs,
folly F14, Rust RELEASES.md, Crossref DOIs). No `version` was bumped.

- **Fixed as proposed:** M1–M19, M21, M22 and the minors/nits/refs in scope.
- **Fixed differently, because the proposed fix was itself wrong:**
  `huge-pages` (the gain is a shorter, cached page walk, not "orders of
  magnitude" fewer misses), M20 `branchless-select` (`-(x<y)` never negates
  `INT_MIN`; the real unsigned cases are `x & -x`, `x & (x-1)`), `hash-join`
  (absolute figures dropped, ratio kept).
- **Partly applied:** `trace-heap-operations` gained an `h.back()` column; the
  program really returns to its starting state, and the Card now says that round
  trip is the point.
- **Deferred to Phase 4** (would change what the item asks): `hardware-numbers`
  c3/c5 re-blanked as ratios.
- **New errors found and fixed** beyond this review: `aba-problem`,
  `busy-polling`, `external-memory-model`, `vector-vs-deque`, `intrusive-list`,
  `swiss-table-metadata`, `primary-clustering`, `tombstones`,
  `go-map-semantics`, `go-gc-and-leaks`, `big-o-decides`, `bloom-false-negative`,
  `vectorised-execution`, `branchless-search`, `timer-wheel`, `lazy-deletion`,
  `d-ary-heap`, `sorting-networks`, `simd-scanning`, `stability`, Rust
  `sort_unstable` (ipnsort since 1.81), Linux timer cascading (gone since 4.8).
- **Tooling:** `scripts/check-code` replaces `compile_check`; it now
  substitutes `parsons` Distractors properly. `parsons-bfs-csr` and
  `parsons-union-find` no longer pass a wrong line. Four `parsons` Cards stay
  LOOSE (a Distractor passes as an *extra* line) until the app's pre-filled
  `parsons` lines land.

Steps 11–12 (new Cards, hands-on Cards for prose-only topics) are PLAN.md
Phases 3–4.

---

## Verdict

**What this Deck is strong at.** The arithmetic. Across 18 Topics the reviewers
hand-recomputed essentially every numeric claim in the Deck — the Fibonacci-mixing
bucket constants, Knuth's linear-probing probe counts, the Fenwick bit walk, the
Eytzinger descent, the external-merge-sort pass counting, HyperLogLog's
1.04/√2048 = 2.3 % against 2048×6 bits = 1.5 KB, count-min's w = ⌈e/ε⌉, Roaring's
8 KiB crossover, the 584-year 64-bit counter wrap, all 24 trace probe cells
including a hand-simulation of libstdc++'s hole-based `__adjust_heap` — and the
overwhelming majority are exactly right. That is rare and it is the Deck's real
asset. The second asset is the constexpr/`static_assert` invariant: when it works
it works properly, and the `code` Cards in hashing, sorting, strings, graphs and
SSA genuinely discriminate a wrong *value* rather than a wrong syntax. The third
is voice: the backs are written by someone who has built these systems, and the
asides ("the φ operand is live at the end of the *predecessor*", "the estimate
said 10", "the table has already started lying") are the details that separate a
practitioner from a reader.

**Where it is weakest.** Three things, in order.

First, a cluster of claims about *what real systems actually do* is wrong, and
they concentrate in the two lanes where an interviewer will probe hardest. LLVM
does not allocate registers on SSA and does not run PHIElimination after the
allocator, but `compiler-graph-colouring` and the `interview`-tagged
`compiler-explain-backend` both say it does. A levelled LSM does not rewrite a
byte once per level, but two of the three LSM Cards say so — and the third says
the opposite, so the Deck teaches two incompatible cost models for its own
headline database number. Spark does not use LLVM. Rust's `sort_unstable` has not
been pdqsort since 1.81. AKS has O(log n) depth, not O(n log n). These are not
nits: they are the specific, checkable facts the Deck exists to install.

Second, a small number of Cards are actively unsound rather than merely
inaccurate. `chunks-bloom-double-hashing`'s snippet does not compute the formula
its own explanation states and silently destroys its own `| 1` teaching point —
on a Kind whose entire purpose is verbatim memorisation, with `compile: null` so
nothing catches it. `ll-seqlock` states the memory ordering "precisely" and omits
the writer's release fence, so the recipe as written admits torn reads. Two of
five `parsons` Cards have a Distractor that compiles *and passes every
assertion*, which breaks the Deck's central grading contract — and the README
asserts both were verified not to.

Third, shape. 109 of 165 Cards are `basic`, and five Topics have no hands-on Card
of any kind: `01-foundations` (10 prose Cards), `09-compilers/codegen` (5 basic +
1 cloze + 1 explain), `10-databases/execution-and-sketches` (8 basic + 1 cloze),
`10-databases/storage-and-indexes` (7 basic + 1 cloze + 1 code) and
`14-transfer`. Several `basic` fronts pose three questions at once, so grading is
self-assessment against an essay. The README's own thesis is that compile-checked
Cards discriminate on values; the two Topics that most need it — codegen and
query execution — use it nowhere.

**Does it meet its stated aim?**

- *Low-latency / HFT* — **closest to ready.** Layout, memory orders, false
  sharing, ABA, reclamation, tail latency and measurement are all present and
  mostly right. But the seqlock recipe is unsound as written, `compare_exchange`
  appears nowhere in the Deck so nobody is ever asked to produce a CAS loop, and
  there is no Card on NUMA first-touch, on how to spin, on i-cache layout, or on
  wire-to-wire timestamping — the vocabulary the job is actually argued in.
- *Compilers* — **half ready.** SSA and dataflow theory are strong and the
  compile-checked `intersect` and liveness Cards are excellent. The machine half
  is thin and partly wrong: memory/alias analysis is named as a hole and never
  filled, control dependence is advertised by three Cards and defined by none,
  register classes and sub-register aliasing are absent so "K machine registers"
  is the learner's whole model, switch lowering and jump tables appear nowhere in
  the Deck, and the two LLVM-pipeline errors would be caught in an interview.
- *Databases* — **least ready, and the weakest lane overall (6/10 on storage).**
  The quantitative core of the LSM story is wrong twice. Aggregation — half of
  every analytical plan — has no Card at all, while joins have three. Nothing says
  what a secondary index stores or what a lookup costs. Nothing explains how a
  reader survives a concurrent split (latch crabbing / B-link / OLC returns zero
  hits Deck-wide). Torn pages and the doublewrite/full-page-write fix are absent,
  so the WAL Card leaves a real correctness hole open.

The genuine absences, stated plainly, are: **index concurrency, aggregation
execution, secondary-index mechanics, torn pages, consistent hashing, MST, A*,
approximate string matching, quantile sketches, parallel sorting, memory SSA,
control dependence, register classes, switch lowering, the CAS loop, NUMA,
spin-wait, i-cache layout, and reservoir sampling.** Each has *no Card at all*.
Subjects the Deck covers many times over — union-find, the branchless argument,
binary search, the Swiss-table split, the RUM trade — are the design working, not
imbalance, and nothing below asks for any of them to be cut.

---

## Mechanical state

### Validator

```
$ dart run tools/validate.dart decks/algo-systems --strict
Deck "algo-systems" (format 1): 165 cards, 225 items
By kind:
  basic: 109
  chunk: 8
  cloze: 15
  code: 19
  explain: 3
  parsons: 5
  trace: 6
By topic:
  01-foundations/cost-models: 10
  02-sequences/arrays-and-buffers: 10
  03-hashing/hash-tables: 12
  04-ordered/search-trees: 13
  05-priority/heaps-and-queues: 9
  06-sorting/sorting-and-selection: 10
  07-graphs/graph-algorithms: 10
  08-strings/text-algorithms: 9
  09-compilers/codegen: 7
  09-compilers/ssa-and-dataflow: 11
  10-databases/execution-and-sketches: 9
  10-databases/storage-and-indexes: 9
  11-low-latency/latency-and-layout: 10
  11-low-latency/lock-free: 9
  12-idioms/chunks: 8
  12-idioms/parsons: 5
  13-tracing/data-structures: 6
  14-transfer/intuition-traps: 8

0 errors, 0 warnings
```

### compile_check

```
$ dart run tools/compile_check_algo.dart decks/algo-systems --strict
22 compile-checked Cards, 0 failing
```

No `FAIL` and no `WEAK` lines emitted. The count reconciles: `code` (19) +
`chunk` (8) + `parsons` (5) = 32 source Cards, minus 8 `chunk` Cards carrying
`compile: null` (all chunks in this Deck are excerpts), minus 2 Go `code` Cards
also carrying `compile: null` (`seq-go-slice-window`, `ordered-go-sort-search` —
no Go toolchain, per the README), leaving 19 − 2 + 5 = 22 C++ Cards assembled,
compiled with `g++`, and Distractor-substituted.

> **Do not trust the `0 WEAK` result for `parsons` Cards.** Two `parsons`
> Distractors were independently shown by hand-simulation to compile *and satisfy
> every `static_assert`* (`parsons-bfs-csr`'s `queue[--tail]`,
> `parsons-union-find`'s `parent[find(b)] = find(a);`). A `parsons` Distractor is
> a standalone line that replaces a *reference line* the tool cannot identify, so
> the substitution pass models `code` Cards only and silently gives `parsons`
> Cards a free pass. This is why the README's verification claim survived
> unchallenged. Fix the tool before relying on that number again.

### Cloze dump

```
$ dart run tools/dump_cloze_algo.dart decks/algo-systems
(100 lines / 27 cloze-bearing Cards)
```

- No unescaped literal `::` anywhere. A programmatic scan of every
  `{{cN::text::hint}}` span, splitting on unescaped `::` and flagging any span
  producing more than 2 parts, found **zero matches**.
- The two blanks containing a literal `::` (`sort-choice#c2` `std::stable_sort`,
  `sort-choice#c4` `std::nth_element`) are correctly escaped as `\::` in source
  and parsed as single unbroken blanks.
- Every embedded newline in a `text=` or `hint=` value is real source prose
  wrapping at ~80 columns, confirmed against the `.md` files — not truncation.

### Structural checks

- No duplicate `id:` values across files.
- No Card missing a `refs:` block; no empty refs list.
- Every one of the 36 `code`/`chunk`/`parsons`/`trace` Cards has exactly one
  fenced block.
- **6 files** have an `id` that is an abbreviated or reordered form of the
  filename stem: `sorting-networks.md`→`sort-networks`,
  `go-sort-dispatch.md`→`sort-go-dispatch`, `radix-sort.md`→`sort-radix`,
  `external-merge-sort.md`→`sort-external-merge`,
  `d-ary-heap.md`→`heap-d-ary`, `build-heap-linear.md`→`heap-build-linear`.
  **Benign** — the identical pattern exists 9 times in the shipped
  `decks/cpp-core` (e.g. `explain-move-semantics.md`→`move-semantics-explain`)
  and `--strict` is clean on both. Accepted house style; no action.

### Finding counts

| Severity | Count |
| --- | --- |
| Major | 22 |
| Minor | 33 |
| Nit | 21 |
| **Total** | **76** |
| Dropped under the variation policy | 6 |

---

## Findings

Sorted most damaging first. Card paths are relative to
`decks/algo-systems/`. Where the supplied fix text was a copy-paste from a
sibling finding and did not address the defect, the fix below is derived from the
evidence and marked *(fix reconstructed)*.

### MAJOR

#### M1 — `topics/12-idioms/chunks/bloom-double-hashing.md` — the snippet is wrong, and the Kind makes the learner memorise it

**What is wrong.** The snippet advances `h2` twice per iteration, so it does not
compute the formula the explanation two lines below states.

```cpp
bits.set((h1 + i * h2) % bits.size());
h1 += h2;
```

After `i` iterations `h1 == h1₀ + i·h2`, so the bit set at step `i` is
`h1₀ + 2·i·h2` — stride `2·h2`, not Kirsch–Mitzenmacher's `g_i(x) = h1(x) +
i·h2(x)`. Worse, this silently destroys the Card's own teaching point: `2·h2` is
even whatever `| 1` does, so on a power-of-two table the loop reaches at most half
the bits — precisely the failure the `| 1` paragraph claims to prevent.
`compile: null` means nothing catches it, and a `chunk` Card is reproduced from
memory verbatim.

**Fix.** Either drop `i * h2` from the index (`bits.set(h1 % bits.size()); h1 +=
h2;`) or delete the `h1 += h2;` line. The first is the idiomatic form.

#### M2 — `topics/11-low-latency/lock-free/seqlock.md` — the stated ordering is incomplete, and the recipe as written admits torn reads

**What is wrong.** The last bullet: "The ordering is a **release** on the
counter's second increment, an **acquire** on the reader's first load, and an
acquire fence before the reader's second load." That is the reader half plus the
final publication. Without a `std::atomic_thread_fence(std::memory_order_release)`
(kernel: `smp_wmb()`) between the store of the *odd* counter and the payload
stores, a payload store may be reordered before the odd increment. A reader can
then load an even counter `s`, read partially-updated payload, re-load `s`, see no
retry condition, and accept torn data. Both `write_seqcount_begin`
(`++sequence; smp_wmb();`) and Boehm's C++ formulation (HP-2012) require it.

**Fix.** Replace the bullet with four elements: "The writer stores the odd counter
**relaxed**, then a **release fence**, then the payload, then the even counter as a
**release** store. The reader loads the counter **acquire**, reads the payload,
executes an **acquire fence**, then re-loads the counter **relaxed** — so neither
the writer's payload stores can sink below the odd store nor the reader's payload
loads be hoisted past the check."

#### M3 — `topics/11-low-latency/lock-free/seqlock.md` — "wait-free only if the writer is slow" misuses the term and contradicts a sibling definition

**What is wrong.** `ll-progress-guarantees` defines "**Wait-free**: *every* thread
completes in a bounded number of its own steps" — a guarantee that by construction
cannot be conditional on another thread's speed. A seqlock reader can retry
unboundedly: it is not wait-free, not lock-free, and not obstruction-free against
a continuously writing writer. The Card's own next clause admits it ("a fast
enough writer can starve a reader into retrying forever"). **This is an actively
misleading collision:** two Cards in the same Topic attach incompatible meanings
to the same term. *(fix reconstructed)*

**Fix.** Replace the bullet with: "**Readers are non-blocking but unbounded** — a
reader never waits on a lock, but it is not wait-free, lock-free or
obstruction-free; a fast enough writer can starve a reader into retrying forever.
In practice the data is small and the window tiny."

#### M4 — `topics/12-idioms/parsons/bfs-csr.md` — the first Distractor passes the Harness

**What is wrong.** The Card says of `const std::size_t u = queue[--tail];` (pop
from the back): "The Harness catches it at compile time." It does not. The test
graph (`kOffset{0,2,4,5,6,7,7}`, `kTarget{1,2,3,4,4,5,5}`) is a strictly layered
DAG in which every node's predecessors share a depth, so mark-on-push produces
identical `dist` arrays under LIFO and FIFO: `{0,1,1,2,2,3}` for `bfs(0)` and
`{-1,-1,0,-1,1,2}` for `bfs(2)` — both assertions pass. Hand-traced and
independently re-traced.

**Fix.** Give vertex 5 an in-edge from depth 1 so LIFO reaches it one step too
late. In the snippet:
`inline constexpr std::array<std::size_t, 7> kOffset{0, 2, 5, 6, 7, 8, 8};` and
`inline constexpr std::array<std::size_t, 8> kTarget{1, 2, 3, 4, 5, 4, 5, 5};`
(adds edge 1→5; `kTarget`'s size becomes 8). In the Harness change the first
assertion to
`static_assert(bfs(0) == std::array<int, 6>{0, 1, 1, 2, 2, 2});`; the second is
unchanged. Verified: the reference compiles clean, the `queue[--tail]` Distractor
now fails the first assertion (LIFO reaches 5 via 4, giving `dist[5] == 3`), and
the relaxation Distractor still fails (queue overflow, not a constant expression).

#### M5 — `decks/algo-systems/README.md` — documents a verification that does not hold

**What is wrong.** "Compile-checked Cards discriminate on values" section: "Two of
the five also use Distractor lines chosen to be *semantically* wrong rather than
syntactically (popping the BFS queue from the back, an inclusive prefix sum),
which the value assertions catch." The BFS half is false on the Card as authored
(M4). The counting-sort half does hold (`count[k] = total + c;` fails to be a
constant expression).

**Fix.** After applying M4 the sentence becomes true again. Until then it must not
stand. Also fix the `compile_check` tool so `parsons` Distractors are substituted
for the reference line they are meant to replace, and re-run before restating the
claim.

#### M6 — `topics/12-idioms/parsons/union-find.md` — the second Distractor is behaviourally identical to the reference line

**What is wrong.** `"parent[find(b)] = find(a);"` is offered as a wrong
alternative to `parent[b] = a;`. But at that point `a` and `b` have already been
reassigned to `find(a)` and `find(b)` (and the subsequent `swap(a,b)` only swaps
two already-resolved roots), so `find` returns immediately and
`parent[find(b)] = find(a)` is the same statement written redundantly — for every
possible input. A learner dragging it in still passes all three `static_assert`s
and is graded correct.

**Fix.** Replace the Distractor with `"parent[a] = b;"` — verified to fail the
Harness: `built().size[built().find(3)]` reduces to `1 == 4`, because the larger
tree is hung under the smaller and `size[a]` is maintained on a node that is no
longer a root. Update the third body paragraph: the second Distractor is the merge
oriented the wrong way round, which still compiles, still connects the right
vertices, and shows up only in the size the Harness asserts on.

#### M7 — `topics/12-idioms/parsons/union-find.md` — asserts a line ordering the Harness does not force

**What is wrong.** Second paragraph: "Updating `size[a]` *after* the link is not
arbitrary either — it reads `size[b]`, which is still the old subtree's count, and
`b` is no longer a root afterwards." False. `parent[b] = a;` writes only to
`parent`; `size[b]` keeps its old count whatever the order, and nothing reads
`size[b]` as a root afterwards. The snippet was compiled with the two lines
transposed (`size[a] += size[b];` then `parent[b] = a;`): it compiles and all
three `static_assert`s pass.

**Fix.** Delete the sentence, or replace it with a claim the Harness actually
enforces — that `find(a)`/`find(b)` must run *before* the size comparison, since
comparing sizes of non-roots picks the wrong parent.

#### M8 — `topics/10-databases/storage-and-indexes/btree-vs-lsm.md` and `topics/10-databases/storage-and-indexes/amplification.md` — the levelled write-amplification mechanism is wrong, in two Cards, and collides with a third

**What is wrong.** Both Cards say "every byte is rewritten once per level it passes
through". Rewriting each byte once per level gives WA ≈ number of levels ≈ 4–6,
not the 10–30× stated three lines later in `btree-vs-lsm.md`. In levelled
compaction with size ratio T (~10), merging level *i* into level *i+1* rewrites
the overlapping level-*i+1* data, so a resident byte is rewritten ~T times before
its level is fully replaced: WA ≈ T·L. "Once per level" is the *tiering* figure —
which is why `btree-vs-lsm.md`'s own next clause calls tiering "better … at the
cost of reads", and why `amplification.md` ends up saying the expensive and the
cheap configuration cost the same. **This is also an actively misleading
collision:** `lsm-compaction.md` states the correct model ("roughly the fanout per
level, summed over levels"), so the Topic teaches two incompatible numbers for the
same quantity.

**Fix.**
- `btree-vs-lsm.md` — replace "but every byte is rewritten once per level it
  passes through, so write amplification is 10–30× in a levelled configuration
  (better with tiering, at the cost of reads)" with: "but a level is rewritten
  roughly once per merge from the level above, so a byte costs about the size
  ratio T (~10) in writes at each level it passes through — write amplification of
  10–30× in a levelled configuration. Tiering rewrites a byte only about once per
  level, which is cheaper, at the cost of reads."
- `amplification.md` — change "but every byte is rewritten once per level it passes
  through" to "but a level is rewritten each time the level above merges into it,
  so under levelling a byte costs about the size ratio T in writes at every level
  it passes through".

#### M9 — `topics/09-compilers/codegen/graph-colouring.md` — presents SSA/chordal allocation as what LLVM ships

**What is wrong.** "**SSA-based allocation**: … the basis of modern allocators in
LLVM and elsewhere." LLVM runs `PHIElimination` (SSA destruction) *before*
register allocation, and the default `RAGreedy` is a priority-ordered allocator
with live-range splitting over non-SSA MachineIR — it never builds a chordal SSA
interference graph. GCC likewise leaves SSA long before IRA/LRA. The Topic's own
`ssa-destruction.md` says as much. SSA-form allocators are real but live in
libFirm and the Hack & Goos / Bouchez / Brisk research line.

**Fix.** Replace the trailing clause with: "— the basis of the SSA-form allocators
in libFirm and the Hack & Goos / Bouchez research line. LLVM and GCC both destroy
SSA first (LLVM's `PHIElimination` runs before `RAGreedy`), so they get none of
this for free."

#### M10 — `topics/09-compilers/codegen/explain-backend.md` — the `interview`-tagged rubric orders the pipeline in a way no shipped compiler uses

**What is wrong.** Bullet 6 ("Register allocation: interference graph from
liveness, then Chaitin–Briggs colouring … SSA form makes the graph chordal") comes
before bullet 8 ("SSA destruction: split critical edges, lower each φ group as a
parallel copy, break cycles with a temporary"). In LLVM `PHIElimination` runs in
`addOptimizedRegAlloc()` *before* `TwoAddressInstructionPass`, `RegisterCoalescer`
and the allocator; in GCC out-of-SSA happens long before IRA. A learner reciting
this rubric in the interview the Card is aimed at names the stages in the wrong
order.

**Fix.** Move the SSA-destruction bullet to sit immediately before the
register-allocation bullet, and append to the latter: "— or, in SSA-based
allocators (libFirm, SSA linear scan), keep the φs through the allocator and
resolve them afterwards; LLVM and GCC do not, they eliminate φs first."

#### M11 — `topics/09-compilers/codegen/allocation-vocabulary.md` — cloze c5 trains a wrong proposition

**What is wrong.** "Pre-coloured nodes represent registers the ABI fixes —
argument, return and {{c5::caller-saved::clobbered across a call, so anything live
across one must be callee-saved or spilled}} registers are the usual constraints."
Caller-saved registers are *not* pre-coloured nodes. Pre-colouring binds a
specific live range to a specific physical register at a specific point (an
argument in RDI, a return in RAX, `div`'s EDX:EAX). Caller-saved registers are
modelled the opposite way — as a clobber set on the call instruction (LLVM's
regmask operand), making every physical caller-saved register interfere with every
range live across the call; no node is coloured in advance. The cloze's own hint
states the correct mechanism, so the stem's framing is the error.

**Fix.** End the pre-coloured sentence at "argument and return registers", then
start a new sentence: "A call clobbers every {{c5::caller-saved::…}} register, so
anything live across one must sit in a callee-saved register or be spilled."

#### M12 — `topics/09-compilers/codegen/graph-colouring.md` — `div`'s fixed operands are an ISA constraint, not an ABI one

**What is wrong.** "Pre-coloured nodes represent physical registers forced by the
ABI (arguments, return values, `div`'s fixed operands)." x86's `div` requires the
dividend in EDX:EAX and clobbers both regardless of calling convention; the ABI
fixes argument/return/callee-saved registers. Both cause pre-colouring, but only
the first two are ABI. *(fix reconstructed)*

**Fix.** Rewrite as: "Pre-coloured nodes represent physical registers forced by
the ABI (arguments, return values) or by the ISA (`div`'s fixed EDX:EAX
operands)." Note this pairs with M11 — both allocation Cards mis-frame the two
sources of pre-colouring, so fix them together.

#### M13 — `topics/09-compilers/ssa-and-dataflow/liveness-transfer.md` — the closing note's `def` convention contradicts the Harness and makes the "classic bug" Distractor correct

**What is wrong.** The note says "`def` holds variables written **before any read**
of them here, which is exactly what makes them 'killed'." But the Harness reads
`static_assert(live_in(0b0100, 0b0100, 0b0000) == 0b0100);` with the comment "x is
read *and then* written in this block" — bit 2 set in *both* `use` and `def`.
Under the note's (Dragon-Book) definition, x would not be in `def` and the Harness
should read `def = 0b0000`. Worse: the note's definition guarantees
`use & def == 0`, and when that holds,
`(use | live_out) & ~def == use | (live_out & ~def)` — so the Distractor the
explanation singles out as "the classic implementation bug" is provably equivalent
to the reference answer. The Harness only discriminates because it uses Appel's
convention (`def` = everything written), the opposite of the note.

**Fix.** Replace the closing note with: "Note that `use` and `def` are defined
relative to the block's internal order: `use` holds variables **read before being
written** here, while `def` holds **every** variable the block writes — including
one that was read first. That overlap is exactly why the order of gen and kill
matters. Computing `use`/`def` correctly by walking the block backwards is half
the work." Leave the Harness and the fourth assertion untouched.

#### M14 — `topics/09-compilers/ssa-and-dataflow/dominator-intersect.md` — the back contradicts the front and the Harness on numbering

**What is wrong.** Front: "Blocks are numbered in **postorder**, so a block's
dominators always have *higher* numbers." Back: "number the blocks in reverse
postorder, set `idom[entry] = entry`, then repeatedly walk the blocks in reverse
postorder …". In Cooper–Harvey–Kennedy blocks are *numbered* in postorder (entry
gets the highest number — the Harness sets `kIdom = {5,5,5,4,5,5}` with A = 5) and
*visited* in reverse postorder. Under reverse-postorder numbering, entry would be
0, dominators would have lower numbers, and `while (a < b) a = idom[a]` would walk
the wrong way.

**Fix.** Rewrite the back's pass description as: "The full pass is: number the
blocks in **postorder** (so `intersect`'s comparisons work), set
`idom[entry] = entry`, then repeatedly walk the blocks in **reverse** postorder and
set each block's idom to the fold of `intersect` over its already-processed
predecessors, until nothing changes."

#### M15 — `topics/09-compilers/ssa-and-dataflow/dominator-intersect.md` — the stated invariant is false for the entry block, and the Card's own Harness is the counterexample

**What is wrong.** "the entry block has the highest number, and `idom[x] > x`
always holds." CHK initialises `idom[entry] = entry`; the Harness encodes exactly
that (A is postorder 5, `kIdom[5] == 5`), and the fifth assertion
`intersect(kIdom, 5, 5) == 5` exercises the case. The true invariant is
`idom[x] > x` for every block *except* the entry, and that self-loop at the root is
what stops the two fingers walking off the top of the tree. *(fix reconstructed)*

**Fix.** Change the sentence to: "the entry block has the highest number, and
`idom[x] > x` holds for every block except the entry, where `idom[entry] == entry`
— that self-loop is what stops the two fingers walking off the top of the tree."

#### M16 — `topics/04-ordered/search-trees/btree-fanout.md` — cloze c5's answer is attached to the wrong noun and contradicts the Card's own arithmetic

**What is wrong.** "Raising the page size raises the fanout only
{{c5::logarithmically::halving the height needs squaring the fanout}}". Fanout is
exactly *linear* in page size in this Card's own model (fanout = pagesize/16; the
Card derives 4096/16 = 256, so 8 KiB → 512, 16 KiB → 1024). What grows only
logarithmically is the *height*, which is what the hint is actually describing. As
written, a learner is taught that doubling the page size barely increases fanout —
contradicting the arithmetic the same Card established two lines earlier.

**Fix.** See M17; one rewrite fixes both.

#### M17 — `topics/04-ordered/search-trees/btree-fanout.md` — "64-byte keys … add a level" understates by a level

**What is wrong.** With fanout 256, height for 1e9 keys is ⌈log₂₅₆ 1e9⌉ = 4
(matches the Card's own c3). With fanout 57 (64-byte keys: 4096/(64+8) ≈ 56.9),
height is ⌈log₅₇ 1e9⌉ = ⌈5.126⌉ = **6**. Switching to 64-byte keys adds *two*
levels (4 → 6), not one.

**Fix (M16 + M17 together).** Rewrite the closing lines as: "Raising the page size
raises the fanout linearly but lowers the height only
{{c5::logarithmically::halving the height needs squaring the fanout}}, so 4 KiB,
8 KiB and 16 KiB pages give heights of 4, 4 and 3 — the page size is chosen for
write amplification and I/O granularity, not for height." Then correct the
64-byte-key sentence to "cut the fanout to ~57 and add **two** levels (4 → 6)."

#### M18 — `topics/04-ordered/search-trees/go-sort-search.md` — the Distractor's stated outcome is false in the typical case

**What is wrong.** "`a[i] < key` is monotone the wrong way round (true then false),
so the search returns 0 whenever the array is non-empty and the first element is
smaller." Counterexample: `a = [1, 10, 20, 30]`, `key = 5`. `a[0] = 1 < 5` holds,
but simulating Go's actual `sort.Search` (`i,j := 0,n; h := (i+j)/2; if !f(h) { i
= h+1 } else { j = h }; return i`) with `f(idx) = a[idx] < key` gives **4**, not 0.
The claimed universal 0 holds only when the predicate is true for every index.

**Fix.** Replace the final clause with: "`a[i] < key` is monotone the wrong way
round (true then false), so the result is whatever the halving happens to land on:
0 only in the degenerate case where `key` exceeds every element, and otherwise
something unrelated to the answer — `LowerBound([]int{1,10,20,30}, 5)` returns 4."

#### M19 — `topics/04-ordered/search-trees/lower-bound-loop.md` — the explanation gets the error direction backwards

**What is wrong.** "`hi = mid − 1` discards a candidate and returns an index one too
far for some inputs." Discarding `mid` can only lose a candidate on the *right* of
the surviving range, so the Distractor returns an index too *small*, never too
large. Simulated on the Card's own Harness data `{1,3,3,5,8,13}`: key 3 → 0
(correct 1), key 4 → 2 (correct 3), key 13 → 4 (correct 5). It can also underflow
`std::size_t` when `mid == 0` (e.g. `a = {5}`, `key = 0`), which is what actually
makes the Distractor fail to compile.

**Fix.** "…discards a candidate and returns an index one too *small* for some
inputs — and underflows `hi` when `mid` is 0, which is what the Harness catches."

#### M20 — `topics/11-low-latency/latency-and-layout/branchless-select.md` — "keep them on unsigned types" breaks one of the four idioms it is applied to

**What is wrong.** "`(x >> 31)` broadcasts a sign bit into a mask for `abs`. They
all rely on two's complement, so keep them on **unsigned** types where overflow is
defined." If `x` is `unsigned`, `x >> 31` yields 0 or 1, not 0 or all-ones, so the
`abs` idiom `(x ^ m) - m` silently computes the wrong thing. Sign broadcast
requires a *signed* right shift, which C++20 defines as arithmetic ([expr.shift]).
The advice also contradicts the Card's own snippet, which is entirely signed
(`const int mask = -static_cast<int>(cond)`).

**Fix.** Replace with: "They all rely on two's complement, but not on the same
signedness: `x & -x` and `-(x < y)` want **unsigned** operands, since negating
`INT_MIN` is undefined; `x >> 31` must stay **signed**, since only a signed right
shift is arithmetic and broadcasts the sign bit ([expr.shift], C++20). Getting
that backwards is where this style of code quietly goes wrong."

#### M21 — `topics/06-sorting/sorting-and-selection/sorting-networks.md` — the AKS result is inverted

**What is wrong.** "The AKS network reaches O(n log n) depth and is famous for
being entirely impractical." AKS achieves **depth O(log n)** with **size
O(n log n)** comparators — as the Card's own cited Wikipedia article says. As
written the Card claims AKS is asymptotically *worse* in depth than the Batcher
networks named in the preceding sentence, and it contradicts the Card's own point
that "a network's *depth* matters more than its size" — the whole reason AKS is
famous.

**Fix.** "The AKS network reaches O(log n) depth (O(n log n) comparators) and is
famous for being entirely impractical."

#### M22 — `topics/01-foundations/cost-models/latency-scale.md` — the headline conversion is off by 3–10× and contradicts the Card's own table

**What is wrong.** "**A DRAM miss is ~100 instructions' worth of time**". The same
table prices a DRAM random access at ~80 ns and an L1 hit at "~1 ns (4 cycles)",
i.e. a ~4 GHz core — so 80 ns is ~320 cycles. At IPC 1 that is ~320 instructions;
on a 3–4-wide superscalar core it is closer to 1000.

**Fix.** "**A DRAM miss is ~300 cycles — several hundred instructions' worth of
time**".

---

### MINOR

#### Databases — storage and indexes

- **`topics/10-databases/storage-and-indexes/bloom-filter.md` — the under-sizing
  consequence is quantitatively far off.** "its rate goes to nearly 1 and every
  lookup becomes a full search." With the Card's own default (10 bits/key, k = 7)
  and 2n keys, effective m/n = 5, so FPR = (1 − e^(−1.4))^7 = 0.7534^7 ≈ **14 %** —
  degraded but still rejecting ~86 % of negatives. At 4× over-capacity it is ≈64 %,
  not "nearly 1". **Fix:** "at 10 bits per key its rate goes from ~0.8 % to ~14 %,
  and at four times the keys to ~64 % — it degrades silently and superlinearly, and
  the fixed k (optimal for the old n) makes it worse still".
- **`topics/10-databases/storage-and-indexes/bloom-filter.md` — Ribbon filters are
  not a blocked Bloom layout.** "which is what RocksDB's `FullFilter`/Ribbon
  filters do." RocksDB's cache-line-local Bloom (`FastLocalBloom`, format_version
  5) is a blocked Bloom filter; a Ribbon filter is a static filter built by solving
  a banded linear system (Rapid Incremental Boolean Banding), trading *more CPU*
  for ~30 % *less space* at the same FPR. `FullFilter` names the whole-file filter
  as opposed to the deprecated per-data-block one, not the blocked layout.
  **Fix:** "which is what RocksDB's cache-line-local Bloom (`FastLocalBloom`) does;
  its Ribbon filter is a different trade again — a linear-system-based static
  filter that spends more CPU for ~30 % less space at the same rate".
- **`topics/10-databases/storage-and-indexes/wal-and-commit.md` — the group-commit
  conclusion inverts what group commit does.** "Throughput under concurrency is
  therefore bounded by the *device's* sync rate, not by the transaction rate — which
  is why adding concurrency raises throughput dramatically." If commit throughput
  were bounded by the sync rate, concurrency could not raise it. **Fix:** "What the
  device bounds is the number of *fsyncs* per second, not the number of
  transactions: throughput is sync rate × group size".
- **`topics/10-databases/storage-and-indexes/lsm-compaction.md` — Monkey's result is
  attributed to the wrong mechanism.** "because the large bottom level is consulted
  only once." In levelling every level is consulted at most once per point lookup,
  so that does not distinguish the bottom level. Monkey's argument (Dayan,
  Athanassoulis, Idreos, SIGMOD 2017) is that expected I/Os are the *sum* of
  per-level FPRs while memory cost scales with keys-at-that-level. **Fix:** "because
  expected I/Os are the sum of the per-level false-positive rates while memory cost
  scales with the keys at that level — the bottom level holds almost all the keys,
  so bits are dearest there and nearly free at the tiny top levels". Add the Monkey
  paper to `refs`.
- **`topics/10-databases/storage-and-indexes/slotted-pages.md` — the intra-tuple
  layout is not Postgres's, but is cited to Postgres.** The Card describes "a null
  bitmap, then fixed-length columns, then variable-length ones with their offsets",
  cited to `postgresql.org/docs/current/storage-page-layout.html`. Postgres stores
  attributes in *declared* order with no per-attribute offset directory (a varlena's
  length lives in its own header; `attcacheoff` is usable only up to the first
  varlena or NULL). That layout is SQL Server's/DB2's. This also slightly misstates
  "column tetris", which is about alignment padding. **Fix:** "Within a tuple the
  layout matters too. Some engines (SQL Server, DB2) store a null bitmap, then
  fixed-length columns, then a variable-length offset array, so a fixed column is at
  a constant offset. Postgres keeps declared order and walks past the first varlena
  — which is why putting fixed-width columns first helps there too, on top of
  reducing alignment padding."
- **`topics/10-databases/storage-and-indexes/mvcc.md` — "takes no locks at all" is
  false and contradicted by the Card's own closing paragraph.** In Postgres every
  statement takes at least an `ACCESS SHARE` lock on each table it reads, and under
  SERIALIZABLE (SSI — which this Card names three paragraphs later) a read-only
  transaction takes SIREAD predicate locks and can itself be aborted. **Fix:** "…and
  a read-only transaction takes no **row** locks at all".

#### Databases — execution and sketches

- **`topics/10-databases/execution-and-sketches/vectorised-execution.md` — Spark and
  Umbra grouped under an LLVM claim true only of HyPer.** Spark's whole-stage
  codegen emits Java *source*, compiled by Janino to bytecode and then JIT'd — no
  LLVM anywhere. Umbra deliberately replaced LLVM with its own IR and a custom
  single-pass backend because LLVM's compilation latency was the bottleneck, using
  LLVM only for the optimising tier. **Fix:** "**Compiled** (HyPer via LLVM, Umbra
  via its own IR and a custom single-pass backend, Spark's whole-stage codegen via
  generated Java that Janino and the JIT compile): generate code for the whole
  pipeline, so a tuple stays in registers from the scan to the aggregation …".
- **`topics/10-databases/execution-and-sketches/shuffle-and-broadcast.md` — morsels
  are not cache-sized.** In Leis et al. (the Card's own first ref) a morsel is a
  constant-sized chunk of roughly 100,000 tuples, sized to balance work-stealing
  overhead against load-balance granularity, not for cache residency. The
  cache-sized unit in this Deck is the vector, as `vectorised-execution.md`
  correctly says. **Fix:** change "partition work into cache-sized morsels" to
  "partition work into constant-sized morsels (~100 K tuples — sized for
  work-stealing overhead, not for cache)". The NUMA-local scheduling clause is right
  and should stay.

#### Compilers — codegen

- **`topics/09-compilers/codegen/linear-scan.md` — mis-attribution: the SSA-form
  linear scan is Wimmer & Franz, not Wimmer & Mössenböck.** Wimmer & Mössenböck,
  "Optimized interval splitting in a linear scan register allocator" (VEE 2005), is
  the HotSpot C1 interval-splitting allocator and is *not* SSA-based; the SSA-form
  variant is Wimmer & Franz, "Linear scan register allocation on SSA form" (CGO
  2010). Neither paper is in `refs`. **Fix:** "which is Wimmer and Mössenböck's
  interval-splitting linear scan (HotSpot C1, VEE 2005), extended to keep φs through
  the allocator by Wimmer and Franz (CGO 2010) — the form V8's TurboFan uses." Add
  `https://dl.acm.org/doi/10.1145/1772954.1772979` to `refs`.
- **`topics/09-compilers/codegen/linear-scan.md` — two numbers stated as fact are
  unsupported by the cited paper.** "often 10× faster to compile, for code typically
  within a few percent of a colouring allocator." Poletto & Sarkar (TOPLAS 1999)
  report linear-scan code running up to about **10 % slower** than graph-coloured
  code on some benchmarks, and their allocation-time speedup is measured in a 1999
  research compiler, not as a general 10×. *(fix reconstructed)* **Fix:** "often
  several times faster to compile, for code Poletto and Sarkar measured at up to
  ~10 % slower than a colouring allocator — with a wider gap still between LLVM's
  fast and greedy allocators."
- **`topics/09-compilers/codegen/ssa-destruction.md` — LLVM's machine verifier does
  not enforce critical-edge splitting.** "followed by the `TwoAddressInstructionPass`
  and coalescing, with the machine verifier enforcing that critical edges have been
  split." `MachineVerifier` checks φ structure and that each φ operand's register is
  live-out of the named predecessor; it has no critical-edge check, and critical
  edges are legal in MachineIR. Splitting happens inside `PHIElimination`
  (`SplitPHIEdges`), heuristically; splitting *all* critical edges is opt-in via
  `-phi-elim-split-all-critical-edges`, off by default. **Fix:** "LLVM approximates
  this with `PHIElimination`, which splits the critical edges it needs (all of them
  only under `-phi-elim-split-all-critical-edges`) and then inserts the copies,
  followed by the `TwoAddressInstructionPass` and the register coalescer to delete
  the copies that turn out to be redundant."

#### Compilers — SSA and dataflow

- **`topics/09-compilers/ssa-and-dataflow/worklist-dataflow.md` — c1 asks for "least
  fixpoint" in a lattice orientation whose solution is the *greatest* fixpoint.** The
  surrounding text fixes the dual orientation throughout: "a **lattice** of facts
  with a **meet** operator", "{{c2::finite height::no infinite descending chains}}",
  "Facts can then only move **down** the lattice", "{{c4::distributivity::f(x ⊓ y) =
  f(x) ⊓ f(y)}}". Starting optimistically at ⊤ and descending under ⊓ converges to
  the greatest fixed point below the initial assignment — which is why Kildall named
  it MFP, Maximum Fixed Point, and why the Card's own next sentence says
  "meet-over-all-paths". A learner answering "maximal fixpoint"/"MFP" is marked
  wrong. **Fix:** `{{c1::maximum fixpoint::Kildall's MFP — the greatest fixpoint in
  this meet-ordered lattice, and the most precise solution the framework can
  prove}}`, or keep "least fixpoint" and add the alternate to the hint.
- **`topics/09-compilers/ssa-and-dataflow/dominance.md` — the `idom` array is indexed
  by postorder, not reverse postorder, and this collides with the sibling Card.** The
  Card says "keep an `idom` array indexed by reverse-postorder-numbered blocks";
  `dominator-intersect` states the opposite on its front and its Harness only
  type-checks under postorder numbering (`kIdom = {5,5,5,4,5,5}`, entry A = 5). CHK
  numbers in postorder and *iterates* in reverse postorder. **This is an actively
  misleading collision** with M14. **Fix:** "keep an `idom` array indexed by
  **postorder** number, walk the blocks in *reverse* postorder, and recompute each
  block's idom as the pairwise `intersect` of its already-processed predecessors'
  idoms, and iterate to a fixpoint".
- **`topics/09-compilers/ssa-and-dataflow/dominance.md` — a back edge is conflated
  with a natural loop.** "a back edge is an edge `n → h` where `h` dominates `n`, and
  that is the definition of a natural loop." The back edge is not the loop;
  `natural-loops.md` in the same Topic states it correctly ("`h` (the *header*) plus
  every block that can reach `n` without going through `h`"). *(fix reconstructed)*
  **Fix:** "a back edge is an edge `n → h` where `h` dominates `n`; the **natural
  loop** of that back edge is `h` plus every block that can reach `n` without passing
  through `h`."

#### Low latency

- **`topics/11-low-latency/latency-and-layout/huge-pages.md` — the arithmetic is
  wrong twice, and the Card's own 8 GB example does not reach its conclusion.** "make
  each TLB entry cover 512× or 262144× more memory, so the same table needs a few
  thousand times fewer entries — often turning a table that thrashed the TLB into one
  that fits." The reduction is 512× for 2 MiB and 262144× for 1 GiB; "a few thousand
  times" matches neither. And 8 GiB / 2 MiB = 4096 pages against the L1+L2 dTLB
  capacity the Card itself states two paragraphs earlier ("a few hundred to ~1500
  entries"; real parts are 1536 on Skylake-SP, 2048 on Ice Lake/Zen 3) — so the 8 GB
  table still does not fit at 2 MiB. **Fix:** "so the 8 GB table needs 4096 entries at
  2 MiB instead of two million at 4 KiB — still more than the ~1500 the TLB holds, so
  misses fall by orders of magnitude rather than vanishing; at 1 GiB it needs 8 and
  fits outright."
- **`topics/11-low-latency/latency-and-layout/order-book.md` — "three cache misses at
  most" undercounts the Card's own design.** A cancel touches: the hash bucket (an
  open-addressed probe may straddle a line), the order object, `prev->next`,
  `next->prev` (two *other* nodes, separate lines unless pool-adjacent), and the
  price level's aggregate — up to five. The unlink writes are the misses that matter,
  being stores into lines nobody just touched. **Fix:** "all O(1), and four or five
  lines: the bucket, the order, its two list neighbours, and the level — which is why
  keeping neighbours pool-adjacent is worth the effort, since the two neighbour
  stores are writes into lines nothing else just touched."
- **`topics/11-low-latency/latency-and-layout/prefetching.md` — the Eytzinger bullet
  describes a prefetch with zero lead time.** "prefetch both possible next nodes (they
  are adjacent, so one line covers them)." Children of node k are at 2k and 2k+1,
  needed on the *very next* iteration — contradicting the Card's own requirement ten
  lines up ("far enough in advance — roughly 100+ cycles, or a couple of loop
  iterations"). The cited algorithmica page prefetches several levels ahead
  (`__builtin_prefetch(b + k * 16)`). **Fix:** "**Eytzinger binary search**: prefetch
  the block of descendants several levels down (`b + k * 16` for 4-byte keys) —
  because 2k and 2k+1 are adjacent, one line holds a whole level of the subtree, so
  the prefetch is issued four iterations before the load that needs it."
- **`topics/11-low-latency/lock-free/reclamation.md` — EBR entry is not "one relaxed
  store".** If the announcement store can be reordered after the reader's first load
  of a shared pointer, a retiring thread can observe the thread as not-yet-entered,
  advance the epoch and free a node the reader is about to dereference. crossbeam's
  `pin()` performs a `SeqCst` `compare_exchange`/fence and comments on exactly this;
  Fraser-style EBR uses a store-load barrier or a locked RMW. The genuine saving over
  hazard pointers is that the fence is paid once per *critical section*, not once per
  *dereference*. **Fix:** "Reads cost almost nothing (a store plus one store-load
  fence on entry — paid once per critical section, not once per dereference as with
  hazard pointers)".
- **`topics/11-low-latency/lock-free/reclamation.md` — the kernel RCU API is
  misspelled.** "writers must `synchronise_rcu()`" — the symbol is
  `synchronize_rcu()`, as in the cited kernel.org page; `rcu_read_lock()` in the same
  sentence is spelled correctly, so a reader grepping the first identifier finds
  nothing. *(fix reconstructed)* **Fix:** spell it `synchronize_rcu()`.
- **`topics/11-low-latency/lock-free/go-channels.md` — park/unpark is attributed to
  the wrong condition.** "whenever the channel transitions between empty and
  non-empty — a **goroutine park/unpark**". In `runtime.chansend` a `goready` happens
  only when `recvq` is non-empty (a receiver has actually parked); a producer and
  consumer that both keep up drive a buffered channel across empty/non-empty
  continuously with zero scheduler work, while a *full* channel parks senders — a
  case the stated rule does not cover. **Fix:** "and, only when the other side had
  actually parked (a receiver already waiting, or a sender blocked on a full buffer),
  a goroutine park/unpark".

#### Graphs, strings, sorting, heaps

- **`topics/07-graphs/graph-algorithms/bitset-graphs.md` — units error of 8×,
  contradicting the Card's own next bullet.** "a bit vector is O(n/64) per operation
  … and n/64 bytes of memory regardless of occupancy." n bits need ⌈n/64⌉ *words* =
  n/8 bytes. The Card's own next bullet says "1000 variables is 16 words" (128 bytes,
  not 16 bytes). **Fix:** change to "and n/8 bytes of memory regardless of occupancy"
  (equivalently "⌈n/64⌉ words"), matching the "⌈n/64⌉ words" accounting earlier in the
  Card.
- **`topics/08-strings/text-algorithms/rolling-hash.md` — rsync and Docker layer
  dedup are both mis-grouped under content-defined chunking.** rsync (Tridgell &
  Mackerras, 1996) splits the basis file into **fixed-size** blocks and uses a rolling
  checksum only to find those blocks at arbitrary offsets — there is no
  hash-bits-are-zero cut-point rule. Docker/OCI layer dedup is not chunking at all: a
  layer is a whole tarball addressed by its sha256 digest, and dedup is all-or-nothing
  per layer — change one byte and the entire layer is a new blob, which is the exact
  failure mode the sentence claims CDC avoids (chunk-level dedup only appears in
  opt-in extensions such as estargz / zstd:chunked). borg, restic and casync do use
  the cut-point rule. **Fix:** drop rsync *and* Docker from the CDC list ("…which is
  exactly what makes borg, restic, casync and most backup systems efficient"), and if
  rsync is worth keeping, give it its own sentence: "rsync uses a rolling hash
  differently: it keeps fixed-size basis blocks and searches for them at every byte
  offset in the new file, so an insertion costs one shifted match rather than a full
  re-transmit."
- **`topics/06-sorting/sorting-and-selection/pattern-defeating.md` — contradicts the
  sibling Card on when `slices.Sort` shipped.** The Card says pdqsort is Go's
  `slices.Sort` "since 1.19"; `go-sort-dispatch.md` in the same Topic correctly says
  the generic `slices` package shipped in **Go 1.21**. Go 1.19 switched the *existing*
  `sort` package to pdqsort internally. **This is an actively misleading collision** —
  two Cards in one Topic give different dates for the same quantity. **Fix:** "**pdqsort**
  (Rust's `sort_unstable`, Go's `sort` package since 1.19 and `slices.Sort` since
  1.21)".
- **`topics/06-sorting/sorting-and-selection/pattern-defeating.md` and
  `topics/06-sorting/sorting-and-selection/introsort.md` — the Rust attribution has
  been out of date since Rust 1.81 (Sept 2024).** Both say pdqsort is Rust's
  `sort_unstable`. Rust 1.81's release notes: "Both the stable and unstable sort
  implementations in the standard library have been updated to new algorithms."
  `sort_unstable` is now **ipnsort** and `sort` is **driftsort**; pdqsort is ancestry.
  The Go half of each sentence is fine. **Fix:** "Rust's `sort_unstable` was pdqsort
  until 1.81 and is now ipnsort, a pdqsort descendant".
- **`topics/06-sorting/sorting-and-selection/key-normalisation.md` — the Wikipedia ref
  is a 404.** `https://en.wikipedia.org/wiki/Key_normalization` returns HTTP 404 and
  the Wikipedia API confirms `{"missing":""}` with `redirects=1`. Combined with the
  off-topic `morsels.pdf` (see nits), this Card currently has **zero usable
  references**, against the README's "every Card cites at least one primary source".
  **Fix:** delete the dead link and apply the `key-normalisation` refs fix below.
- **`topics/05-priority/heaps-and-queues/build-heap-linear.md` — the convergent sum is
  wrong by a factor of 2.** The Card states "n · Σ (h / 2^(h+1)) over h ≥ 0 = n · 2 =
  Θ(n)". Σ_{h≥0} h/2^(h+1) = ½·Σ h/2^h = ½·2 = **1**, not 2 — and the partial sums (0,
  0.25, 0.25, 0.1875, …) converge to 1. This is consistent with the Card's own
  preceding fractions (half the nodes at height 0, a quarter at height 1 — weight
  1/2^(h+1) per node), which sum to 1·n. The Card conflates its own weighting with
  CLRS's differently-normalised Σ h/2^h = 2. The Θ(n) conclusion still holds; the
  worked arithmetic does not. **Fix:** change the displayed line to
  `n · Σ (h / 2^(h+1)) over h ≥ 0 = n · 1 = Θ(n)`. If the CLRS form is preferred,
  change the *exponent* not the total and adjust the half/quarter/eighth sentence to
  "n/2^h nodes of height h".
- **`topics/05-priority/heaps-and-queues/build-heap-linear.md` — the push-build cost is
  stated as unconditional when it is worst-case.** "the cost is the depth of the node
  being added, and half the elements of a heap are leaves, so half the insertions pay
  the full log n. Total Θ(n log n)." A push costs the number of swaps actually
  performed, *at most* the depth; an inserted leaf stops as soon as it is ≤ its parent.
  Θ(n log n) holds only in the worst case (e.g. increasing order into a max-heap); for
  a random insertion order the expected total is Θ(n). **Fix:** "the cost is at most
  the depth of the node being added, and in the worst case (an increasing input) half
  the insertions pay the full log n. Worst-case total Θ(n log n)."

#### Tracing

- **`topics/13-tracing/data-structures/heap-operations.md` — the heapsort aside is
  false.** "call `pop_heap` n times without ever popping the back, and the array ends
  up sorted ascending in place." Repeated `pop_heap(h.begin(), h.end())` on the
  *unchanged* range does not sort: from `{11,9,5,1,3}` the first call gives
  `{9,3,5,1,11}`, and the second swaps 9 with the last element 11 and sifts 11 back to
  the root, giving `{11,3,5,1,9}` — unsorted, with 11 back where it started.
  `std::sort_heap` is `while (last - first > 1) pop_heap(first, last--);` — the end
  iterator retreats, which is exactly the thing the sentence says you need not do.
  **Fix:** "That split is what makes heapsort fall out for free: call `pop_heap` on a
  range whose end retreats one step each time — `pop_heap(first, last--)`, which is
  exactly what `std::sort_heap` does — and the maxima pile up at the back until the
  array is sorted ascending in place, with no extra storage and no `pop_back`."
- **`topics/13-tracing/data-structures/heap-operations.md` — the probe table never asks
  the one cell that proves the Card's central claim.** The explanation calls probe 3
  "the step people mispredict" and says "the maximum now sits at `h.back()`", but probe
  3's columns are only `h[0]: 9`, `h[1]: 3`, `h.size(): 5`. A learner who believes
  `pop_heap` erases the max gets `size()` wrong but is never asked where 11 went. Probe
  4's row is additionally identical to probe 1's (`9, 3, 4`). *(fix reconstructed)*
  **Fix:** add an `h.back()` column at probe 3 (expected 11), and make probe 4 differ
  from probe 1 in more than `size()`.
- **`topics/13-tracing/data-structures/heap-operations.md` — an implementation-defined
  permutation is graded as if mandated.** "`make_heap` sifts down from the last
  internal node, giving `{9, 3, 5, 1}`". [alg.make.heap] requires only that the range
  be a heap; `{9, 5, 3, 1}` is equally valid and would give `h[1] == 5`. Probes 1, 3
  and 4 all grade `h[1]`. `trace-vector-growth` in the same Topic carries exactly this
  caveat, so the convention exists and is not applied here. *(fix reconstructed)*
  **Fix:** add a closing paragraph in the style of `trace-vector-growth`: only `h[0]`
  is mandated; `h[1]` is libstdc++'s Floyd sift-down under GCC 13.3, and another
  implementation may permute the equal-priority remainder differently.
- **`topics/13-tracing/data-structures/ring-buffer-wrap.md` — probe 3's explanation
  cites an index no write in the trace uses and omits the one that stored 40.** "pushing
  40 and 50 takes `tail` to 5, and `5 & 3 == 1`, `4 & 3 == 0`". 40 was stored at
  `slot[tail & 3]` with `tail == 3` (`3 & 3 == 3`), and 50 at `tail == 4`
  (`4 & 3 == 0`). `5 & 3 == 1` is where a *future* push would land, and no such push
  succeeds — push(60) at probe 4 is refused. **Fix:** "…takes `tail` to 5: 40 goes to
  `slot[3 & 3] == slot[3]` and 50 to `slot[4 & 3] == slot[0]` — the buffer has wrapped,
  and `slot[0]` now holds 50…".

#### Refs (minor)

- **`topics/05-priority/heaps-and-queues/d-ary-heap.md`** — the Fibonacci-heap
  paragraph (O(1) amortised decrease-key, the O(E + V log V) Dijkstra bound) cites only
  Wikipedia, against the README's rule. **Fix:** replace
  `https://en.wikipedia.org/wiki/Fibonacci_heap` with
  `https://dl.acm.org/doi/10.1145/28869.28874` (Fredman & Tarjan, JACM 34(3), 1987),
  keeping the D-ary heap Wikipedia link, which is legitimate textbook material.
- **`topics/06-sorting/sorting-and-selection/key-normalisation.md`** — cites
  `https://db.in.tum.de/~leis/papers/morsels.pdf`, which is "Morsel-Driven
  Parallelism" (SIGMOD 2014), a NUMA-aware work-stealing execution framework, not the
  byte-comparable normalised-key encoding the Card teaches. **Fix:** replace with
  Graefe, "Implementing Sorting in Database Systems", ACM Computing Surveys 38(3),
  2006 — `https://dl.acm.org/doi/10.1145/1132960.1132964` (DOI verified via Crossref)
  — the canonical treatment of normalized keys and the "poor man's normalized key"
  prefix trick.
- **`topics/09-compilers/codegen/ssa-destruction.md`** — the lost-copy and swap
  problems are Briggs, Cooper, Harvey & Simpson, "Practical Improvements to the
  Construction and Destruction of SSA Form" (SP&E 28(8), 1998); the parallel-copy
  sequentialisation recipe is Boissinot et al., "Revisiting out-of-SSA translation"
  (CGO 2009). `refs` lists only a Wikipedia anchor and the LLVM docs. *(fix
  reconstructed)* **Fix:** add both papers; drop the Wikipedia anchor.
- **`topics/05-priority/heaps-and-queues/monotonic-deque.md`** — cites
  `https://en.wikipedia.org/wiki/Sliding_window_protocol`, which is the networking
  ARQ/flow-control protocol (TCP windows, unacknowledged-frame windows) and has nothing
  to do with the sliding-window maximum the Card teaches. The cp-algorithms
  `stack_queue_modification` ref is the on-topic one. **Fix:** drop the Wikipedia link.

---

### NIT

- **`topics/09-compilers/codegen/instruction-scheduling.md`** — "edges are true
  dependences (read-after-write), plus anti- and output dependences on registers and
  memory, each edge labelled with the producer's latency." An anti-dependence (WAR)
  only requires the consumer to read before the later write issues, so its weight is 0
  (or 1). Labelling it with the producer's latency over-constrains the schedule.
  **Fix:** "… plus anti- and output dependences on registers and memory. True-dependence
  edges are labelled with the producer's latency; anti- and output-dependence edges
  carry weight 0 or 1, since they only order the write against an earlier read or
  write."
- **`topics/09-compilers/ssa-and-dataflow/egraphs.md`** — "the `egg` line of work is
  largely about making the rebuild incremental" inverts egg's actual contribution. The
  headline technique in Willsey et al. (the Card's own first ref) is *rebuilding*:
  deliberately breaking the congruence invariant across a batch of unions and restoring
  it with a single amortised `rebuild()` per iteration, instead of the eager incremental
  maintenance every earlier implementation used. **Fix:** "…the `egg` line of work is
  largely about *deferring* the rebuild, breaking congruence across a batch of merges
  and restoring it once per iteration with an amortised `rebuild()` instead of repairing
  it eagerly after every union".
- **`topics/09-compilers/ssa-and-dataflow/natural-loops.md`** — `refs` line 8 points at
  `https://en.wikipedia.org/wiki/Control-flow_graph#Loops`; the article's loop headings
  are "Loop management" and "Loop connectedness", so the fragment lands the reader at the
  top of a general page. The Card also names Havlak/Tarjan's loop forest in prose without
  citing it. **Fix:** point at `#Loop_management` (or `#Reducibility`, which is what the
  closing paragraph discusses), and optionally add Havlak, "Nesting of reducible and
  irreducible loops", TOPLAS 19(4), 1997.
- **`topics/10-databases/execution-and-sketches/sort-merge-join.md`** — the merge is
  described as unconditionally linear and "a single sequential pass over both sides".
  With duplicates on **both** sides the merge must rewind the inner cursor to the start
  of each matching group, so the cost is O(|R| + |S| + |output|) with a buffered or
  re-read group. Linear only when the key is unique on at least one side. **Fix:** append
  "Cost is the two sorts plus a merge that is linear when the key is unique on at least
  one side; with duplicates on both sides the merge buffers or rewinds the inner group,
  so the cost becomes |R| + |S| + |output|."
- **`topics/10-databases/execution-and-sketches/roaring-bitmaps.md`** — two small
  inaccuracies: the array/bitmap crossover is at cardinality **≤ 4096**, not < 4096 (the
  reference implementation's `DEFAULT_MAX_SIZE = 4096`; at exactly 4096 the array is 8192
  bytes, the same as the bitmap, and conversion happens on the next insert); and the run
  container is chosen by *number of runs*, not density (30,000 values in 3 runs and 30,000
  scattered values have identical density and different optimal containers — which is the
  point the run-container bullet makes). **Fix:** change "used when the chunk holds fewer
  than 4096 values" to "used while the chunk holds at most 4096 values"; leave the
  "density" lead-in, or widen it to "density and shape".
- **`topics/10-databases/execution-and-sketches/hash-join.md`** — "the difference between
  a join running at 10 M and 100 M rows/s **per core**." The cited Balkesen et al. paper
  and the same group's ICDE'13 radix-join paper report low hundreds of millions of
  tuples/s for a *whole multi-socket machine* running tens of threads — on the order of
  10–30 M tuples/s per core for narrow key/rid tuples. The figure overstates the cited
  source by roughly 4–10×. **Fix:** "the difference between ~10 M and ~20–25 M rows/s per
  core (Balkesen et al. report ~650 M output tuples/s for a tuned radix join across 64
  threads on a four-socket machine)", or drop the absolutes and keep the ratio.
- **`topics/10-databases/storage-and-indexes/lsm-compaction.md`** — "space amplification
  is low (~1.1×, since each key appears roughly once per level)". If a key appeared once
  per level, space amplification would be ≈ L (4–6×). The actual reason is that a level is
  ~T× the one above, so the bottom level holds ~90 % of the data and every obsolete
  version must live above it. **Fix:** "(~1.1×: the bottom level holds ~90 % of the bytes,
  so every obsolete version above it together can only be ~1/T of the store)".
- **`topics/01-foundations/cost-models/latency-scale.md` and
  `topics/11-low-latency/latency-and-layout/hardware-numbers.md` — the same
  false-sharing claim, unsupported by the tables that carry it, in two Cards.**
  `latency-scale.md` asserts "**Sharing a cache line between two writing cores costs more
  than the DRAM miss it was meant to avoid**" while its own table gives "Cache line
  bounced between cores ~40–100 ns" against "DRAM, random access ~80 ns";
  `hardware-numbers.md` c3 repeats it as a hint — "{{c3::40-100 ns::false sharing, worse
  than the DRAM access it was meant to avoid}}" — against its own c2 "a random DRAM access
  about {{c2::80 ns}}". A 40–100 ns range brackets 80 ns, it is not worse than it; an
  intra-socket cache-to-cache transfer is typically *cheaper* than local DRAM, and the
  claim holds only for a cross-socket HITM transfer (~150–250 ns) or for repeated bouncing
  in a loop. The `hardware-numbers` clause "the DRAM access it was meant to avoid" also has
  no referent — nothing in that sentence was meant to avoid a DRAM access. **Merged from
  two findings.** **Fix:** in `hardware-numbers.md` change the hint to
  `{{c3::40-100 ns::false sharing — a DRAM-class cost, paid on every write to the line}}`;
  in `latency-scale.md` qualify the bullet to "**Sharing a cache line between two writing
  cores costs about as much as a DRAM miss — and more than one across sockets**".
- **`topics/11-low-latency/latency-and-layout/hardware-numbers.md` (pedagogy)** — three of
  the five blanks have no reproducible recall target and one has a competing canonical
  answer. c3 (`40-100 ns`) and c5 (`1-5 us`) are *ranges*, which a learner cannot recall to
  the character, while c2 is a point value ("about {{c2::80 ns}}") where the figure every
  practitioner has memorised from "Latency Numbers Every Programmer Should Know" is 100 ns
  — and the hint ("two orders of magnitude") points at 100, not 80. SPEC §4.4 schedules
  each cloze number as its own item, so this is three items a day answered by
  approximation plus one answered confidently and wrongly. *(fix reconstructed)* **Fix:**
  move the ranges out of the blanks and into the prose, blanking instead the *ratio* the
  Card is really teaching (e.g. "{{c3::~100×::an L1 hit versus a DRAM access}}"); for c2
  either accept 100 ns as the canonical figure or change the hint so it does not point at
  a number the blank rejects.
- **`topics/11-low-latency/lock-free/memory-orders.md`** — the c5 hint conflates undefined
  behaviour with ill-formedness: "a data race is {{c5::undefined behaviour::not \"a stale
  value\", the whole program is ill-formed}}". *Ill-formed* means a diagnosable rule
  violation that must be rejected at translation ([intro.compliance]); a data race is a
  runtime property ([intro.races]/21) and cannot in general be diagnosed at compile time —
  which is why the Card goes on to recommend a thread sanitiser. **Fix:**
  `{{c5::undefined behaviour::not "a stale value" — the whole *execution* loses meaning,
  including code that ran before the race}}`.
- **`topics/11-low-latency/lock-free/memory-orders.md` (pedagogy)** — c4 hides the single
  evaluative word "free", which the same sentence then contradicts: "acquire/release loads
  and stores are {{c4::free::ordinary MOVs, because x86 is already TSO}} — so on that
  architecture the cost is entirely in the store side and in what the *compiler* is allowed
  to reorder." A learner recalling "plain MOVs", "no extra instructions" or "the same as a
  relaxed access" has answered correctly but differently; the other four blanks hide precise
  technical terms. *(fix reconstructed)* **Fix:** re-blank on the mechanism, e.g.
  `{{c4::plain MOVs::x86 is already TSO, so no fence instruction is emitted}}`.
- **`topics/11-low-latency/lock-free/progress-guarantees.md` (refs)** — the progress ladder,
  the Card's central content, cites only `en.wikipedia.org/wiki/Non-blocking_algorithm` plus
  a cppreference page supporting only the closing footnote. The hierarchy has canonical
  papers. **Fix:** add `https://cs.brown.edu/~mph/Herlihy91/p124-herlihy.pdf` (Herlihy,
  "Wait-Free Synchronization", TOPLAS 13(1), 1991) and optionally Herlihy, Luchangco & Moir,
  "Obstruction-Free Synchronization" (ICDCS 2003), which coined a term the Card defines;
  keep cppreference for the `is_always_lock_free` footnote, drop the Wikipedia link.
- **`topics/13-tracing/data-structures/vector-growth.md`** — `reserve` exactness is
  presented as a container guarantee. [vector.capacity] requires only that
  `capacity() >= n` after `reserve(n)`; nothing forbids rounding up to an allocator-friendly
  size class. "never shrinks" is guaranteed; "never rounds up" is not — and the Card itself
  is careful to flag the growth factor as implementation-defined two paragraphs later.
  **Fix:** "`reserve(2)` guarantees capacity **at least** 2 and never shrinks it; libstdc++
  and libc++ allocate exactly what you ask for, which is why probe 1 reads 2." Optionally
  add `reserve` exactness to the final implementation-defined list.
- **`topics/13-tracing/data-structures/vector-growth.md` (refs)** — the Card's load-bearing
  claim "libstdc++ and libc++ double; MSVC grows by 1.5×" is uncited; both refs are
  cppreference pages that document no growth factor (cppreference correctly says only
  "amortized constant"). Every capacity cell in the probe table depends on it. *(fix
  reconstructed)* **Fix:** cite the implementations directly — libstdc++'s
  `vector::_M_check_len` and libc++'s `__recommend` — so the number has a primary source, as
  the README requires.
- **`topics/02-sequences/arrays-and-buffers/generational-handles.md` (refs)** — cites
  `https://llvm.org/docs/ProgrammersManual.html#dss-arrayref`, which is LLVM's `ArrayRef`
  entry in the data-structure-selection guide: a non-owning view over a contiguous array
  (comparable to `std::span`), with nothing about handles, generations, slot recycling or
  use-after-free detection — the Card's entire content. **Fix:** delete the line. If a
  second on-topic source is wanted, use
  `https://bitsquid.blogspot.com/2014/08/building-data-oriented-entity-system.html` (the
  Bitsquid ID lookup table, index plus generation) or
  `https://docs.rs/slotmap/latest/slotmap/` (versioned keys into a slot arena). Do **not**
  substitute another ProgrammersManual anchor; the manual has no handle/generation section.
- **`topics/06-sorting/sorting-and-selection/sorting-networks.md` (refs)** — no primary
  source, though sorting networks have a clear canonical paper. **Fix:** add
  `https://dl.acm.org/doi/10.1145/1468075.1468121` (K. E. Batcher, "Sorting networks and
  their applications", AFIPS '68 — DOI verified via Crossref), keeping the algorithmica
  link.
- **`topics/06-sorting/sorting-and-selection/introsort.md` (refs)** — cites cppreference
  and Wikipedia where a canonical paper exists. **Fix:** add
  `https://www.cs.rpi.edu/~musser/gp/introsort.ps` (D. R. Musser, "Introspective Sorting and
  Selection Algorithms", SP&E 27(8), 1997) in place of the Wikipedia link.
- **`topics/10-databases/storage-and-indexes/buffer-pool.md` (refs)** — cites
  `en.wikipedia.org/wiki/Cache_replacement_policies#LRU-K` for LRU-K, the Card's main named
  mechanism, which has a canonical paper. The second ref,
  `https://15445.courses.cs.cmu.edu/`, is a course homepage that redirects to the current
  term and is already the sole ref on three other Cards. **Fix:** add
  `https://www.cs.cmu.edu/~christos/courses/721-resources/p297-o_neil.pdf` (O'Neil, O'Neil,
  Weikum, SIGMOD 1993) as the first ref, keeping the others.
- **`topics/10-databases/storage-and-indexes/wal-and-commit.md` (refs)** — ARIES is cited
  to Wikipedia although the back's specific claims (per-page LSN for idempotent redo,
  repeating history, CLRs) come straight from the paper. **Fix:** replace with
  `https://cs.stanford.edu/people/chrismre/cs345/rl/aries.pdf` (Mohan, Haderle, Lindsay,
  Pirahesh, Schwarz, TODS 17(1), 1992) and keep the Postgres WAL intro.
- **`topics/12-idioms/parsons/lomuto-partition.md`** — the explanation misdescribes its own
  Distractor: "swapping the pivot back to `lo` instead of to `store`". The line
  `std::swap(a[store], a[lo]);` never touches the pivot, which sits at `a[hi]` and stays
  there; it swaps the element at `store` with the one at `lo`. The Distractor does fail the
  Harness, so only the wording is wrong. **Fix:** "swapping `store` with `lo` instead of
  with the pivot at `hi`, which leaves the pivot outside its final position".

---

### Dropped under the variation policy

The Deck teaches each mechanism from several angles on purpose. The following were
re-judged against that policy and **dropped** — none is a near-verbatim restatement adding
no new angle, and none is an actively misleading collision. They are listed so the author
can see the policy was applied rather than the finding forgotten.

1. **`topics/09-compilers/ssa-and-dataflow/liveness-transfer.md` — `duplication`, major:
   "the blank is printed verbatim in `liveness.md`, so the Card tests recall rather than
   reasoning."** *Dropped.* `liveness.md` prints `live_in(b) = use(b) ∪ (live_out(b) −
   def(b))` as prose in an equations block; `liveness-transfer` is a compile-checked `code`
   Card that asks the learner to *produce* it in C++ under a `static_assert` Harness, with a
   Distractor set the verifier confirmed all fail. Different Kind, different entry point,
   different retrieval demand — textbook deliberate variation. Nothing is lost by dropping
   it: the supplied fix was identical to the kept correctness finding **M13** on the same
   Card, which must still be applied.
2. **`05-priority`: "`heap-vocabulary` duplicates `heap-array-layout`'s two library facts
   almost verbatim."** *Dropped.* Confirmed on inspection: both Cards state that
   `std::priority_queue` is a max heap by default and that `pop_heap` does not remove. One
   is a `cloze` (cued recall of the term), the other a `code` Card's closing note (context
   for the snippet). The policy explicitly licenses restating a load-bearing rule on every
   Card that needs to stand alone months apart.
3. **`09-compilers/codegen`: "the cloze Card is a near-total restatement of the
   graph-colouring Card, so a seven-Card topic has six ideas."** *Dropped.* Confirmed on
   inspection: `allocation-vocabulary` compresses the same phases that
   `graph-colouring` develops. But one is recognition-level cued recall of five terms and
   the other is free recall of a five-phase algorithm — the inverse question, which is
   exactly what the policy protects. **However**, the two Cards *do* collide on pre-colouring,
   and that collision is kept as **M11 + M12** and must be fixed together.
4. **`10-databases/execution-and-sketches`: "`sketch-properties` c3 and c4 restate
   HyperLogLog's 1.04/√m and count-min's min-estimator, which the two dedicated Cards
   already teach."** *Dropped.* The reviewer already read it as a deliberate index/summary
   Card; under the policy that reading is correct and the recognition-vs-recall split is
   the point.
5. **`11-low-latency/lock-free`: "`ll-spsc-ring` pre-answers `ll-mpmc-queue`."** *Dropped.*
   Single-producer and multi-producer rings are different algorithms with different progress
   guarantees; the shared ring vocabulary is the scaffolding, not the answer. (The real
   defect in `ll-mpmc-queue` — that the Vyukov ring is blocking per slot and the Card never
   says so — was noted by the topic reviewer but did not reach the confirmed-findings set, so
   it is not listed above; it is worth a pass.)
6. **`14-transfer/intuition-traps`: the apparent overlap between `big-o-decides`, `small-n`
   and `hash-vs-tree` on "a sorted vector beats a tree at small n."** *Dropped* — the topic
   reviewer already declined to count it, and the policy confirms that call: the three Cards
   angle it as asymptotics-vs-constants, sophistication-vs-simplicity, and
   hash-vs-order-semantics respectively.

**Kept, and reclassified as actively misleading collisions** (two Cards giving different
numbers or different meanings for the same quantity, so learning one corrupts the other) —
each is written up above under its own heading:

- **M8** — `btree-vs-lsm.md` + `amplification.md` say "once per level" while
  `lsm-compaction.md` says "roughly the fanout per level": two incompatible models for the
  Deck's headline LSM number.
- **M3** — `seqlock.md` calls readers "wait-free only if the writer is slow" while
  `progress-guarantees.md` defines wait-free as unconditional.
- **M14 + `dominance.md`** — opposite block-numbering conventions for the same CHK
  algorithm, one of which the Harness depends on.
- **`pattern-defeating.md` vs `go-sort-dispatch.md`** — Go 1.19 vs Go 1.21 for the same
  quantity.
- **`latency-scale.md` + `hardware-numbers.md`** — the same false-sharing-beats-DRAM claim,
  contradicted by both Cards' own tables.

---

## Teaching quality by topic

| Topic | Score | One-line assessment |
| --- | --- | --- |
| `01-foundations/cost-models` | 9/10 | Every formula and worked example checks out by hand — but the verifier later found two errors in `latency-scale` the topic pass missed, and the Topic has no `code`/`parsons`/`chunk`/`trace` Card at all. |
| `02-sequences/arrays-and-buffers` | 8/10 | Accurate and consistently tied to the compiler/DB/HFT framing; one overclaim about deque chunk-index division becoming shifts, one off-topic ref. |
| `03-hashing/hash-tables` | 9/10 | The best Topic in the Deck: every constant recomputed, every Distractor genuinely discriminating, refs genuinely primary, no contestable cloze answer found. |
| `04-ordered/search-trees` | 7.5/10 | Ambitious and mostly excellent, with three rigorously correct compile-checked Cards — pulled down by `btree-fanout`, the quantitative Card of the Topic, misstating two of its own relationships. |
| `05-priority/heaps-and-queues` | 8/10 | Complexity claims and cache arithmetic check out precisely; one real arithmetic slip in the linear-build sum and one unconditional claim that is only worst-case. |
| `06-sorting/sorting-and-selection` | 8/10 | Strong and well-engineered with a standout `quickselect` Card — undermined by an inverted AKS result, a same-Topic date contradiction, a 404 ref and a stale Rust attribution. |
| `07-graphs/graph-algorithms` | 8.5/10 | Every Card explains the causal why and ties back to compilers/DBs/HFT; harnesses genuinely discriminate; one units error (8×) and a likely Tarjan/Gabow misattribution. |
| `08-strings/text-algorithms` | 8/10 | Unusually deep `basic` Cards and a rigorously verified KMP Harness; the rolling-hash Card mis-attributes both rsync's and Docker's actual mechanisms. |
| `09-compilers/codegen` | 7/10 | Expert-voiced and algorithmically sound, but two claims about LLVM's real pipeline are wrong (one on an `interview`-tagged rubric), refs are thin outside allocation, and the Topic is all prose at level 5. |
| `09-compilers/ssa-and-dataflow` | 8/10 | Genuinely strong — both compile-checked Cards were rebuilt and verified — but three teaching sentences slip, one of which makes its own "classic bug" Distractor mathematically correct. |
| `10-databases/execution-and-sketches` | 7/10 | The sketch mathematics is right to the digit and the refs are the right primary papers; the defects are all about specific systems, and the Topic has zero `code` Cards. |
| `10-databases/storage-and-indexes` | 6/10 | **Weakest Topic.** The quantitative core of the LSM story is wrong in the same way twice and contradicts a third Card; four more wrong-number/wrong-reason claims; seven long prose Cards and one interactive one. |
| `11-low-latency/latency-and-layout` | 7/10 | The right material, real refs, one genuinely value-discriminating `code` Card — but several numeric slips, and nothing makes the learner *compute* anything. |
| `11-low-latency/lock-free` | 7/10 | Well sequenced and practitioner-grounded, with two excellent `misconception` Cards — held back by an unsound seqlock ordering and a misused progress term, on the axis this Topic can least afford. |
| `12-idioms/chunks` | 8/10 | Every technical claim checks out and every back explains the why — except `bloom-double-hashing`, whose snippet is wrong on a Kind designed for verbatim memorisation. |
| `12-idioms/parsons` | 6.5/10 | All five reference implementations verified correct against their Harnesses, but two of five Cards have a Distractor that does not fail, contradicting each Card's own prose and the README. |
| `13-tracing/data-structures` | 8/10 | All 24 probe cells recomputed and correct, including a hand-simulation of libstdc++'s `__adjust_heap`; deductions are one wrong heapsort aside, one overstated guarantee, and an implementation-defined value graded as mandated. |
| `14-transfer/intuition-traps` | 8/10 | No factual error worth flagging; one clear true/false per Card, mechanism-then-what-to-do structure, real refs — but no compiler, database or low-latency trap among the eight. |

---

## Proposed new Cards

Deduplicated across reviewer lanes. Where two lanes proposed the same Card, the entries are
merged into the better-argued version and the merge is noted. Priorities are the reviewers'
unless a merge changed them.

### 01-foundations/cost-models

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `foundations-memory-level-parallelism` | cloze | *(merged: proposed independently by the 01-foundations and 11-low-latency lanes as `ll-memory-level-parallelism`)* A core sustains only ~10–12 outstanding line fills (LFB/MSHRs), so Little's law applied to memory gives achievable random-access throughput = concurrency / latency: 10 misses at ~80 ns is one per ~8 ns, ≈ 8 GB/s per core, whatever the instruction count. From that: a pointer chase has MLP 1 and is latency-bound, a scan saturates the buffers and is bandwidth-bound, and batching independent probes pays only until the buffers fill. Justifies two existing unexplained assertions — `foundations-cache-cost-model`'s "the misses cannot overlap" and `ll-prefetching`'s magic 8 — and turns `foundations-littles-law` from a queueing fact into a hardware one. Reuse the Deck's existing 80 ns / 64 B figures. |
| **High** | `foundations-growth-cost` | code | A constexpr `total_moves(n, numerator, denominator)` simulating capacity growth and accumulating elements copied; the blank is `cap * numerator / denominator`, with distractors `cap + numerator`, constant-increment growth, and `cap * numerator` without the divide. Static_asserts the numbers the prose only claims: doubling 1→1024 moves 1023 elements; 1.5× moves visibly more; a constant +16 moves ~n²/32 and blows past both at n = 4096; `reserve(n)` first gives 0. **This would be the Topic's first hands-on Card.** |
| Medium | `foundations-potential-method` | cloze | Names the three amortised techniques (aggregate, accounting, potential) and works one: for a doubling vector Φ = 2·size − capacity, so a cheap push costs 1 + ΔΦ = 3 and the reallocating push pays n while Φ drops by n, netting 3. Blanks the potential function, the amortised cost, and the two side conditions (Φ ≥ 0 always, Φ(initial) = 0) that make the argument valid. Inverse angle on `foundations-amortised-vs-average`, which reasons in credit language and never names the technique. |

### 02-sequences/arrays-and-buffers

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `seq-ring-wrap-arithmetic` | code | A constexpr `size_of(head, tail)` over deliberately narrow `std::uint16_t` sequence numbers so the wrap is reachable inside a `static_assert`. The blank is `static_cast<std::uint16_t>(tail - head)`; distractors are the three real bugs — bare `tail - head` (integer promotion makes the wrapped case negative), a `tail < head ? …` comparison on wrapped counters, and a modulo form mixing wrapped and unwrapped values. Failure-mode counterpart to `seq-ring-buffer-mask`'s happy path; makes `seq-ring-buffer-full-vs-empty`'s prose rule ("compare with subtraction, never with `<`") producible. |
| Medium | `seq-swap-and-pop` | code | A constexpr fixed-capacity vector whose `remove_at(i)` does `data[i] = data[--size]`; distractors `data[i] = data[size--]` (reads the stale slot), a shift-down loop (correct but O(n)), and no shrink. Asserts the contents *and* the consequence: an index taken before the erase now names a different element — the concrete failure `seq-generational-handles` exists to catch. Contrasts erase-remove/`std::erase_if` for the order-preserving case. |

### 03-hashing/hash-tables

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `hash-consistent-hashing` | code | A constexpr `owner_of(key)` over a sorted array of virtual-node tokens: hash, find the first token ≥ it, wrap to `tokens[0]` past the end (the blank), with distractors that clamp to the last token or fall off the array. Asserts (a) which node owns each key, (b) that removing a node's tokens leaves every other key on the *same* node — the property `hash(key) % N` cannot give — and (c) that 3× the virtual tokens owns ~3× the key space. Closing note contrasts rendezvous (HRW) hashing. **Absent Deck-wide** despite the DB lane covering hash partitioning. |
| Medium | `hash-combine-keys` | code | Two constexpr combiners side by side: a fixed `xor_combine(h,k) = h ^ k` and a blanked real one (Boost's `h ^ (k + 0x9e3779b97f4a7c15ULL + (h << 6) + (h >> 2))`), distractors `h ^ k`, `h + k`, `h * k`. Asserts the *properties*: `xor_combine` is symmetric and annihilates equal fields, the real combiner distinguishes field order and does not. The Topic has two `code` Cards on the bit layout of a single hash and none on producing a hash from more than one value. |

### 04-ordered/search-trees

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| Medium | `ordered-galloping-search` | code | Exponential (galloping) search returning index *and* probe count; the blank is the doubling step `bound *= 2`, followed by `lower_bound` over `[bound/2, min(bound,n))`. Asserting the probe count is what kills an answer that degenerates to a plain binary search — right index, wrong count. Cost model O(log i) in the *distance to the answer*. Load-bearing under `sort-merge-join`, `roaring-bitmaps` and `pattern-defeating`, all of which the Deck covers while never teaching the primitive; the Topic's three binary-search Cards all assume a uniform answer. |
| Medium | `ordered-btree-delete-and-bloat` | basic | The delete side the Topic never works: underflow below the half-full minimum, borrow vs merge, upward propagation and height shrink, separator repair — then the engineering reality that most engines do *not* merge eagerly (merging needs sibling latches and workloads refill the page), so pages stay partly empty. That is index bloat, and it is why VACUUM, REINDEX and fillfactor exist. The ordered-index counterpart to `hash-tombstones`: deletion is the operation that quietly degrades the structure. |

### 05-priority/heaps-and-queues

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `heap-indexed-decrease-key` | code | An array heap plus `pos[element] = slot` maintained inside every swap — O(log n) decrease-key, arbitrary delete and `update`. The blank is the position write inside the swap helper; distractors swap values but not `pos`, update only one entry, or write `pos[i] = i`. The Harness asserts the `pos` array *and* the full pop order after a decrease-key, so a half-updated `pos` corrupts a later sift. **Four Cards circle this operation without showing it**, and `heap-go-container-heap` shows the hook in Go only, leaving the learner believing C++ cannot do it. |
| Medium | `heap-k-way-merge` | code | A heap of k (value, run-id) entries: pop the minimum, emit, push the next element **of the run it came from** (the blank), with distractors that advance a round-robin index or the next run — both producing a permutation that is no longer sorted. Asserts the whole merged array. Back covers O(n log k), exhausted-run handling, and the loser tree's one-comparison-per-level refinement. `sort-external-merge` and `heap-top-k` both stop at the words "a loser tree or heap". |

### 06-sorting/sorting-and-selection

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `sort-three-way-partition` | code | Dutch-national-flag partitioning and the asymmetry that is the whole bug surface: after swapping `a[i]` with `a[gt--]` you must **not** advance `i`, because the element pulled in is unexamined; after swapping with `a[lt++]` you must. Distractors `++i` in the gt branch (silently drops elements) and `--gt` in the equal branch. Asserts the whole array and both boundary indices. New angle over `sort-quickselect` and `parsons-lomuto-partition`, which both teach two-way Lomuto on *distinct* keys and never say what happens when keys repeat — the quadratic case that actually shows up sorting a low-cardinality column or a symbol id. |
| Medium | `sort-parallel-partitioned` | basic | Why production parallel sorts partition by key range (sample sort: oversample splitters, sort the sample, scatter morsels into per-splitter buckets, sort each bucket, concatenate) rather than sort-then-merge — range-disjoint buckets make the concatenation free, while merge-based parallel sort needs merge-path co-ranking. Skew is the whole problem, which is why splitters come from a *sample*. The scatter is the same histogram-then-scatter as radix partitioning in a hash join. `basic` is correct here: thread scheduling and load balance cannot be graded by a `static_assert` when the compile service never executes. |

### 07-graphs/graph-algorithms

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `graph-mst-kruskal` | code | The cut property made operational: process edges in nondecreasing weight, accept (u,v) iff `find(u) != find(v)` (the blank), stop at V−1. Distractors `find(u) == find(v)`, a visited-array test (Prim's condition), and an unconditional unite. Reuses the `DisjointSet` from `graph-union-find` and asserts total weight *and* accepted-edge mask. Back carries the cut property, the exchange argument, Prim-with-a-heap vs Kruskal-with-union-find, and that maximum spanning tree is the same code with the sort reversed. Currently only name-dropped inside `graph-union-find`. |
| **High** | `graph-astar-heuristic` | code | A* as Dijkstra on reweighted edges: w'(u,v) = w(u,v) − h(u) + h(v) is Johnson's potential transform, a *consistent* h keeps every w' non-negative, and admissible-but-inconsistent needs reopened closed nodes. The blank is the priority key `d[v] + h(v)`; distractors `d[v]` (plain Dijkstra), `h(v)` (greedy best-first), `d[v] + 2*h(v)` (weighted A*). Asserts the distance **and the expansion count** over a constexpr grid with a Manhattan heuristic, so `d[v]` fails on the count. Completes the reweighting idea `graph-dijkstra-nonnegative` sets up and stops. |
| Medium | `graph-csr-build` | code | The three-pass build every graph engine and CFG builder runs: histogram out-degrees, exclusive prefix-sum into `offset[V+1]`, scatter with a moving cursor (`target[cursor[u]++] = v`). Distractors include an inclusive prefix sum and scattering with `offset[u]++` (destroys the offsets it reads). New angle on `graph-representations`, which argues for CSR and never shows the freeze — and the Deck's own cross-domain move: the same histogram-prefix-sum-scatter as `sort-radix` and `parsons-counting-sort`, met inside a graph. |

### 08-strings/text-algorithms

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `str-edit-distance` | code | Levenshtein in two rolling rows, with the blank on the substitution term (distractors: always +1, `d[i-1][j-1]` alone, a max instead of a min). Static_asserts kitten/sitting = 3, a prefix pair, an empty string, and a transposition pair pinning Levenshtein = 3 where Damerau says 2 — so the Card discriminates on values *and* teaches that the two metrics differ. Back covers O(min(m,n)) space, the k-band variant for "within k edits", and Myers' bit-vector 64-columns-per-word. **Approximate matching is absent Deck-wide.** |
| Medium | `str-horspool-skip` | code | The bad-character table `shift[c] = m-1-i` for i < m−1 (last occurrence excluded, defaulting to m), right-to-left comparison, and the shift taken from the text character aligned with the pattern's last position (the blank). Distractors `1`, `m`, and the mismatched character's own index. Asserts the shift table, the match positions, **and a comparison counter** — which is what makes the `1` distractor fail on a value rather than merely be slow. `str-matching-choice` c3 is literally "skip ahead :: by the bad-character and good-suffix rules" and no Card supplies the mechanism. |
| Medium | `str-aho-corasick-build` | code | `fail[child(node,c)] = goto(fail[node], c)` (the blank), root's children → root, and `out[v] = terminal(fail[v]) ? fail[v] : out[fail[v]]`. Distractors `fail[node]`, `root` always, `goto(node, c)`. Asserts the whole `fail` array over {he, she, his, hers} and the matches reported scanning "ushers", where the output-link distractor finds "hers" and misses "he". Explains why BFS order is not aesthetic: a node's link is defined via its parent's. Inverse-scale angle on `str-kmp-failure-function` — same border idea, many patterns, trie vs array, BFS vs loop. |

### 09-compilers/ssa-and-dataflow

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `compiler-ssa-renaming` | trace | An instrumented renaming walk over a diamond CFG, probing: the version-stack top on entry to a block, the version a use is rewritten to, the operand the successor's φ receives **for that predecessor's index**, and the stack top after the pop. The half of SSA construction the Topic never shows — placement is `compiler-dominance-frontier`, renaming is nowhere. Names Braun et al.'s on-the-fly construction (Cranelift, Go's SSA) as the alternative. The two bugs everyone hits: forgetting the pop, and filling φ operands by successor order. Per the README, author the expected values by running an instrumented copy and name the compiler. |
| **High** | `compiler-memory-ssa` | basic | Why `load`/`store` cannot be SSA values, the may/must/no-alias answers and their cheap sources (distinct allocations, TBAA, `restrict`/`noalias`, field-sensitive points-to), MemorySSA's MemoryDef/MemoryUse/MemoryPhi over a single abstract memory value, and the two clients it makes cheap (store-to-load forwarding by walking the defining access; DSE by walking forward). Plus why `mem2reg` is the high-value pass. `compiler-ssa-form` names this hole outright and nothing fills it. |
| **High** | `compiler-control-dependence` | basic | Post-dominance on the reversed CFG, control dependence (equivalently: the dominance frontier of the reverse CFG), and the pass those definitions exist for — aggressive/optimistic DCE marking side-effecting instructions and returns live, propagating to operands *and to the branches blocks are control dependent on*, then rewriting each deleted branch to jump to its nearest marked post-dominator. Contrasts the pessimistic iteration in `compiler-liveness`, which cannot delete a loop that computes nothing. **Three Cards advertise this machinery and none defines it.** |
| **High** | `compiler-range-widening` | code | A constexpr interval type and `widen(old, fresh)` — lower bound moved down ⇒ −INF, upper moved up ⇒ +INF, otherwise keep. Asserts `[0,0] widen [0,1] == [0,+INF]`, `[0,5] widen [0,5]` stable, and `narrow` against an `i < 10` guard recovering `[0,9]`. Distractors: widening both ends unconditionally (loses `i ≥ 0`, so bounds-check elimination can never fire) and widening only on the first iteration. `compiler-worklist-dataflow` makes finite height a *hypothesis* and `compiler-sccp` invites you to substitute "value ranges" — the one lattice that is not of finite height. |
| Medium | `compiler-available-expressions` | code | A forward-**must** confluence over a bit vector: fold predecessors' `avail_out` with `&` starting from all-ones, entry special-cased to empty. Discriminates one predecessor, two disagreeing predecessors, and a block whose predecessors are unprocessed (the fold must not see zero), so a distractor starting at `0u` or unioning fails on a value. Inverse angle on `compiler-liveness-transfer` (a backward-**may** *transfer* function): this is the *meet* and the initialisation, where the optimistic/pessimistic choice inverts. `compiler-worklist-dataflow` names all four quadrants and only liveness is ever instantiated. |

### 09-compilers/codegen

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `compiler-parallel-copy` | code | A constexpr `sequentialise` taking a φ group as a destination→source permutation, emitting register moves, with a Harness that applies them to a register-file array and asserts the final contents. Emit every copy whose destination is nobody's source, then break the remaining permutation cycle with one temporary. The 2-cycle (`a=φ(b), b=φ(a)`) is the discriminating assertion — naive sequential emission compiles fine and loses a value. New angle over `compiler-ssa-destruction`, which *states* the swap problem in prose. **The Topic's first hands-on Card.** |
| **High** | `compiler-switch-lowering` | code | `in_set(int c)` as a back end lowers a small dense case set: `static_cast<unsigned>(c - kLo) < 64u && ((kMask >> (c - kLo)) & 1ull)`. Asserts membership across the range, below `kLo` (where the unsigned subtraction wraps) and at bit 63. Distractors: dropping the range guard (shift ≥ 64 is UB, so GCC rejects it as non-constant — the Deck's own failure mode), `1u` instead of `1ull`, and `<= 64u`. Back places it in the lowering ladder: jump table when dense, balanced search tree over clusters when sparse, bit test when a cluster fits a word — and why the jump table's indirect branch can lose to a predictable compare chain. **No mention of a jump table exists Deck-wide.** |
| **High** | `compiler-register-classes` | basic | What textbook colouring ignores: disjoint register classes (GPR / vector / predicate), sub-register aliasing (AL/AH/AX/EAX/RAX are one physical resource, so defining AL partially defines RAX), register pairs and even/odd alignment, x87/MMX/SSE overlap, and operands pre-coloured by the ISA (`div` writing RDX:RAX, shift counts in CL) or the ABI. Then how allocators model it: register *units* as the interference resource, class-constrained colouring, and artificial use-def chains to keep liveness correct across sub-register defs. Both allocation Cards say "K machine registers" as if interchangeable. |
| Medium | `compiler-linear-scan-loop` | parsons | The allocation loop as shuffled statements: sort by start, expire from `active` everything whose end precedes the current start (returning its register), assign if free, else compare the current interval's end against the last in `active` and spill whichever ends later. Distractors: `end <= start` vs `end < start` (the off-by-one that hands a register to an interval still live at the same instruction) and spilling the current interval unconditionally. Asserts the assignment **and** which interval got spilled. New angle over `compiler-linear-scan`, which argues compile-time budget in prose and never makes the learner produce Belady's rule. |
| Medium | `compiler-if-conversion` | basic | The transformation (control-dependent diamond → predicated straight-line code via `cmov`/`csel`/AVX-512 masks, requiring both sides speculatable or masked) and the cost model that decides it: a select costs both arms plus a data dependence on the condition; a branch costs ~0 predictable and ~15–20 cycles not. So it pays exactly when the branch is unpredictable **and** the arms are cheap. Two failure modes: converting a well-predicted branch (now you always pay the expensive arm and have serialised a latency chain), and converting away a short-circuit protecting a load. The argument for PGO. **The Deck spends the branchless argument three times from the programmer's seat and never from the compiler's.** |

### 10-databases/storage-and-indexes

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `db-latch-crabbing` | basic | *(merged: proposed independently by the 04-ordered lane as `ordered-latch-crabbing`; the DB version is the better-argued one. Cross-reference it from `ordered-bplus-tree`.)* Latch coupling — take the child latch before releasing the parent's, release ancestors once the child is provably safe (room to insert / above minimum) so the root latch is held one level, not the whole descent; why a pessimistic writer latching the whole path serialises the tree at the root; **B-link trees** (high key plus right-sibling pointer, so a reader arriving mid-split follows the link instead of blocking, letting a split publish the right half before fixing the parent); and **optimistic lock coupling** (read a version counter, work unlatched, restart on mismatch — readers write nothing, so no line bounces). Failure modes: restart storms under a hot split, deadlock avoidance by always latching top-down and left-to-right. Names latches (physical, nanoseconds, no deadlock detection) vs locks (logical, transaction-duration). **Returns zero hits Deck-wide.** |
| **High** | `db-btree-split` | code | A constexpr split of a fixed-capacity sorted node returning (left count, separator key, right count), asserting **both** cases: a **leaf** split *copies* the separator up (the key stays in the right leaf, so left_n + right_n == n, and the parent's separator equals right[0]) while an **internal** split *moves* the median up (it appears in neither child, so left_n + right_n == n − 1). A distractor treating a leaf split like an internal one compiles fine and silently loses a row — only a value assertion catches it. Further asserts post-split occupancies and the right-biased split for monotonic inserts (split at n−1, not n/2) that keeps an append-only load near 100 % full instead of 50 %. **No Card in the Deck makes a learner write down what a node contains after a split.** |
| **High** | `db-secondary-index-lookup` | basic | Clustered/index-organised vs heap tables and what falls out: in a heap table (Postgres) a secondary index stores a physical (page, slot) row id, so a lookup is descent + one random heap fetch and a moved row forces every secondary index to update (why HOT exists); in an index-organised table (InnoDB, SQL Server) a secondary index stores the **primary key**, so every secondary lookup is two full descents and a fat PK inflates every secondary index — the concrete argument for a narrow surrogate key. Then covering indexes and index-only scans, and why Postgres still needs the visibility map (the index carries no MVCC information). Finally the crossover: a secondary-index scan loses to a sequential scan once selectivity is bad enough, which is why "the index exists but is not used" is usually correct. `db-slotted-pages` defines a row id and stops. |
| Medium | `db-torn-pages` | cloze | The durability hole `db-wal-and-commit` leaves open: a device guarantees atomicity only at sector granularity, so an 8 KiB page write can be half-old and half-new, and a torn page breaks redo because ARIES redo is idempotent only if the page's LSN is trustworthy. The three fixes with their costs — Postgres `FULL_PAGE_WRITES` (why WAL volume spikes right after a checkpoint, and why checkpoint spacing is a knob), InnoDB's doublewrite buffer, and hardware/filesystem atomic writes (NVMe atomic write unit, ZFS/Btrfs CoW) that let you turn the others off. Closes on per-page checksums as the detection mechanism. **"Doublewrite", "full-page" and "torn page" return nothing Deck-wide.** |
| Low | `db-explain-read-path` | explain | A rubric: given `SELECT cols FROM t WHERE pk = ?`, narrate the whole path and name the structure at each step — parse and plan, index chosen and why, descent with the latch protocol, buffer-pool lookup by page id, hit or miss, pin, the eviction/WAL constraint on the frame, slot-array indirection, null bitmap and fixed/variable split, MVCC visibility and version-chain walk, the secondary-index extra hop if not covering, unpin — and what changes on an LSM (memtable, Bloom per level, index block, data block). Rubric also covers I/O count, what a concurrent splitter changes, and where the latency goes. This Topic has no `explain` Card and every Card teaches one layer in isolation. |

### 10-databases/execution-and-sketches

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `db-hash-aggregation` | basic | The aggregation hash table keyed by the grouping key with mutable accumulator state per group (unlike a join's build table, which stores rows); pre-aggregation in a small thread-local table that absorbs skewed hot groups before the global merge; the grouping-key encoding decision (fixed-width normalised key vs pointer, cross-referencing 06-sorting); partitioned and spilling aggregation — the same grace transformation `db-hash-join` teaches, applied to aggregation; DISTINCT as an aggregation with no accumulator and COUNT(DISTINCT) as where HyperLogLog replaces it; and the partial/final split that makes aggregation distributable, with AVG being non-mergeable where SUM and COUNT are. **Joins are taught three ways and aggregation not at all** — and this is where the Topic's own sketches plug into execution. |
| **High** | `db-index-nested-loop` | basic | The inverse of `db-hash-join`: index-nested-loop wins when the outer is small and the inner has a selective index, because cost is \|outer\| × descent with no build and no materialisation — so it is the only join that returns rows immediately, which makes it right under `ORDER BY … LIMIT` and inside a correlated subquery. It preserves the outer's order (the "interesting order" argument from the other side) and is the plan a distributed engine issues as a point-lookup RPC per row. Then the asymmetry of plan *risk*: cost is linear in the estimated outer cardinality, so a 1000× underestimate is a 1000× slowdown while a hash join degrades gracefully — why optimisers are tuned against it even when it is cheapest in expectation. Batched/block INL as the mitigation. |
| Medium | `db-reservoir-sampling` | code | Algorithm R: fill with the first k; for item i > k draw j uniformly in [0, i) and replace `reservoir[j]` if j < k (the blank). A constexpr xorshift/LCG over a fixed seed makes the resulting reservoir determinate, so off-by-one distractors (`% (i+1)`, `j <= k`, drawing in [0, i−1)) all compile and all produce a different reservoir — value assertions catch a bias no syntax check would. Explanation carries the k/n survival proof, A-Res weighted sampling (reuses `heap-top-k`), distributed reservoir merging, and Algorithm L's skip-ahead. `join-ordering.md` cites sampling as the mitigation for bad estimates and no Card teaches it. **This would be the Topic's first `code` Card.** |
| Medium | `db-push-and-pipeline-breakers` | basic | Pull (Volcano `next()`) vs push (HyPer's produce/consume): in a push engine the leaf drives and the consumer's code is inlined into the producer's loop, so a pipeline collapses into one loop over one data structure — which is what makes whole-stage code generation possible and why a pull engine cannot be compiled as effectively. Then the concept that structures every physical plan: a **pipeline breaker** must consume its whole input before producing anything (sort, a hash join's build side, aggregation, any spill), so a plan is a DAG of pipelines separated by materialisation points — where memory is budgeted, where spilling happens, where parallelism is re-partitioned, and where an adaptive optimiser re-plans. How to read a HyPer/DuckDB/Spark plan: find the breakers first. |
| Medium | `db-quantile-sketch` | basic | The fourth sketch, currently a name in a cloze blank. t-digest clusters points with a scale function that makes clusters small at the tails and large in the middle (p99 accurate, p50 not, deliberately); KLL/GK give a uniform **rank** guarantee. The trap the Card exists for: rank error bounds *where the answer sits in the sorted order*, not how far the returned value is from the true one — on a heavy-tailed latency distribution a 1 % rank error near p99 can be a large multiple in milliseconds. And the operational point: quantiles are not summable, so averaging per-node p99s is meaningless, but sketches are **mergeable** — the only correct way to compute a fleet-wide p99. `11-low-latency/tail-latency` talks p99 throughout and no Card says how one is computed. |

### 11-low-latency/lock-free

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `chunks-cas-retry-loop` (in `12-idioms/chunks`) | chunk | *(merged with the 11-low-latency lane's `ll-cas-retry-loop`; author this one first — see the `code` variant below.)* The canonical loop as a recalled unit: `T expected = a.load(relaxed); do { T desired = f(expected); } while (!a.compare_exchange_weak(expected, desired, release, relaxed));` plus the three details that make it the idiom — `_weak` not `_strong` inside a loop (spurious failure is free there), `expected` is an in/out parameter the failing exchange **refreshes for you** so re-loading by hand is the bug, and the two orders with the failure order never stronger. Names `_mm_pause`/`YIELD` backoff as the loop body under contention. Atomics are not constant-evaluable, so `compile: null` and whitespace-normalised grading, exactly as the eight existing chunks. **`compare_exchange` returns nothing Deck-wide.** |
| **High** | `ll-seqlock-reader` | code | Complete `must_retry(before, after)` as `(before & 1) != 0 \|\| before != after`, asserted over the discriminating cases: (2,2) no retry, (3,4) retry (read began mid-update), (2,4) retry (a whole update landed inside the read), (3,3) retry, and a wrapped pair where `after < before` (retry — which a `<` comparison would miss). Distractors testing only oddness, only equality, or `after > before` each fail a listed case. Pure `uint64_t` arithmetic, fully constexpr, so the Topic gets its first value-asserting Card over a real concurrent algorithm with no threads. New angle over `ll-seqlock`: the reader's failure cases as values rather than the writer's protocol as prose — **and it pairs directly with M2/M3.** |
| **High** | `ll-spin-wait` | cloze | How to wait: `_mm_pause`/`YIELD` as a hint that drains speculative loads and avoids the memory-order-violation flush on loop exit (~5 cycles on Skylake, ~140 on Skylake-X — why tuned backoff is machine-specific); TTAS vs plain TAS (spin on a *load* so the line stays Shared instead of being RMW'd Exclusive every iteration); exponential backoff with a cap; hyperthread-sibling courtesy; and the spin-then-park threshold (~ a context switch, 1–5 µs, which the Topic's own numbers supply). `ll-mpmc-queue` says "wait until that slot's sequence equals the ticket" and never says how; `ll-busy-polling` is about core isolation, not the inside of the loop. Also rebalances a Topic that is seven `basic` essays. |
| Medium | `ll-cas-retry-loop` | code | The second angle on the CAS loop, once the chunk exists: models the cell as a constexpr type whose `cas(expected, desired)` mutates the cell behind the caller's back for the first k calls (a scripted interfering thread) and writes the observed value into `expected`. Asserts the final cell value **and the retry count**, so a loop reusing the stale `expected` or recomputing `desired` from the stale load produces the wrong value — and a loop that never refreshes `expected` never terminates, which GCC rejects as non-constant, exactly as the README describes. Say on the Card's face that the atomics are modelled, and why. |
| Medium | `ll-store-buffer` | basic | The litmus test `ll-memory-orders` asserts and never shows: thread 1 does `x.store(1, release); r1 = y.load(acquire)`, thread 2 the mirror, and `r1 == r2 == 0` is permitted — not by a compiler trick but by the store buffer letting each core's load be satisfied before its own store drains. Names it as StoreLoad, the only reordering x86's TSO permits, and prices the three fixes (both stores `seq_cst`, a `seq_cst` fence between store and load, or restructure). Closes on why release/acquire suffices for a queue (the reader reads the value the writer wrote) and not for mutual exclusion (nobody reads anybody's value). `basic` because the interesting outcome is nondeterministic and usually unobservable on x86, so a `trace` cannot be authored by running it. |

### 11-low-latency/latency-and-layout

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `ll-struct-layout` | code | Three Cards assert this and none works it (`order-book`: "pad the hot fields into their own cache lines"; `explain-hot-path`: "hot fields together, cold fields elsewhere"; `hardware-numbers`: "one `alignas` can change a scaling curve"). The learner reorders a real order-book record so the struct shrinks (largest alignment first, `bool` and `uint8_t` adjacent, no trailing hole), splits the cold audit fields behind a handle so the hot record is exactly one 64-byte line, and sees what `alignas(64)` does to `sizeof` on a 40-byte payload. `sizeof`, `alignof` and `offsetof` are compile-time, so the Harness is pure `static_assert` with **no execution at all** — `static_assert(sizeof(Order) == 32); static_assert(offsetof(Order, qty) < 64); static_assert(sizeof(Book::Hot) == 64);`. Every wrong field order fails on a size or offset. |
| **High** | `ll-numa` | basic | Pages are placed on the node of the first thread to *write* them, not the one that called `malloc`, so a startup thread pre-faulting the whole arena pins every page to node 0 and every worker on node 1 is permanently remote. The local/remote ratio (~1.5–2× latency, a much worse bandwidth ceiling, and worse still for a written line's coherence traffic); why a migrated or unpinned thread degrades silently and never recovers; the fixes — pre-fault from the thread that will use the memory, `numactl --membind`/`--cpunodebind`, per-node arenas, `move_pages`, and keeping the NIC's queues on the polling node. Currently one bullet in `busy-polling` and one clause in `explain-hot-path`. The symptom — a service 40 % slower after a restart — is named by no profiler. |
| Medium | `ll-tlb-reach` | code | Two constexpr functions, `reach(entries, page_bytes)` and `entries_needed(working_set, page_bytes)`, asserting: 1536 × 4 KiB = 6 MiB of reach; the same 1536 × 2 MiB = 3 GiB; an 8 GiB table needs 2,097,152 4-KiB entries against 4096 at 2 MiB. Integer arithmetic only, so nothing is executed. New angle over `ll-huge-pages`: the learner *computes* whether their structure fits instead of recalling that huge pages help — and the arithmetic shows a 200 MB index is already past reach at 4 KiB. **Directly repairs the numbers the huge-pages Card currently gets wrong.** |
| Medium | `ll-icache-layout` | basic | The Topic is called latency-and-*layout* and layout means data layout in all ten Cards. The front end fetches into a ~32 KiB L1i and a µop cache with its own capacity rules, so an inlined error path, a logging call or a throwing helper between two hot blocks costs fetch bandwidth on every pass though it never executes. Fixes: `[[unlikely]]`/`__builtin_expect` for block placement, outlining the cold path into a `noinline cold` function, hot/cold section splitting, avoiding over-inlining (bigger is not faster once the loop leaves the µop cache), and profile-guided layout — Pettis–Hansen, PGO, BOLT-style post-link function reordering. How to see it: `perf stat` on `L1-icache-load-misses` and frontend-bound cycles. |
| Medium | `ll-wire-timestamps` | basic | The measurement chain an HFT shop actually runs: NIC hardware timestamping (PHC-stamped RX/TX descriptors, `SO_TIMESTAMPING`) or a tapping switch/capture card; PTP with `ptp4l`/`phc2sys` to discipline the PHC to a grandmaster and the sub-microsecond error budget that leaves; converting a PHC timestamp into a TSC-comparable one; TSC synchronisation across cores and sockets (invariant ≠ synchronised — a thread migrated mid-measurement can produce a negative interval); and why a user-space timestamp taken after the kernel-bypass poll loop hides both NIC queueing and wire time. Closes on decomposing one trade into wire→app, app decide, app→wire. `ll-measurement` times a 50 ns operation in-process and never says the number the business buys is tick-to-trade at the wire. |

### 12-idioms/parsons

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| Medium | `parsons-kahn-toposort` | parsons | Order the in-degree histogram pass, the zero-in-degree seeding, the pop/emit/decrement loop, and the `emitted == V` test. Distractors chosen semantically: decrementing the in-degree of `u`'s *predecessors* rather than its successors, and emitting on decrement-to-zero *before* the pop. New angle over `parsons-bfs-csr`, which shares the CSR skeleton: the enqueue condition is **a counter reaching zero, not a first visit**, so a vertex with three parents is enqueued exactly once — and a cycle needs no separate detection pass, the queue simply drains early. Asserts the emitted order for a DAG *and* the short count for a cyclic graph. |
| Medium | `parsons-sift-up` | parsons | The inverse of `parsons-sift-down`: push at the back, walk up with `parent = (i - 1) / 2`, stop when the parent is not smaller — and the loop condition `while (i > 0)` that must be tested **before** the parent is computed, because `(0 - 1) / 2` on a `std::size_t` wraps to an enormous index. Distractors: the unguarded `i = (i - 1) / 2;` and a sift-down-style "compare both children" line. Also the cost asymmetry: sift-up compares against one parent and is O(log n) worst *and* average, which is why n pushes cost O(n log n) while `make_heap`'s n sift-downs cost O(n) — the asymmetry the linear-build argument rests on. The unguarded ordering is not a constant expression, so GCC rejects it. |

### 13-tracing

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `trace-sccp-lattice` | trace | A hard-coded three-block SSA CFG with a conditional on a value SCCP proves constant; probes after each worklist pop report each SSA value's lattice state and each edge's executable flag. The angle no prose Card can give: SCCP is **optimistic** — everything starts at ⊤ and only *lowers*, and a φ meets only over edges currently marked executable, which is exactly why SCCP kills a branch that separate constant propagation plus DCE, run to fixpoint in any order, cannot. The trace also shows the monotonicity that guarantees termination. **The Deck has no hands-on compiler Card of any kind, and this tracing Topic is six STL containers.** Belongs in a new sibling Topic `13-tracing/compilers`, mirroring how `09-compilers` and `10-databases` each carry two Topics. |
| **High** | `trace-btree-split` | trace | *(overlaps `db-btree-split` above — author the `code` Card first, then this as the second angle.)* Order-4 node with keys {10,20,30} taking a fourth, probing `left.n`, `right.n`, `right.key[0]`, `parent.key[0]`, `parent.n` after the split, and again after a second split propagating into the parent. Payload: in a **B⁺-tree the separator is copied up and the key remains in the right leaf**, whereas in a **B-tree the median moves up and is gone from both children** — so leaf occupancy is not what the B-tree arithmetic predicts, and a right-edge insert is why real engines bias the split point. The most valuable structure to trace for a Deck aimed at databases. |
| **High** | `trace-union-find-path-halving` | trace | The eight-element `parent`/`size` arrays after `unite(0,1)`, `unite(2,3)`, `unite(0,2)` (oriented by size), a deliberately long chain, and then a single `find` on the deepest node, with probes on `parent[k]` for three specific k. The angle: **what path halving physically does to the array** — the find does not flatten the whole path, it rewires every *other* node to its grandparent, so depth roughly halves and a second find halves again. Also that `find` must run on both arguments *before* the link, and that `size` is maintained only at roots so `size[non-root]` is stale. The one form missing from the Deck's showcase multi-angle subject — the one that makes the amortised bound believable rather than memorised. **Authoring caution:** keep it on union by **size** with **path halving**, so it does not collide with `parsons-union-find`'s legend, which deliberately uses a plain find and rejects `rank` as a distractor. |
| Medium | `trace-rehash-invalidation` | trace | Insert into a `std::unordered_map` across a rehash while holding both an iterator and a reference, probing `bucket_count()`, `load_factor()`, the value read through the reference, and `bucket(key)` before and after. The answer engineers get wrong: node-based storage means **pointers and references stay valid across a rehash and only iterators are invalidated** — the opposite of `std::vector`, where reallocation kills all three. Second half contrasts an open-addressed table (`absl::flat_hash_map`), where a rehash moves the elements and invalidates everything, which is why it is not a drop-in replacement and why the fix is a flat table of handles into a stable arena. `seq-invalidation-rules` states the rule as a `cloze`; recall of a rule is not prediction of a value. |

### 14-transfer/intuition-traps

| Priority | Id | Kind | What it teaches |
| --- | --- | --- | --- |
| **High** | `trap-compiler-will-optimise` | basic | "The compiler will vectorise, inline and hoist this, so writing it the clear way costs nothing." Why the optimiser's freedom is narrower than assumed: a potentially-aliasing store kills a hoist (`restrict` is what unblocks it); FP reassociation is forbidden without `-ffast-math`, so a naive sum never vectorises; a call whose body the compiler cannot see (no LTO, virtual, function pointer) is an optimisation barrier and clobbers every escaped object; inlining is a size-and-call-site heuristic and `inline` is a linkage keyword. The harder half of the same belief: **UB is not "works until it crashes"** — signed overflow, a provable out-of-bounds read, a null check *after* a dereference are used as facts to delete code, so the symptom appears in a distant function and only at `-O2`. Correction: read `-fopt-info-vec-missed` and the disassembly. **Compilers are a target field and this Topic has no compiler trap.** |
| **High** | `trap-index-always-helps` | basic | "Adding an index is close to free — worst case the optimiser ignores it." Every write now touches every index: one row insert becomes 1 + k page modifications, k WAL records, k dirtied frames — and on an LSM, k more entries to compact. A non-covering secondary index costs a **second** descent, so a scan predicted to use it can lose to a sequential scan once selectivity passes a few percent, which is why the optimiser ignoring your index is often correct. Plus: a low-cardinality index is nearly useless, a randomly-distributed key destroys insert locality where a monotonic key does not, and every index is another statistics object that can go stale and produce the catastrophic nested-loop plan `db-join-ordering` describes. `elaborate`: pick an index you added — how many writes per second pay for it, and what fraction of reads use it? |
| Medium | `trap-busy-polling-always-wins` | basic | "Busy-polling and kernel bypass reduce latency, so use them everywhere in the hot path." Busy-polling removes wakeup latency but burns a core, and an un-isolated spinning thread is descheduled at the worst moment (no `isolcpus`/`nohz_full`, no pinning, no `SCHED_FIFO` — and the tail is then *worse* than a blocking wait); more spinners than cores is catastrophic; a spinner also drops the turbo bin for everything on the core. Kernel bypass moves the copy and the syscall out, not the queueing. Paired half: batching raises throughput by amortising per-item overhead but adds a delay equal to the batch-fill time to the first item, trading p50 against p99 in the direction HFT cannot accept — and past the ~10–12 outstanding line fills a core sustains, a wider batch stops paying. Correction: measure the tail, on the path you care about. |

---

## What to do first

1. **Fix the snippet in `topics/12-idioms/chunks/bloom-double-hashing.md` (M1).** One line.
   It is the only Card in the Deck whose *code* is wrong, and the `chunk` Kind exists to
   install it in muscle memory.
2. **Repair the two `parsons` Distractors and the README claim (M4, M5, M6, M7).** Apply
   the verified `kOffset`/`kTarget`/assertion replacement to `bfs-csr.md`, swap
   `union-find.md`'s second Distractor for `parent[a] = b;`, delete the false ordering
   sentence, then restore the README sentence. This restores the Deck's central grading
   contract.
3. **Fix the `compile_check` tool so `parsons` Distractors are substituted for the reference
   line they replace, and re-run.** Until then the `0 WEAK` result is false assurance for 5
   Cards. Do this before step 2's re-verification.
4. **Fix the seqlock (M2, M3).** Add the writer's release fence to the ordering bullet and
   replace "wait-free only if the writer is slow" with "non-blocking but unbounded". An
   unsound concurrency recipe in an HFT-targeted Deck is the highest-consequence prose
   defect here.
5. **Fix the LSM write-amplification model in `btree-vs-lsm.md` and `amplification.md` (M8).**
   Same sentence, two Cards; the third Card already has it right, so the Topic currently
   teaches two incompatible numbers for its headline quantity.
6. **Fix the four LLVM-pipeline and pre-colouring claims in `09-compilers/codegen` (M9–M12).**
   `graph-colouring.md` ×2, `explain-backend.md`, `allocation-vocabulary.md`. The
   `interview`-tagged rubric is the most costly of these.
7. **Fix the four SSA/dataflow teaching sentences (M13–M15 plus the `dominance.md` numbering
   and back-edge minors).** M13 first: as written it makes the Card's own "classic
   implementation bug" Distractor mathematically correct.
8. **Sweep the remaining majors:** `btree-fanout` (M16, M17 — one rewrite),
   `go-sort-search` (M18), `lower-bound-loop` (M19), `branchless-select` (M20),
   `sorting-networks` AKS (M21), `latency-scale` (M22).
9. **Work the minors topic by topic, starting with `10-databases/storage-and-indexes`** (the
   6/10 Topic, six minors) **then `11-low-latency`** (seven minors across both Topics).
10. **Do the refs pass in one sitting.** Ten refs findings, all mechanical: the 404 in
    `key-normalisation`, the wrong article in `monotonic-deque`, the off-topic LLVM ArrayRef
    and morsels links, and seven Wikipedia-where-a-canonical-paper-exists swaps (Batcher,
    Musser, Fredman & Tarjan, Herlihy, O'Neil, Mohan, Briggs/Boissinot).
11. **Then author the high-priority new Cards, closing genuine absences in the order the
    lanes are weakest:** databases first (`db-latch-crabbing`, `db-hash-aggregation`,
    `db-btree-split`, `db-secondary-index-lookup`, `db-index-nested-loop`), then compilers
    (`compiler-memory-ssa`, `compiler-control-dependence`, `compiler-parallel-copy`,
    `compiler-register-classes`, `compiler-switch-lowering`, `compiler-ssa-renaming`,
    `compiler-range-widening`), then low latency (`chunks-cas-retry-loop`,
    `ll-seqlock-reader`, `ll-struct-layout`, `ll-numa`, `ll-spin-wait`).
12. **Last, address shape.** `01-foundations`, `09-compilers/codegen`,
    `10-databases/execution-and-sketches` and `14-transfer` have no hands-on Card at all;
    `foundations-growth-cost`, `compiler-parallel-copy` and `db-reservoir-sampling` are the
    cheapest first ones. This is a format gap, not a depth problem — nothing in this report
    asks for a single existing Card to be cut or thinned.
