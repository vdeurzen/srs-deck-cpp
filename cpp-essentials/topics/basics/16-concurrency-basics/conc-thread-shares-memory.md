---
id: conc-thread-shares-memory
kind: basic
version: 1
level: 1
tags: [concurrency, threads]
requires:
  - io-cout-insertion
elaborate: Say how this compares with two goroutines touching one package-level variable in Go, and what both languages then require of you.
refs:
  - https://en.cppreference.com/w/cpp/thread/thread
  - https://eel.is/c++draft/intro.multithread
---

```cpp
int score = 1;                       // a global
void bonus() { score += 10; }

int main() {
    int local = 5;
    std::thread worker(bonus);
    worker.join();
    std::cout << score + local;
}
```

## `std::thread worker(bonus);` starts `bonus` on a new thread, and `worker.join();` waits for it to return. What does this program print?

---

**16: `bonus` changed the one global `score` that `main` then reads.**

A thread is another flow of execution inside the same program. Each
thread has its own stack for its locals, but globals and heap objects
are one set, shared by every thread. No copy of `score` is made for
`worker`.
