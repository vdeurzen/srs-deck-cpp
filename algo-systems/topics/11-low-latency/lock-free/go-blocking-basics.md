---
id: ll-go-blocking-basics
kind: cloze
version: 2
level: 1
tags: [concurrency, blocking, queues]
requires:
  - cpp-essentials/conc-condition-variable-intro
elaborate: Say in one sentence, as to an interviewer, which thread is responsible for releasing each of these two waits in a worker pool you have built.
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable/wait
  - https://en.cppreference.com/w/cpp/thread/latch
---

A consumer blocked in `cv.wait(lk, pred)` wakes for good only when
{{c1::another thread makes `pred` true under the mutex and notifies::who must act}}.
A `std::latch done(n)` (C++20, a one-shot counter) has `count_down()`
lower the count, and `done.wait()` blocks until {{c2::the count reaches zero}}.

---

Both are blocking points, and every shutdown bug in this topic is one of
them never being released: a queue nobody closes, a notify that changes
no state, a latch whose count never reaches zero.
