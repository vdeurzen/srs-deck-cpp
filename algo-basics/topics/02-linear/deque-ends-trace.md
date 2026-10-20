---
id: linear-deque-ends-trace
kind: trace
version: 1
level: 1
tags: [foundations, deques, tracing]
requires:
  - interview-essentials/linear-queue-adt
  - interview-essentials/linear-stack-adt
probes:
  1: { "d.front()": "0", "d.back()": "2" }
  2: { "d.front()": "-1", "d.back()": "1" }
  3: { "d.front()": "1", "d.back()": "1" }
refs:
  - https://en.cppreference.com/w/cpp/container/deque
---

A deque (double-ended queue) adds and removes at either end.

```cpp
#include <deque>

int main() {
  std::deque<int> d;
  d.push_back(1); d.push_back(2); d.push_front(0);   // @1
  d.pop_back(); d.push_front(-1);                    // @2
  d.pop_front(); d.pop_front();                      // @3
}
```

---

Contents: 0 1 2, then −1 0 1, then 1. **A deque is the ADT with all
four end operations**; using only `push_back` with `pop_front` makes it
a queue, `push_back` with `pop_back` a stack.

(Values from running it under GCC 16.2.)
