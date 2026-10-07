---
id: ll-kernel-bypass
kind: basic
version: 1
level: 5
tags: [low-latency, hft, os, networking]
requires:
  - ll-busy-polling
refs:
  - https://doc.dpdk.org/guides/prog_guide/overview.html
  - https://man7.org/linux/man-pages/man2/io_uring_setup.2.html
---

## A spinning thread calls `recv()` on a socket in a loop. Kernel bypass (DPDK, ef_vi) maps the NIC's rings into user space instead. Which costs disappear from each packet?

---

**The syscall, the interrupt, and the kernel-to-user copy.** The thread
polls the NIC's descriptor ring directly in its own memory; the kernel
network stack is not on the path at all. `io_uring` with `SQPOLL` is the
lighter middle ground: a kernel thread polls submissions, so no syscall.
