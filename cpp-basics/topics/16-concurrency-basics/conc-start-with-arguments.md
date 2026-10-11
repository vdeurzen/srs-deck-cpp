---
id: conc-start-with-arguments
kind: code
version: 1
level: 1
tags: [concurrency, threads]
requires:
  - conc-thread-shares-memory
input: chips
choices:
  c1: ["fill, 3, 4", "fill(3, 4)", "fill", "&fill, 3"]
compile:
  harness: |
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/thread/thread/thread
  - https://eel.is/c++draft/thread.thread.constr
---

Complete the construction so the new thread runs `fill` with `rows` 3
and `cols` 4.

```cpp
#include <thread>
int grid_size = 0;
void fill(int rows, int cols) { grid_size = rows * cols; }

void start() {
    std::thread worker({{c1::fill, 3, 4}});
    worker.join();
}
```

---

**Pass the callable and its arguments separately.** The new thread then
makes the call `fill(3, 4)` itself. Writing `fill(3, 4)` instead calls
`fill` right here, on the current thread, and hands its `void` result to
the constructor, which does not compile. `fill` alone, or with too few
arguments, is not callable as given, and `std::thread` rejects it. A
lambda works too: `std::thread worker([] { fill(3, 4); });`.
