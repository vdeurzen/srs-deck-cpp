---
id: heap-std-library-traps
kind: cloze
version: 1
level: 3
tags: [heaps, containers, c++]
requires:
  - heap-vocabulary
refs:
  - https://en.cppreference.com/w/cpp/container/priority_queue
---

`std::priority_queue<int>` is a max-heap: `top()` is the largest. A
queue that pops the smallest first needs {{c1::`std\::greater<>`::a
standard function object}} as its third template argument — forgetting
it is the classic inverted priority queue.
