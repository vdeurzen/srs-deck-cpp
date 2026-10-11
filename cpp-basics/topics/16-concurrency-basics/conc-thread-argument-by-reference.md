---
id: conc-thread-argument-by-reference
kind: code
version: 1
level: 2
tags: [concurrency, threads]
requires:
  - conc-start-with-arguments
input: chips
choices:
  c1: ["std::ref(total)", "total", "&total", "std::move(total)", "std::cref(total)"]
compile:
  harness: |
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/thread/thread/thread
  - https://en.cppreference.com/w/cpp/utility/functional/ref
---

Complete the construction so the new thread adds 5 to `run`'s own
`total`.

```cpp
#include <functional>
#include <thread>
void add_into(int& total, int amount) { total += amount; }

void run() {
    int total = 0;
    std::thread worker(add_into, {{c1::std\::ref(total)}}, 5);
    worker.join();
}
```

---

**`std::thread` copies every argument into the new thread**, so plain
`total` would hand `add_into` a temporary copy; binding `int&` to it is
rejected at compile time rather than silently changing the copy.
`std::ref` wraps a reference that survives the copy. `&total` is a
pointer, not an `int&`; `std::cref` gives a `const int&`, which cannot
bind to `int&` either.
