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
- [ ] Problem: a queue that pops by erasing its front shifts every element, O(n) per pop
- [ ] Mechanism: head and tail indices advance through a fixed array and wrap to 0, so elements never move
- [ ] Example: with 8 slots, sequence number 9 lands in slot 9 & 7, which is 1
- [ ] Cost: with wrapped indices one slot always stays empty, so a 16-slot ring holds 15
- [ ] Contrast: counters that only increase make tail − head the size, so all N slots are usable
