---
id: threads-explain-worker-shutdown
kind: explain
version: 2
level: 3
tags: [concurrency, threads, condition-variable, design]
elaborate: Say why the worker should run each job only after releasing the lock, and what would stall if it ran the job while holding it.
requires:
  - parsons-jthread-stop-token
  - threads-trace-join-and-count
  - cpp-essentials/threads-chunk-cv-wait
  - cpp-essentials/conc-condition-variable-intro
  - threads-owner-destroys-waiting-worker
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable_any/wait
  - https://en.cppreference.com/w/cpp/thread/jthread
---
A teammate needs a worker thread that consumes jobs from a shared queue
and stops cleanly when its owner is destroyed. Explain to them how you
would build it.
---
- [ ] The worker is a `std::jthread` whose function takes a `std::stop_token`; its destructor requests stop, then joins
- [ ] Producer and consumer touch the queue only with the mutex held; unguarded access is a data race
- [ ] The consumer waits on a condition variable with a `unique_lock` and the predicate "queue not empty"
- [ ] The producer pushes under the lock, then calls `notify_one()` to wake the waiting consumer
- [ ] The wait must also end on a stop request: `condition_variable_any::wait` takes the stop token with the predicate
