---
id: execution-bulk
kind: basic
version: 1
level: 4
tags: [execution, async, c++26]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

## What does `bulk(sndr, shape, f)` express, and what decides whether it actually runs in parallel?

---

It expresses a parallel-for as a sender: when the predecessor completes
with values, `f(i, vals...)` is invoked once for each index `i` in
`[0, shape)`, and the whole thing then completes with **the
predecessor's values unchanged** — `bulk` is about effects on shared
data, not about producing a new value.

What it does *not* do is promise concurrency. `bulk` describes work
that *may* be done by several execution agents; how many, and on what,
is entirely the scheduler's business. On a `run_loop` scheduler the
indices run one after another on the blocked thread; on a thread-pool
scheduler they are spread across workers. The same pipeline is
sequential or parallel depending on the context it was started on,
which is the point of keeping the scheduler out of the algorithm.

The consequences for `f` are the usual ones: it may run concurrently
with itself, so it must not race on shared state, and an exception
escaping it completes the operation on the error channel — with the
other indices' completion still waited for.

Against `std::for_each(std::execution::par, ...)`, the difference is
composition: an execution policy is an argument to one algorithm and
blocks the calling thread, while `bulk` is a sender that can be
preceded by `starts_on`, followed by `continues_on`, joined with
`when_all`, and cancelled.
