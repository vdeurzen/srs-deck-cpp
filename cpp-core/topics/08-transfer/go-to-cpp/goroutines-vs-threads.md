---
id: transfer-goroutines-vs-threads
kind: cloze
version: 3
level: 3
tags: [transfer, misconception, concurrency]
elaborate: Which of your Go services start one goroutine per request, and what would bound the number of tasks in flight once ported to C++?
requires:
  - cpp-essentials/threads-thread-destructor-joinable
refs:
  - https://en.cppreference.com/w/cpp/thread/thread
  - https://man7.org/linux/man-pages/man3/pthread_create.3.html
  - https://en.cppreference.com/w/cpp/thread/jthread
  - https://man7.org/linux/man-pages/man5/proc_sys_kernel.5.html
---

A goroutine starts with a stack of a few KiB, and the Go runtime
schedules millions of them itself. A `std::jthread` is exactly one
{{c1::OS thread}}, with no runtime in between to multiplex it. Spawn
100k of them for 100k requests and system limits (`threads-max`, a
cgroup's `pids.max`) and scheduling cost stop you long before memory
does: on a 64-bit system each stack is mostly uncommitted address space.
Goroutine-style CPU-bound work in C++ is a fixed number of `jthread`s,
about {{c2::one per core}}, draining a task queue.
