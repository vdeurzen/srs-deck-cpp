---
id: atomics-trace-message-passing
kind: trace
version: 1
level: 2
tags: [concurrency, atomics, memory-model, tracing]
probes:
  1: { seen: "42" }
  2: { was: "true" }
requires:
  - atomics-synchronizes-with
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order
  - https://eel.is/c++draft/intro.races
---

```cpp
int payload = 0;
std::atomic<bool> ready{false};
void producer() {
  payload = 42;
  ready.store(true, std::memory_order_release);
}
int seen = -1;
void consumer() {
  while (!ready.load(std::memory_order_acquire)) {
  }
  seen = payload;               // @1
}
int main() {
  std::jthread c(consumer), p(producer);
  c.join();
  p.join();
  bool was = ready.exchange(false);   // @2
}
```

---

The **message-passing litmus test**. The loop exits only on a load that
read `true`, the value the release store wrote, so that store
synchronizes-with that load; `payload = 42` is sequenced before the
store and `seen = payload` after the load, so the write happens-before
the read and 42 is the only outcome, on every platform. At @2 `exchange` returns
the value it replaced: `true`, because `join` orders the producer's
store before anything `main` does afterwards. Make both orders `relaxed`
and no synchronizes-with exists: the two accesses to `payload` conflict
with no happens-before, which is a data race — undefined behaviour, not
"0 or 42". (Only if `payload` were itself a relaxed atomic would `0`
become a legal outcome.) Verified by running an instrumented copy under
GCC 16.2 (`g++ -std=c++23 -pthread`), including under ThreadSanitizer.
