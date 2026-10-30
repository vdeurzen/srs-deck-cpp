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
elaborate: The stamps come from two hosts, the feed handler's and the gateway's. What would you need before subtracting them?
---
An interviewer asks how you would instrument a trading system to report
the tick-to-trade latency of its hot path in production, from the
timestamps to the number on the dashboard. Answer aloud.
---
- [ ] In-process stamps are fenced (`lfence; rdtsc`, then `rdtscp; lfence`), or out-of-order execution moves work across them
- [ ] Ticks convert to nanoseconds only on an invariant TSC with a calibrated rate; otherwise the rate follows frequency
- [ ] Both stamps of an interval come from one pinned core, since invariance fixes the rate, not cross-socket offsets
- [ ] Ingress and egress are stamped by the NIC's hardware clock or a wire tap, since user-space stamps miss NIC queueing
- [ ] Per-interval histograms are merged and the dashboard reads p99.9 and max, since percentiles cannot be averaged
