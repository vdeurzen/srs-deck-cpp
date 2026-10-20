---
id: conc-thread-argument-by-reference
kind: code
version: 1
level: 2
tags: [concurrency, threads]
input: chips
choices:
  c1: ["std::ref(total)", "std::cref(total)", "total", "&total"]
compile:
  harness: |
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/thread/thread/thread
  - https://en.cppreference.com/w/cpp/utility/functional/ref
requires:
  - conc-thread-copies-arguments
elaborate: Say what must stay true of `total` for as long as the thread can use the reference, and which line here guarantees it.
---

Complete the construction so the new thread adds 5 to `run`'s own
`total`.

```cpp
#include <thread>
void add_into(int& total, int amount) { total += amount; }

void run() {
    int total = 0;
    std::thread worker(add_into, {{c1::std\::ref(total)}}, 5);
    worker.join();
}
```

---

**`std::ref(total)` survives the thread's copy and still refers to `total`.**
Plain `total` is copied, and `int&` cannot bind to the copy, so it does
not compile. `std::cref` wraps a `const` reference, which `int&` cannot
bind either, and `&total` is a pointer, not an `int&`.
