---
id: ll-busy-polling
kind: basic
version: 1
level: 5
tags: [low-latency, hft, os, networking]
refs:
  - https://www.kernel.org/doc/html/latest/networking/napi.html
  - https://doc.dpdk.org/guides/prog_guide/overview.html
---

## Why does a latency-critical path burn a whole core spinning, and what else has to be configured for that to pay off?

---

Because the alternative costs more than the CPU does. Blocking means a
syscall to sleep, an interrupt to wake, a scheduler decision, and a
context switch — several microseconds, with a long tail, and the woken
thread starts with cold caches and a cold branch predictor. Spinning on
a memory location or a NIC descriptor ring keeps the core hot, the
code in L1i, and the reaction time in the hundreds of nanoseconds. On
a machine with dozens of cores, dedicating one to the hot path is a
cheap trade.

Spinning alone is not enough; the surrounding configuration is where
the actual latency comes from:

- **Isolate the core** (`isolcpus`, `nohz_full`, `irqaffinity`) so the
  scheduler puts nothing else there, the timer tick stops, and
  interrupts are steered to other cores. Then **pin** the thread.
- **NUMA-local everything**: the thread, its memory, and the NIC on the
  same socket. A cross-socket access costs more than the work.
- **Kernel bypass** for the network path (DPDK, Solarflare's
  Onload/ef_vi, io_uring with `IORING_SETUP_SQPOLL` as a lighter
  option): map the NIC rings into user space and poll them, removing
  the syscall, the interrupt and the copy. This is where the
  microseconds actually are.
- **Pre-fault and lock memory** (`mlockall`), disable swap, use huge
  pages, and avoid page faults on the hot path.
- **Disable frequency scaling and deep C-states** — waking from C6
  takes tens to over a hundred microseconds, and a core that has been idle is slow for
  its first work.
- **Warm the path**: run dummy messages through the same code
  periodically so caches, branch predictors and the TLB stay hot. A
  path that fires once a minute is a cold path.

The costs are real and worth stating: a spinning core is 100 %
utilised and burns power, it cannot be shared, hyperthread siblings
suffer, and observability gets harder (the usual tools assume
blocking). A hybrid — spin for N microseconds, then fall back to
blocking — is the right default for anything that is not the innermost
path.
