# cpp-basics + cpp-core traces (paused Decks, 2026-10-20)

Values verified in /tmp/tr-paused-cpp/ with GCC 16.2 `g++ -std=c++23` (ASan/UBSan); `std::execution` Cards against stdexec. Counts per Card in /tmp/tr-paused-cpp/notes.txt.

types-double-to-int-trace | OK | 3 one-value probes, 3 state changes, no loops
types-short-math-trace | OK | 3 one-value probes, straight-line
types-unsigned-modulo-trace | OK | 3 one-value probes, 6 state changes, 3 values held
fn-overload-pick | OK | 3 calls, each one ranking decision; deciding-property card in closure
fn-recursion-trace | WORKED FIRST | count(3), 2 strings, 6 values held → count(2), one string, 4 held; new fn-recursion-worked (v2)
fn-reference-same-object | OK | 2 one-value probes
class-static-data-member | SHRINK | 3-value probe → 2 (a.number, issued); `number(++issued)` → plain statements (v2)
err-catch-all-trace | OK | 1 probe, one throw
linkage-unnamed-namespace-trace | OK | 2 one-value probes, 4 state changes
fmt-positional-trace | OK | 3 one-value probes, no state
fmt-precision-trace | OK | 3 one-value probes, no state
fmt-spec-trace | OK | 3 one-value probes, no state
raii-scope-exit-order | WORKED FIRST | 8 state changes, within budget; new raii-scope-exit-worked; back trimmed to this run (version kept)
linkage-header-static-trace | OK | 2 one-value probes, 4 state changes
ptr-trace-reseat-vs-alias | OK | 3 probes × 2 values, 5 state changes, fades from an essentials trace
class-member-init-order | OK | 2 probes, 4 events; a rule (declaration order), essentials trace precedes
staticpoly-dispatch-trace | OK | 2 probes × 2 values, straight-line; worked dispatch example in closure
variadic-fold-order | OK | 2 one-value probes, 3-element pack
variadic-sizeof-pack | OK | 3 one-value probes, compile-time count
containers-map-subscript-inserts | OK | 2 probes (1 and 2 values), one insertion
smart-pointers-trace-weak-count | OK | 3 probes × 2 values, 3 owner changes; worked shared_ptr example in closure
strings-sticky-manipulators | OK | 2 one-value probes
exceptions-noexcept-operator | OK | 2 probes, unevaluated operands
exceptions-unwinding-order | SHRINK | 9 state changes (two Guards in step) → 7 (one Guard); worked throw example in closure (v2)
trace-awaiter-hook-order | WORKED FIRST | within budget; new trace-awaiter-hook-order-worked; redundant hook comment dropped (version kept)
trace-coroutine-lazy-generator | WORKED FIRST | 4 probes, 3 values, 14-line struct → 3 probes ≤ 2 values, struct in prose; new worked (v2)
trace-coroutine-hook-order | WORKED FIRST | within budget; new trace-coroutine-hook-order-worked (eager input) (version kept)
trace-auto-deduction | OK | 2 probes × 2 values
trace-copy-vs-reference | OK | 3 probes × 2 values, 3 assignments
trace-moved-from-state | OK | 2 probes, 3 values
execution-trace-when-all-stop | WORKED FIRST | 3-value probe, 3 children → 2 values, 2 children; new worked with children swapped (v2)
execution-trace-continuation-thread | WORKED FIRST | 4 probes + `out` arithmetic → 3 probes, no `out`; new worked (v2)
threads-trace-join-and-count | OK | 3 one-value probes; the 2×1000 count is read by rule, not simulated
