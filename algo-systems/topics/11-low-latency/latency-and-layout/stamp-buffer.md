---
id: ll-stamp-buffer
kind: basic
version: 1
level: 4
tags: [low-latency, hft, measurement]
requires:
  - ll-measurement
  - ll-memory-pools
refs:
  - https://hdrhistogram.github.io/HdrHistogram/JavaDoc/org/HdrHistogram/Recorder.html
  - https://docs.kernel.org/trace/ring-buffer-design.html
elaborate: Your stamp buffer fills faster than the reporting thread drains it. Would you rather drop stamps or block, and how would you know you dropped them?
---

## The hot thread reads the TSC as each order arrives and leaves. A colleague logs every interval right there: `log.info("t2t {} ns", to_ns(t1 - t0));`. What should `log.info` be replaced by?

---

**A store of the raw stamps into memory allocated before trading starts.**
Logging formats, may allocate, and may take a lock or make a `write`
syscall, all on the hot thread, lengthening the very latency it reports.
The store costs a few ns; another thread turns the stamps into
histograms.
