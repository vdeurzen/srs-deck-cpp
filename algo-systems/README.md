# `algo-systems`

Data structures and algorithms — basics to advanced — aimed squarely at the
three kinds of work that pay for them: **compilers**, **databases**, and
**low-latency systems**. The second Deck authored in this repository
(`decks/algo-systems/`, gitignored — see the end of this file), a sibling of
`decks/cpp-core/` rather than a replacement for any part of it.

`cpp-core` teaches a language. This Deck teaches what to build with it, and
deliberately reaches past C++ where a second syntax makes the idea clearer.

## Layout

```
deck.yaml
topics/<topic-path>/<card-id>.md
```

`topics/03-hashing/hash-tables/robin-hood.md` is a Card in the
`03-hashing/hash-tables` Topic. The Topic is the directory path and nothing
more; no Topic metadata file exists.

## `deck.yaml`

```yaml
id: algo-systems # the namespace every Card Id in this Deck lives under
name: Algorithms & Systems
language: cpp # default highlight.js id; a fence's own info string wins
format: 1
defaults:
  compile:
    compiler: g142 # GCC 14.2 on Compiler Explorer
    std: c++23
    flags: [-Wall, -Wextra]
```

Read `documentation/SPEC.md` §4 for the authoritative grammar and
`decks/cpp-core/README.md` for the per-Kind walkthrough — the two Decks use
the same loader and the same conventions. What follows is only what is
specific to this one.

## Two languages

Examples are in **C++** and **Go**. The choice per Card is deliberate: a
pattern is shown in the language whose semantics make it sharpest, and
several Cards show both so that the pattern — not the syntax — is what gets
remembered.

