---
id: ll-percentiles-dont-average
kind: basic
version: 1
level: 4
tags: [low-latency, measurement]
requires:
  - ll-tail-latency
refs:
  - https://github.com/HdrHistogram/HdrHistogram
---

## A dashboard computes the hourly p99 by averaging the sixty per-minute p99s. What is wrong with it?

---

**Percentiles cannot be averaged: the result is not the p99 of anything.**
It can understate (one bad minute diluted sixty-fold) or overstate (a
quiet minute's few requests weigh as much as a busy one's). Keep a histogram per interval and merge the histograms, then
read the percentile — and report the max beside it.
