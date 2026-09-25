---
id: ll-measurement
kind: basic
version: 1
level: 4
tags: [low-latency, measurement, benchmarking]
refs:
  - https://en.wikipedia.org/wiki/Time_Stamp_Counter
  - https://github.com/google/benchmark/blob/main/docs/user_guide.md
---

## You want to time a 50 ns operation. What do you use, and what are the four ways the measurement lies?

---

Use `rdtsc`/`rdtscp` (or `std::chrono::steady_clock`, which on Linux is
a vDSO read of the same counter, costing ~20 ns and needing no
privileges). The TSC is **invariant** on modern x86 — constant rate
regardless of frequency scaling and C-states — so it is a genuine
clock, but it counts *reference cycles*, not core cycles, so it does
not tell you how many instructions retired.

The four lies:

1. **The measurement costs as much as the thing.** At ~20–30 cycles
   per read, timing a 50 ns operation adds double-digit percent. Time a
   **loop** of N iterations and divide, or use hardware counters. And
   subtract a measured empty-loop baseline.
2. **The compiler deletes your benchmark.** With no observable effect,
   the loop body is dead code. Defeat it with
   `benchmark::DoNotOptimize`, an empty `asm volatile` with the value
   as an input operand, or by consuming the result — and check the
   assembly, because a benchmark that got optimised away reports
   impossible numbers.
3. **Reordering.** `rdtsc` is not serialising: the CPU can move loads
   and stores across it. `rdtscp` plus `lfence` (or `__rdtscp` with a
   compiler barrier) pins it, at the price of some of the overhead
   you were trying to measure.
4. **The setup is not the system.** A microbenchmark runs with
   everything in L1, the branch predictor trained on one path, no
   competing traffic and no TLB pressure — all things the real path
   does not have. Code that wins a microbenchmark by inlining a table
   can lose in production by evicting something else.

The habits that follow: report a **distribution** (median, p99, max)
over many runs rather than a mean, pin the thread and fix the
frequency while measuring, interleave A/B variants in the same process
to cancel drift, and validate any microbenchmark result against an
end-to-end measurement before believing it. For understanding *why*
something is slow, `perf stat` (cycles, instructions, cache misses,
branch misses) and `perf record` tell you more than any timer.
