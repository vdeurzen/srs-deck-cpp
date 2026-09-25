---
id: foundations-littles-law
kind: basic
version: 1
level: 4
tags: [cost-model, throughput, low-latency, databases]
refs:
  - https://en.wikipedia.org/wiki/Little%27s_law
  - https://en.wikipedia.org/wiki/Amdahl%27s_law
---

## State Little's law and use it to explain why a queue that is 90 % utilised has terrible latency even though it is "not full".

---

**L = λ·W**: in any stable system, the average number of items in flight
equals the arrival rate times the average time each spends inside. It
needs no assumption about the distribution of arrivals or service times —
only that the system is stable (nothing accumulates forever).

Read three ways, it is a design tool:

- **Sizing**: 200k messages/s × 50 µs of processing = 10 messages in
  flight on average. That is your queue depth, your buffer count, your
  concurrency.
- **Latency from occupancy**: W = L/λ. If a queue is observed holding
  1000 entries at 200k/s, entries are waiting 5 ms — you can compute
  latency from a depth gauge, without timestamping anything.
- **Capacity**: to raise throughput you must raise in-flight work or cut
  service time; there is no third option.

**Utilisation is the trap.** For a single queue with variable arrivals,
waiting time scales roughly as `ρ/(1−ρ)` where `ρ` is utilisation: at
50 % you wait about one service time, at 90 % about nine, at 99 % about
ninety-nine. The knee is not near 100 %, it is around 70–80 %, so a
system sized to be "nearly saturated" is a system whose tail latency is
dominated by queueing rather than by work. Low-latency systems run their
hot path deliberately under-utilised for exactly this reason, and
databases admission-control long queries to keep `ρ` off the knee.

The companion bound is **Amdahl's law**: a workload with a serial
fraction `s` cannot go faster than `1/s` no matter how many cores you
add — 5 % serial caps you at 20×. In practice the serial fraction is
usually a shared mutable structure (a global lock, an allocator, a
counter on one cache line), which is why the scaling fix is almost always
partitioning the data rather than adding threads.
