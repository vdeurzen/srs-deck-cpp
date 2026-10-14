---
id: ll-explain-latency-measurement
kind: explain
version: 1
level: 5
tags: [low-latency, hft, measurement]
requires:
  - ll-wire-timestamps
  - ll-tsc-invariant
  - ll-percentiles-dont-average
refs:
  - https://www.kernel.org/doc/html/latest/networking/timestamping.html
  - https://www.felixcloutier.com/x86/rdtscp
  - https://github.com/HdrHistogram/HdrHistogram
---
Explain how you would instrument a trading system to report the
tick-to-trade latency of its hot path in production, from the timestamps
to the number on the dashboard.
---
- [ ] In-process stamps are fenced (`lfence; rdtsc` at the start, `rdtscp; lfence` at the end), because out-of-order execution otherwise moves work across the reads
- [ ] Ticks become nanoseconds only on an invariant TSC with a calibrated rate, because otherwise the tick rate follows frequency and C-states
- [ ] Both stamps of one interval come from the same pinned core (or TSCs checked to agree), because invariance fixes the rate, not the offset between sockets' counters
- [ ] Ingress and egress are stamped by the NIC's hardware clock or a wire tap, because a user-space stamp hides time queued in the NIC
- [ ] Intervals are combined by merging per-interval histograms and the report reads p99.9 and max from them, because percentiles cannot be averaged and the mean hides the slow events
