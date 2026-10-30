---
id: transfer-goroutines-vs-threads
kind: cloze
version: 3
level: 3
tags: [transfer, misconception, concurrency]
elaborate: Say in one sentence, as to an interviewer, why a pool sized to the core count beats one thread per request.
requires:
  - cpp-essentials/threads-thread-destructor-joinable
refs:
  - https://en.cppreference.com/w/cpp/thread/thread
  - https://man7.org/linux/man-pages/man3/pthread_create.3.html
  - https://en.cppreference.com/w/cpp/thread/jthread
  - https://man7.org/linux/man-pages/man5/proc_sys_kernel.5.html
---

A `std::jthread` is exactly one
{{c1::OS thread}}. Spawn
100k of them for 100k requests and system limits (`threads-max`, a
cgroup's `pids.max`) and scheduling cost stop you long before memory
does: on a 64-bit system each stack is mostly uncommitted address space.
CPU-bound per-request work in C++ is a fixed number of `jthread`s,
about {{c2::one per core}}, draining a task queue.

---

Go's runtime multiplexes many goroutines onto a few OS threads; C++ has
no runtime in between, so each `jthread` is one kernel-scheduled thread
with its own stack.
