---
id: ll-coordinated-omission
kind: basic
version: 1
level: 5
tags: [low-latency, measurement, benchmarking]
requires:
  - ll-tail-latency
refs:
  - https://github.com/HdrHistogram/HdrHistogram
  - https://www.youtube.com/watch?v=lJ8ydIuPFeU
---

## A load generator sends a request, waits for the reply, then sends the next — 1000 per second. The server stalls for one second. How many slow samples are recorded?

---

**One: about 1000 requests that should have been sent during the stall
never were.** This is *coordinated omission*: the tester backs off exactly
when the system is slow, so p99 looks far better than reality. Send on a
fixed schedule and measure from each request's *intended* send time.
