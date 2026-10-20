---
id: std-queue-stack-adaptors
kind: basic
version: 2
level: 1
tags: [foundations, queues, containers]
requires:
  - linear-queue-adt
  - cpp-essentials/vector-basics
refs:
  - https://en.cppreference.com/w/cpp/container/queue
  - https://en.cppreference.com/w/cpp/container/queue/pop
elaborate: Say in one sentence why `std::queue::pop` returns nothing instead of the removed element.
---

## `std::queue` is the standard library's FIFO queue. Which numbered line does not compile?

```cpp
std::queue<int> q;
q.push(1);
q.push(2);
int b = q.front();   // (1)
q.pop();             // (2)
int a = q.pop();     // (3)
```

---

**(3): `pop()` returns `void`; it removes the oldest without handing it back.**

Read the oldest with `front()` first, then `pop()` it. Line (1)
reads 1, and line (2) removes it, leaving 2 at the front.
