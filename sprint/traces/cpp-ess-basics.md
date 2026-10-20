# cpp-essentials / basics: trace budget review (2026-10-19)

Values for all 27 Cards re-verified by one instrumented program, GCC 16.2.0 `g++ -std=c++23 -pthread` (/tmp/tr-cpp-basics/a.cpp). None is an algorithm trace, so no WORKED FIRST.

ptr-trace-arithmetic | OK | 3 probes, ≤2 values, no loop; added compiler note (wording only)
ptr-trace-reference-assign | SHRINK | 4 probes → 3; dropped `r += 1`, kept rebind and `&r` probes; v1 → v2
ptr-trace-write-through | OK | 3 probes, 2 values each, ~6 state changes; added compiler note (wording only)
class-const-object-call | OK | 2 probes, 2 calls, one string
class-init-list-vs-body | OK | 2 probes, 3 events total
life-copy-which-runs | OK | 3 probes, 3 special-member calls; counters are the lesson, not machinery
life-ctor-dtor-count | OK | 3 probes, 2-iteration loop, ~9 counter changes; borderline, ~45 s
life-new-outlives-scope | OK | 3 probes, one counter
life-reverse-order-trace | OK | 2 probes, 7 events; ~60 s
life-shared-ptr-owners | OK | 3 probes, 2 values each, 3 owner changes
life-temporary-full-expression | OK | 3 probes, 2 values each
life-unique-ptr-owns-trace | OK | 2 probes, one counter
vc-trace-extended-temporary | SHRINK | 4 probes, two extended temporaries → 3 probes, one extended in a block; v1 → v2
virtual-construct-order | OK | 2 probes, 4 events
virtual-dispatch-which-runs | OK | 3 probes, one value each
virtual-slice-parameter | OK | 2 probes, one value each
tmpl-instantiation-statics | SHRINK | 5 calls/probes, three Ts → 3 calls (int, char, int); v1 → v2
iter-at-checks-bounds | OK | 1 probe, 2 values
iter-reserve-keeps-buffer | OK | 2 probes, 3 push_backs
stdalgo-capture-ref-vs-copy | OK | 2 probes, 2 calls
stdalgo-remove-if-keeps-size | OK | 2 probes, 4-element input
err-first-matching-handler | OK | 1 probe, one throw
err-throw-jumps-to-catch | OK | 1 probe, 2 values, 2 calls
err-unwind-runs-destructors | OK | 2 probes, 6 events
ub-unsigned-countdown-trace | OK | 2 probes; 10 is the cap, read by rule (`i >= 0` always true), not simulated
conc-join-waits-trace | OK | 2 probes, 4-iteration sum, one value each
conc-lost-update-trace | OK | 2 probes, 6 written-out steps
