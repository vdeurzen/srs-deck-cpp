---
id: ll-mesi-states
kind: cloze
version: 1
level: 4
tags: [low-latency, cache-coherence, memory-hierarchy]
requires:
  - foundations-latency-line-bounce
refs:
  - http://www.rdrop.com/users/paulmck/scalability/paper/whymb.2010.07.23a.pdf
  - https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html
elaborate: Which data in your hot loop is written by one thread and never read by another, and what does each write to it cost?
---

Under MESI, a core reads a cache line that no other cache holds, then
writes it. After the read its copy is in state {{c1::Exclusive::a state}},
so the write sends {{c2::no::how many}} messages to other cores before it
completes.

---

That state means "the only copy, still clean": the core may change it
without asking anyone, and the line silently becomes Modified. This is why
writing thread-private data is cheap however hot it is. Intel (MESIF) and
AMD (MOESI) extend the protocol without changing this rule.
