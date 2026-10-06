---
id: threads-explain-worker-shutdown
kind: explain
version: 1
level: 3
tags: [concurrency, threads, condition-variable, design]
requires:
  - threads-chunk-cv-wait
  - threads-trace-join-and-count
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable_any/wait
  - https://en.cppreference.com/w/cpp/thread/jthread
---
Design a worker thread that consumes jobs from a shared queue and shuts
down cleanly when its owner goes out of scope. Name each piece and the
bug it prevents.
---
- [ ] The worker is a `std::jthread` taking a `std::stop_token`, so the owner's destructor requests stop and joins; a `std::thread` would terminate or need manual plumbing
- [ ] The queue is touched only with the mutex held, by producer and consumer alike — a plain `std::deque` accessed from two threads is a data race, not "a little stale"
- [ ] The consumer waits with `condition_variable_any::wait(lk, stoken, pred)` on a `unique_lock`, predicate "queue not empty", so spurious wake-ups, early notifies and a stop request all resolve correctly
- [ ] The producer pushes under the lock and then calls `notify_one()`; notifying with nobody waiting is harmless because the waiter re-checks the predicate
- [ ] The job is popped under the lock and *run after the lock is released*, so unknown code never executes while holding the mutex and the producer is not blocked for the job's duration
