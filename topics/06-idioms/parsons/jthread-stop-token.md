---
id: parsons-jthread-stop-token
kind: parsons
version: 1
level: 3
tags: [idioms, concurrency]
compile:
  flags: [-Wall, -Wextra, -pthread]
  harness: |
    int main() {
      std::jthread t(work);
      while (ticks.load() == 0) {
      }
      t.request_stop();
      t.join();
      return ticks.load() > 0 ? 0 : 1;
    }
refs:
  - https://en.cppreference.com/w/cpp/thread/jthread
  - https://en.cppreference.com/w/cpp/thread/stop_token
---

```cpp
#include <thread>
#include <atomic>
std::atomic<int> ticks{0};
void work(std::stop_token token) {
  while (!token.stop_requested()) {
    ++ticks;
  }
}
```

---

`std::jthread` (C++20) does two things `std::thread` never did: it joins
automatically in its destructor, so a `jthread` going out of scope cannot
leak or `std::terminate` on an un-joined thread, and it hands the thread
function a `std::stop_token` for free — no `std::atomic<bool>` and no
manual shared state needed to ask it to stop cooperatively.
