---
id: ll-explain-hot-path
kind: explain
version: 2
level: 5
tags: [low-latency, hft, interview]
requires:
  - ll-explain-hot-path-verify
  - ll-explain-hot-path-os
  - ll-explain-hot-path-memory
refs:
  - https://en.algorithmica.org/hpc/
  - https://dl.acm.org/doi/10.1145/2408776.2408794
---
A market-data-to-order path has a 4 µs median but a 60 µs p99.9, and the
first order after a quiet minute takes ~200 µs. Walk through what you
would suspect, how you would confirm each suspicion, and the fix.
---
- [ ] First trust the measurement: an open-loop load generator and a p99.9 read from histograms, so the 60 µs is real and not an artefact of coordinated omission
- [ ] The ~200 µs first order is a cold path: a deep C-state exit plus caches, TLB and predictor filled by other work; confirmed by correlating with idle gaps, fixed by capping C-states and warming the path
- [ ] Spikes from preemption or interrupts show as context switches and IRQ counts on the hot core; fixed by isolating and pinning the core, `nohz_full`, and steering IRQs away
- [ ] Spikes from page faults or allocator slow paths show in `perf` fault counts and allocation tracing; fixed by pre-faulted, `mlock`ed, NUMA-local pools
- [ ] Spikes that coincide with THP compaction (`khugepaged`, compaction stalls in `/proc/vmstat`) are fixed by huge pages reserved at boot and THP set to `madvise` or `never`
