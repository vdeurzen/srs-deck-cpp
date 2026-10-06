---
id: execution-stopped-channel
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, concurrency]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://en.cppreference.com/w/cpp/thread/stop_token
  - https://wg21.link/p2300
requires:
  - execution-environment-queries
---

## How does cancellation actually travel through a sender chain?

---

Downwards as a *request*, upwards as a *completion*.

The request travels through the receiver's environment. Each operation,
when it starts, asks `get_stop_token(get_env(rcvr))` for a token and —
if the work is genuinely interruptible — registers a stop callback on
it. Adaptors forward the query upstream, so a token injected at the top
reaches every leaf without being passed as an argument, and an
operation whose consumer offers no token gets `never_stop_token`, on
which the whole mechanism compiles away to nothing.

The response travels back as a completion: a cancelled operation
finishes with `set_stopped`. That is the part people underestimate.
Cancellation is not an unwind, not an exception and not a kill — the
operation still completes, exactly once, and everything downstream
observes a *stopped* result and unwinds its own way. An in-flight
kernel read is not abandoned; it is told to cancel and then waited for.

Where a stop request comes from is equally ordinary. `when_all` makes
its own `inplace_stop_source` and fires it when one child fails or is
stopped; a timeout is a timer whose expiry calls `request_stop()` on a
source the work's token comes from; an application's shutdown path
owns the source in `main`. Adapting the outcome back into a value is
`stopped_as_optional`, and `upon_stopped(f)` runs a handler on that
channel.