- `language: cpp` in `deck.yaml` is only the default. A fenced block's own
  info string wins, so a ```` ```go ```` block is highlighted as Go
  (`parseCodeBody`, `deckLanguage` fallback).
- **Go Cards carry no `compile` block.** SPEC §9's compile service builds
  C++ on Compiler Explorer, and there is no Go toolchain in this workspace to
  verify a Harness against, so `seq-go-slice-window` and
  `ordered-go-sort-search` set `compile: null` and are graded by
  whitespace-normalised equality (SPEC §4.5). Each of those Cards says so on
  its own face rather than leaving the reader to wonder.
- Go therefore appears as `basic`, `cloze`, `chunk` and no-compile `code`
  Cards: slices and aliasing, map semantics, `container/heap`'s interface
  dispatch, `sort.Search`, `strings`/`[]byte` conversions, channels versus a
  lock-free ring, sort dispatch costs, and GC-and-leaks as a transfer trap.

## Compile-checked Cards discriminate on **values**, not just on syntax

ADR-0005 makes correctness "compiles cleanly", and SPEC §9 sends
`filters: { execute: false }` — the program is compiled and never run. For an
algorithms Deck that would be nearly useless on its own, since almost any
plausible answer compiles. So every `code`, `parsons` and compile-checked
`chunk` Card here is built the same way:

**the snippet is `constexpr`, and the Harness is `static_assert`s over its
results.** A wrong answer then fails at compile time because the value is
wrong, not because the syntax is. Infinite loops from a wrong update
(`lo = mid` in a binary search) fail too — a non-terminating loop is not a
constant expression, and GCC says so.

All 22 compile-checked Cards were verified locally with
`g++ -std=c++23 -Wall -Wextra -fsyntax-only` (GCC 13.3), assembled exactly as
the app assembles them (reference answers substituted, Harness appended), and
**every Distractor on every `code` Card was confirmed to fail**. Two Cards
were tightened during that pass because a Distractor slipped through:
`ordered-fenwick-tree` (a wrong step that happens to give the right answer at
powers of two — the Harness now probes `prefix(3)` and `prefix(7)`) and
`str-kmp-failure-function` (the three test patterns did not exercise a
two-step border chain; `ababaab` and `aabaaab` now do).

The same trick makes `parsons` Cards meaningful. SPEC §4.8 grades a Card with
a `compile` block by compilation, which for shuffled statements is weak — most
orderings still compile. Here the Harness evaluates the assembled program at
compile time, so an ordering that builds but computes the wrong heap, the
wrong partition or the wrong BFS distances still fails. Two of the five also
use Distractor lines chosen to be *semantically* wrong rather than
syntactically (popping the BFS queue from the back, an inclusive prefix sum),
which the value assertions catch.

## `trace` Cards were run, not reasoned

No code is executed by the app for this Kind, so every expected value is
authored by hand — and a wrong one teaches the wrong thing. All six were
produced by compiling and running an instrumented copy of the snippet under
GCC 13.3 and reading the printed values back. Each Card's explanation names
the compiler.

`trace-vector-growth` deserves the same caveat `cpp-core`'s
`trace-moved-from-state` carries: the **growth factor is
implementation-defined**. Its expected capacities are libstdc++'s doubling;
MSVC would give different numbers, and the standard requires only amortised
O(1). The Card says so.

## References

The convention is `cpp-core`'s, adapted: **every Card cites at least one
primary source** — the original paper where there is one (Tarjan on
union-find, Cytron on SSA, Pugh on skip lists, Flajolet on HyperLogLog),
official documentation where the topic is an artefact rather than a result
(kernel.org, go.dev, abseil.io, the RocksDB wiki, cppreference), and
`algorithmica.org` for hardware-level material. Wikipedia appears only for
classic textbook material with no single canonical paper — the master
theorem, Dijkstra, counting sort.

## The `misconception` tag

`14-transfer/intuition-traps` is this Deck's counterpart to `cpp-core`'s
`08-transfer/go-to-cpp`: eight Cards whose front is a plausible, widely held,
wrong belief, each tagged `misconception` and carrying an `elaborate` prompt
that points the correction back at the reader's own code. They are the beliefs
a competent engineer actually holds — "a list is better for insertion",
"O(1) beats O(log n)", "more threads means more throughput", "a GC cannot
leak".

Five Cards outside that Topic carry the tag for the same reason, following
the precedent `cpp-core` set: `hash-tombstones`, `graph-dijkstra-nonnegative`,
`ll-aba-problem`, `ll-progress-guarantees`, and `seq-go-slice-aliasing`.
Filtering Browse on `misconception` is then "the things I am most likely to be
wrong about", across both Decks.

## What is here

| Topic                                 | Cards | Focus                                                                                                               |
| ------------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------- |
| `01-foundations/cost-models`          | 10    | amortised vs average, geometric growth, the master theorem, the cache and external-memory models, AoS/SoA, branch misprediction, Little's law |
| `02-sequences/arrays-and-buffers`     | 10    | ring buffers, arena alignment, `deque` vs `vector`, invalidation rules, intrusive lists, Go slice aliasing, inline capacity, generational handles |
| `03-hashing/hash-tables`              | 12    | chaining vs open addressing, load factor and probe counts, clustering, Robin Hood, tombstones, Swiss tables, hash quality, Fibonacci mixing, cuckoo, perfect hashing, Go maps |
| `04-ordered/search-trees`             | 13    | balance, B-trees vs red-black, fanout arithmetic, B⁺-trees, skip lists, tries and ART, binary search invariants, Eytzinger layout, Fenwick trees, order statistics |
| `05-priority/heaps-and-queues`        | 9     | array layout, linear build, d-ary and Fibonacci heaps, lazy deletion, monotonic deques, timer wheels, top-k          |
| `06-sorting/sorting-and-selection`    | 10    | introsort, stability, radix, external merge sort, quickselect, pattern defeating, sorting networks, key normalisation |
| `07-graphs/graph-algorithms`          | 10    | representations and CSR, BFS/DFS, topological order, union-find, reverse postorder, Tarjan SCC, shortest-path choice, bitsets |
| `08-strings/text-algorithms`          | 9     | KMP, Aho–Corasick, rolling hashes, suffix arrays, interning, SIMD scanning, DFA lexing, Go strings                   |
| `09-compilers/ssa-and-dataflow`       | 11    | SSA and φ, dominance and the CHK `intersect`, dominance frontiers, worklists and lattices, liveness, SCCP, GVN and hash-consing, natural loops, e-graphs |
| `09-compilers/codegen`                | 7     | instruction selection as tiling, graph colouring, linear scan, SSA destruction, scheduling, and an `explain` walk of the whole back end |
| `10-databases/storage-and-indexes`    | 9     | B⁺-tree vs LSM, compaction, Bloom filters, buffer pools, WAL and group commit, MVCC, slotted pages, columnar encodings |
| `10-databases/execution-and-sketches` | 9     | hash and sort-merge joins, join ordering, vectorised execution, Roaring bitmaps, HyperLogLog, count-min, shuffle vs broadcast |
| `11-low-latency/lock-free`            | 9     | SPSC rings, memory orders, false sharing, seqlocks, ABA, reclamation, progress guarantees, MPMC queues, Go channels  |
| `11-low-latency/latency-and-layout`   | 10    | order books, memory pools, branchless selection, prefetching, tail latency, busy polling, measurement, huge pages    |
| `12-idioms/chunks`                    | 8     | bit iteration, union-find, `lower_bound`, monotonic deque, Bloom double hashing, CSR, cache padding, a Go worker pool |
| `12-idioms/parsons`                   | 5     | sift-down, union-find, Lomuto partition, BFS over CSR, counting sort                                                  |
| `13-tracing/data-structures`          | 6     | vector growth, heap operations, ring wrap-around, the tombstone bug, a monotonic deque, LRU ordering                  |
| `14-transfer/intuition-traps`         | 8     | `misconception`-tagged beliefs, each with an `elaborate` prompt                                                       |

Cards are cross-referenced on purpose: the external-memory model explains
B-tree fanout, which explains LSM read amplification; the branchless argument
in `01-foundations` is spent again in binary search, in sorting networks and
in the order book; union-find appears as a `code` Card, a `chunk`, a
`parsons` and as type unification in the compiler Topic. Seeing the same
mechanism from several angles is the point.

## Validating before pushing

```sh
dart run tools/validate.dart decks/algo-systems
```

Runs the same `DeckLoader` the app does, pure Dart, no Flutter. Add
`--strict` to escalate warnings for CI. As of this writing the Deck loads
with **0 errors and 0 warnings**, strict included.

## `decks/` stays untracked

`/decks/` is gitignored in this repository on purpose (SPEC §11): each Deck is
its own git repository, migrated out by hand once it has a remote. Do not
`git add` anything under `decks/algo-systems/` here.
