---
id: seq-vector-vs-deque
kind: basic
version: 1
level: 2
requires:
  - foundations-cache-cost-model
  - algo-basics/linear-array-index-contiguity
tags: [containers, memory-hierarchy]
elaborate: Your queue has a known maximum length. What would a fixed ring buffer give you that `deque` does not?
refs:
  - https://en.cppreference.com/w/cpp/container/deque
  - https://en.cppreference.com/w/cpp/container/vector
---

## What does `std::deque` give you that `std::vector` cannot?

```
map:  [ * ][ * ][ * ]        array of pointers to blocks
        |    |    |
      [..ab][cdef][gh..]     fixed-size blocks, ends partly filled
```

---

**Growth at both ends without moving any element.** A push fills the end
block or allocates a new one, so `push_front` is O(1) and references to
existing elements stay valid. A `vector` must move every element when it
reallocates.
