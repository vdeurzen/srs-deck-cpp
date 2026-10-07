---
id: seq-ring-count-field
kind: basic
version: 1
level: 3
tags: [ring-buffer, low-latency, concurrency]
requires:
  - seq-ring-buffer-full-vs-empty
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.cppreference.com/w/cpp/thread/hardware_destructive_interference_size
---

## A single-producer/single-consumer ring adds a `count` field so it can tell full from empty. Why do low-latency queues refuse that fix?

---

**Both cores write `count`, so its cache line bounces on every operation.**
With only `head` and `tail`, each counter has one writer. A shared count
also needs an atomic read-modify-write where plain release stores
sufficed.
