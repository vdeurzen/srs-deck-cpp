---
id: conc-waiting-destructor
kind: cloze
version: 1
level: 1
tags: [concurrency, threads]
requires:
  - conc-forgotten-join
refs:
  - https://en.cppreference.com/w/cpp/thread/jthread
  - https://en.cppreference.com/w/cpp/thread/jthread/~jthread
---

In C++20, which standard type in the blank makes `refresh` wait for
`poll_once` to finish as it returns, with no `join()` call? Its destructor
does the joining, so forgetting to join can no longer end the program in
`std::terminate`.

```cpp
void poll_once() { /* check the queue */ }

void refresh() {
    std::{{c1::jthread}} poller(poll_once);
}
```
