---
id: threads-trace-join-and-count
kind: trace
version: 1
level: 2
tags: [concurrency, threads, mutex, tracing]
probes:
  1: { before: "true" }
  2: { after: "false" }
  3: { total: "2000" }
requires:
  - threads-thread-destructor-joinable
  - threads-data-race-is-ub
refs:
  - https://en.cppreference.com/w/cpp/thread/jthread/join
  - https://en.cppreference.com/w/cpp/thread/scoped_lock
---

```cpp
int n = 0;
std::mutex m;
void bump() {
  for (int i = 0; i < 1000; ++i) {
    std::scoped_lock lk(m);
    ++n;
  }
}
int main() {
  std::jthread a(bump), b(bump);
  bool before = a.joinable();   // @1
  a.join();
  bool after = a.joinable();    // @2
  b.join();
  int total = n;                // @3
}
```

---

A thread is *joinable* from construction with a function until it is
joined (or detached): `true` at @1 even if `bump` has already finished,
`false` at @2 because `join` consumed it. The count is exact because
the lock serialises every `++n` — without it, two threads writing `n`
would be a data race — and `join` makes each thread's writes
happen-before the read at @3. (Had the reads of `n` been moved before
`b.join()`, they would race.) Verified by running an instrumented copy
under GCC 16.2 (`g++ -std=c++23 -pthread`), including under
ThreadSanitizer.
