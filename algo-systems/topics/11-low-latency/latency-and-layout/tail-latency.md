---
id: ll-tail-latency
kind: basic
version: 1
level: 4
tags: [low-latency, measurement, distributed]
requires:
  - ll-measurement
refs:
  - https://dl.acm.org/doi/10.1145/2408776.2408794
  - https://github.com/HdrHistogram/HdrHistogram
---

## Why do low-latency teams quote p99.9 instead of the mean, and what is coordinated omission?

---

Because the mean is dominated by the common case and the business is
dominated by the bad one. Two systems with identical means differ
entirely if one's p99.9 is 2× the mean and the other's is 200×. And in
a fan-out service, **the tail becomes the median**: if a request
touches 100 shards in parallel and each has a 1 % chance of being slow,
about 63 % of requests hit at least one slow shard, so the *user's*
typical latency is the shard's p99. That is the central argument of
"The Tail at Scale", and it is why tail work matters even when
averages look fine.

Where tails come from, roughly in order of how often they are the
culprit: queueing at high utilisation (the `ρ/(1−ρ)` knee), garbage
collection or allocator slow paths, page faults and TLB misses,
context switches and scheduler preemption, lock convoys, interrupt
handling on the wrong core, CPU frequency and thermal transitions, and
the occasional cache-cold code path.

**Coordinated omission** is the measurement bug that hides all of it.
A load generator that sends a request, *waits for the response*, and
then sends the next one stops sending during a stall — so a 1 s pause
produces one slow sample instead of the thousand requests that should
have arrived during it. The reported p99 can be an order of magnitude
better than reality. The fixes: drive load at a fixed **schedule**
rather than in a closed loop, and measure each request's latency from
its *intended* send time; or use a tool that corrects for it (the
`hdrhistogram` family has explicit support).

Two more measurement rules. **Record a histogram, not an average** —
percentiles cannot be averaged across intervals or across machines, so
aggregating "p99 per minute" into "p99 per hour" is meaningless;
merge the histograms instead. And **percentiles of percentiles lie**:
report the max as well, since for a trading path the worst case *is*
the requirement.
