---
id: vec-explain-implement
kind: explain
version: 1
level: 3
tags: [vector, implement-std]
requires:
  - vec-three-pointers
  - vec-zero-capacity-growth
  - linear-dynamic-array-growth
  - vec-reserve-in-loop
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - https://en.cppreference.com/w/cpp/container/vector/reserve
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/stl_vector.h
elaborate: Which growable buffer in your own code (a log, a message batch) grows by a fixed step, and what would doubling change for it?
---
An interviewer asks you to write your own `std::vector`, and first to
say aloud what the design must get right. Answer aloud.
---
- [ ] Problem: push_back must be amortised O(1) while all elements stay in one contiguous buffer
- [ ] Mechanism: three pointers mark the first element, one past the last, and the buffer's end
- [ ] Example: doubling needs a zero guard, so an empty vector's capacities go 0, 1, 2, 4, 8
- [ ] Cost: geometric growth makes n pushes O(n) in total, where growing by one slot makes O(n²)
- [ ] Pitfall: reserving one more slot before every push reallocates on every push
