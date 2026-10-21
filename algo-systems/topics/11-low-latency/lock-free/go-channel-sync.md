---
id: ll-go-channel-sync
kind: cloze
version: 2
level: 3
tags: [concurrency, memory-model, queues]
requires:
  - ll-go-blocking-basics
  - cpp-essentials/atomics-synchronizes-with
elaborate: Say what a producer must not do with an object after pushing a pointer to it, and why the queue cannot catch it.
refs:
  - https://eel.is/c++draft/thread.mutex.requirements.mutex.general
  - https://en.cppreference.com/w/cpp/atomic/memory_order
---

In a `std::mutex`-protected queue, the consumer's `lock()`
{{c1::synchronizes with::a happens-before building block}} the
producer's earlier `unlock()`. So everything the producer wrote before
unlocking is visible once the consumer holds the lock, which is why a
pointer can travel through the queue with no extra fences. A lock-free
queue gets the same guarantee from a
{{c2::release store::an atomic operation and its order}} that publishes
the slot, paired with the consumer's acquire load.

---

The mutex is the fence: unlock is a release, lock an acquire. After the
push the producer must not touch the object again; ownership moved.
