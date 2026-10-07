---
id: heap-go-container-heap
kind: basic
version: 1
level: 3
requires:
  - heap-vocabulary
tags: [go, heaps, interfaces]
elaborate: Which of the two designs would you rather debug at 3 a.m., and which would you rather see in a profile?
refs:
  - https://pkg.go.dev/container/heap
  - https://en.cppreference.com/w/cpp/container/priority_queue
---

## Go's `container/heap` and C++'s `std::priority_queue` solve the same problem with opposite dispatch. What does each design cost?

---

**Go pays an interface call per `Less`/`Swap`; C++ inlines but hides element positions.**

Go's algorithms call your `heap.Interface` methods dynamically, which the
compiler usually cannot inline. C++ takes the comparator as a type and
monomorphises — but owns the container, so you cannot track where an
element moved, and get no `decrease_key`.
