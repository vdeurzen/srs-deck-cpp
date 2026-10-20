---
id: seq-vector-vs-deque
kind: basic
version: 1
level: 2
requires:
  - linear-array-index-contiguity
  - cpp-essentials/iter-size-vs-capacity
tags: [containers, memory-hierarchy]
elaborate: Your queue has a known maximum length. What would a fixed ring buffer give you that `deque` does not?
refs:
  - https://en.cppreference.com/w/cpp/container/deque
  - https://en.cppreference.com/w/cpp/container/vector
---

## Both containers grow at the back. What does `std::deque`'s block layout let a push do that a full `std::vector`'s push cannot?

```
map:  [ * ][ * ][ * ]        array of pointers to blocks
        |    |    |
      [..ab][cdef][gh..]     fixed-size blocks, ends partly filled
```

---

**Add room without moving any existing element, at either end.** A push
fills the end block or allocates a new one, so `push_front` copies
nothing and references to existing elements stay valid. A full `vector`
must move every element into a bigger buffer.
