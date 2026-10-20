---
id: std-priority-queue-api
kind: basic
version: 1
level: 1
tags: [stl, heaps, priority-queue]
requires:
  - std-queue-stack-adaptors
refs:
  - https://en.cppreference.com/w/cpp/container/priority_queue
  - https://en.cppreference.com/w/cpp/container/priority_queue/pop
elaborate: Say in one sentence why `pop()` returning nothing means you always read `top()` first.
---

```cpp
std::priority_queue<int> pq;
pq.push(4);  pq.push(9);  pq.push(1);  pq.push(6);
pq.pop();
int t = pq.top();
```

## What is `t`?

---

**6: by default the largest value is on top, so `pop()` removed 9.**

`std::priority_queue<int>` is a max-priority queue: `top()` reads the
largest without removing it, and `pop()` removes it, returning nothing.
Smallest-first needs a comparator as the third template argument.
