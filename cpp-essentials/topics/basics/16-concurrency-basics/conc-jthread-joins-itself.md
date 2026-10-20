---
id: conc-jthread-joins-itself
kind: basic
version: 1
level: 1
tags: [concurrency, threads, lifetime]
requires:
  - conc-forgotten-join
refs:
  - https://en.cppreference.com/w/cpp/thread/jthread
  - https://en.cppreference.com/w/cpp/thread/jthread/~jthread
elaborate: Say when a destructor that waits could itself be a problem, for example on a thread whose function never returns.
---

`std::jthread` (C++20, `<thread>`) is started like a `std::thread`.

```cpp
void index_files() { /* walk the disk */ }

void rebuild() {
    std::jthread indexer(index_files);
}
```

## `rebuild` never calls `join()`. What happens as it returns?

---

**`indexer`'s destructor joins: `rebuild` waits until `index_files` returns.**

A joinable `std::thread` would call `std::terminate` here.
`std::jthread`'s destructor instead asks the thread to stop, then calls
`join()`, so a forgotten join can no longer end the program.
