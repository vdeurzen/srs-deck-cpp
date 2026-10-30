---
id: ll-explain-hot-path-os
kind: explain
version: 1
level: 5
tags: [low-latency, hft, os]
requires:
  - ll-core-isolation
  - ll-c-states
  - ll-warm-path
refs:
  - https://www.kernel.org/doc/html/latest/admin-guide/kernel-parameters.html
  - https://www.kernel.org/doc/html/latest/admin-guide/pm/intel_idle.html
elaborate: Busy-polling burns a whole core. When would you accept blocking instead?
---
An interviewer asks how you would configure the core a hot-path thread
runs on, so that the operating system and the hardware add nothing to
its latency. Answer aloud.
---
- [ ] The thread busy-polls instead of blocking, because a scheduler wake-up costs microseconds and starts cold
- [ ] The core is isolated (`isolcpus` or cpusets) and the thread pinned to it, so no other task is scheduled there
- [ ] `nohz_full` stops the timer tick and `irqaffinity` steers device interrupts to other cores, removing the remaining periodic hiccups
- [ ] Deep C-states are capped, because a C6 exit costs ~85–130 µs on the first event after idling
- [ ] The path is kept warm with periodic dummy messages, since a rarely run path finds caches, TLB and predictor cold
