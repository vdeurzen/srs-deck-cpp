---
id: std-queue-stack-adaptors
kind: basic
version: 1
level: 1
tags: [foundations, queues, stacks, containers]
requires:
  - linear-queue-adt
  - linear-stack-adt
  - cpp-essentials/vector-basics
refs:
  - https://en.cppreference.com/w/cpp/container/queue
  - https://en.cppreference.com/w/cpp/container/stack
elaborate: Say in one sentence why `std::queue::pop` returns nothing instead of the removed element.
---

## What are `a` and `q.front()` after these lines?

```cpp
std::queue<int> q;
q.push(1);
q.push(2);
int a = q.front();
q.pop();
```

---

**1 and 2: `front()` reads the oldest; `pop()` removes it, returning nothing.**

So read before you pop. `std::stack` is the LIFO twin: `push`, `top`
to read the newest, `pop` to remove it. Both are adaptors: a narrow
queue or stack interface wrapped around another container.
