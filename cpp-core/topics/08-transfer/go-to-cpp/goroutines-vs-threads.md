---
id: transfer-goroutines-vs-threads
kind: cloze
version: 1
level: 3
tags: [transfer, misconception, concurrency]
elaborate: If std::thread is too heavyweight to spawn one per task the way you would a goroutine, what building block does C++ actually offer for that pattern instead?
refs:
  - https://en.cppreference.com/w/cpp/thread/thread
  - https://en.cppreference.com/w/cpp/thread/jthread
---

A goroutine starts at a few kilobytes of stack that the Go runtime grows
and shrinks as needed, and the runtime multiplexes potentially millions
of goroutines over a small pool of OS threads — spawning one per small
task is the idiomatic Go style. `std::thread` (and `std::jthread`) are
not that: each one is {{c1::a 1:1 wrapper around one OS thread::no
runtime multiplexing — the operating system schedules exactly this
thread}}, typically reserving a stack {{c2::on the order of a megabyte,
not a few kilobytes::the default OS thread stack size, orders of
magnitude larger than a goroutine's initial stack}}, and creating one is
a real system call, not a cheap runtime bookkeeping operation. Spawning
one `std::jthread` per lightweight task the way Go spawns goroutines
{{c3::exhausts memory and OS scheduling capacity long before a
comparable goroutine count would::thousands of threads is already
heavy; hundreds of thousands is not viable at all}} — getting
goroutine-like cheap concurrency in C++ means a thread pool, a task
queue, or a coroutine-based scheduler layered on top of a small, fixed
number of `std::jthread`s, not one thread per task.
