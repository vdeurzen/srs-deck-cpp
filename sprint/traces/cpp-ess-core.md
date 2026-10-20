# cpp-essentials core traces (verified with g++ 16.2, -std=c++23, ASan/UBSan; atomics under TSan)

layout-offsets-trace | SHRINK | 4 probes → 3: dropped the qty offset probe; price (8), side (18), size (24) kept. v2
raii-ctor-throw-unwinds-members | OK | one run, 2 probes, ~7 trail events; within budget
ptr-temporary-full-expression | OK | one run, 3 probes, 5 trail events
types-signed-unsigned-trace | OK | 3 one-value probes, no loops
class-const-ref-not-immutable | OK | 3 one-value probes, one aliasing call
virtual-dispatch-dynamic-type | OK | 2 one-value probes, straight-line
virtual-slicing | OK | 2 one-value probes, one element each container
virtual-call-in-constructor | OK | 2 probes, 4 log events
lambda-capture-trace | OK | 2 probes, 3 values, straight-line
variadic-expansion-placement | OK | 2 one-value probes, 3-element pack
strings-string-view-not-null-terminated | OK | 2 one-value probes, no loops
exceptions-catch-by-value-slices | OK | 2 one-value probes, two try blocks
exceptions-noexcept-operator | OK | 2 probes, unevaluated operands, nothing to simulate
exceptions-which-guarantee | OK | 4-element input, 3 iterations before throw, 2 probes
trace-order-of-initialisation | OK | 1 probe, 3 events
trace-temporaries-in-range-for | OK | 3 iterations, 2 probes, ~7 trail events
atomics-trace-message-passing | OK | 2 one-value probes; reasoning about ordering, not bookkeeping
atomics-trace-relaxed-counter | OK | 2 one-value probes; loop count is read off, not simulated
