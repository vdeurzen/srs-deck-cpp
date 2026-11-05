---
id: seq-explain-ring-buffer
kind: explain
version: 1
level: 3
tags: [ring-buffer, queues]
requires:
  - linear-queue-ring
  - seq-ring-waste-one-slot
  - seq-ring-buffer-full-vs-empty
  - seq-ring-buffer-mask
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.wikipedia.org/wiki/Circular_buffer
elaborate: Where would a fixed-capacity queue fit in a system you know, and what should happen when it fills?
---
An interviewer for a low-latency team asks you to explain the ring
buffer. Answer aloud.
---
- [ ] A queue that pops by erasing its front shifts every element, O(n) per pop
- [ ] Head and tail indices advance through a fixed array and wrap to 0, so elements never move
- [ ] A power-of-two capacity lets a mask, `i & (N - 1)`, do the wrap
- [ ] With wrapped indices one slot must stay empty to tell full from empty, so a 16-slot ring holds 15
- [ ] Head and tail counters that only increase make tail − head the size, so all N slots are usable
