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
  - conc-start-with-arguments
  - ptr-reference-must-bind
elaborate: Say why copying every argument is the safer default for a thread, and what you must then guarantee about `total` when you pass `std::ref`.
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

**`std::thread` copies every argument into the new thread**, so plain
`total` would hand `add_into` a temporary copy; binding `int&` to it is
rejected at compile time rather than silently changing the copy.
`std::ref` wraps a reference that survives the copy. `std::cref` wraps
a `const` one, which `int&` cannot bind, and `&total` is a pointer, not
an `int&`.
