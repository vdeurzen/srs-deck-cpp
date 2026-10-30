---
id: ll-explain-hot-path
kind: explain
version: 3
level: 5
tags: [low-latency, hft, interview]
requires:
  - ll-explain-hot-path-verify
  - ll-explain-hot-path-os
  - ll-explain-hot-path-memory
refs:
  - https://en.algorithmica.org/hpc/
  - https://dl.acm.org/doi/10.1145/2408776.2408794
elaborate: The p99.9 spikes persist after every fix here. What would you measure next, and on which core?
---
A market-data-to-order path has a 4 µs median but a 60 µs p99.9, and the
first order after a quiet minute takes ~200 µs. An interviewer asks what
most likely causes each of these, and how you would remove it. Answer
aloud.
---
- [ ] First trust the numbers: open-loop load and histogram percentiles rule out coordinated omission behind the 60 µs
- [ ] The ~200 µs first order after quiet is a deep C-state exit: cap C-states and keep the thread busy-polling
- [ ] That order also finds caches, TLB and predictor cold, so warm the path with periodic dummy messages
- [ ] Spikes from preemption, the timer tick or interrupts go with an isolated, pinned core, `nohz_full` and IRQs steered away
- [ ] Spikes from page faults, allocator slow paths or THP compaction go with pre-faulted, `mlock`ed pools and boot-reserved huge pages
