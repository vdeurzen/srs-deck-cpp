---
id: heap-monotonic-deque-ring
kind: basic
version: 1
level: 4
requires:
  - heap-monotonic-deque
  - seq-ring-buffer-mask
tags: [queues, sliding-window, low-latency]
refs:
  - https://cp-algorithms.com/data_structures/stack_queue_modification.html
  - https://en.cppreference.com/w/cpp/container/deque
---

## On a hot path, a sliding-window maximum over windows of w ticks replaces `std::deque` with a fixed ring of w slots. What step order keeps that ring from overflowing?

---

**Evict the expired front before pushing; then every stored index is in-window: at most w.**

Push first, as the usual snippet does, and a strictly decreasing run
briefly holds w + 1 indices. Evicting first, a power-of-two ring needs no
allocation and no `std::deque` block map; storing indices keeps the
window test pure arithmetic.
