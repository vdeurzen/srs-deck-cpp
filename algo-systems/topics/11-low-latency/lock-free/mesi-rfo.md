---
id: ll-mesi-rfo
kind: basic
version: 1
level: 4
tags: [low-latency, cache-coherence, memory-hierarchy, concurrency]
requires:
  - ll-mesi-states
refs:
  - http://www.rdrop.com/users/paulmck/scalability/paper/whymb.2010.07.23a.pdf
  - https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html
---

## Under MESI, cores A and B both hold a cache line in state Shared. What must A do before its store to that line can complete?

---

**A read-for-ownership (RFO): invalidate B's copy, then wait for B's
acknowledgement.** Only then is A's copy the sole one and writable. The
round trip crosses cores (tens of ns), and B's next read misses and pulls
the line back: the mechanism behind false sharing and contended counters.
