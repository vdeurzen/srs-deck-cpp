---
id: conc-forgotten-join
kind: basic
version: 1
level: 1
tags: [concurrency, threads, lifetime]
requires:
  - conc-thread-shares-memory
  - err-no-handler-terminates
elaborate: Go lets a goroutine outlive the function that started it. Say why C++ chose to end the program instead of guessing, and where your code would hit it.
refs:
  - https://en.cppreference.com/w/cpp/thread/thread/~thread
  - https://eel.is/c++draft/thread.thread.destr
---

```cpp
void flush_cache() { /* slow disk writes */ }

void shut_down() {
    std::thread writer(flush_cache);
    std::cout << "bye\n";
}
```

## `shut_down` is called and prints `bye`. What happens as it returns?

---

**`std::terminate` is called: `writer` is destroyed without having been joined.**

A `std::thread` that started a function stays *joinable* until someone
calls `join()` on it. Its destructor will not guess whether to wait
for it, so it ends the program instead, whether or not `flush_cache` has
already finished. The fix is `writer.join();` before the closing brace.
