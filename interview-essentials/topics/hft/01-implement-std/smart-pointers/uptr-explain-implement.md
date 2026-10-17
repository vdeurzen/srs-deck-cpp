---
id: uptr-explain-implement
kind: explain
version: 1
level: 5
tags: [smart-pointers, ownership, implement-std]
requires:
  - uptr-reset-order
  - uptr-array-specialisation
  - cpp-essentials/smart-pointers-unique-ptr-deleter-size
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/unique.ptr
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
elaborate: How can your move assignment reuse `reset` and `release`, so it neither leaks nor double-deletes?
---
The interviewer: "Implement `std::unique_ptr`." Talk through what it
stores, why it can't be copied, how `reset` is written, and what
changes for arrays.
---
- [ ] Stores the deleter beside the `T*`, so a stateful deleter widens every `unique_ptr` (an empty one costs nothing, via EBO or `[[no_unique_address]]`)
- [ ] Deletes the copy constructor and copy assignment, because a second owner would delete the object twice
- [ ] Adds no `p != q` guard to `reset`, as the standard specifies none, so `reset(get())` is the caller's double-delete bug
- [ ] `reset(q)` stores `q` before calling the deleter on the old pointer, because the deleter may destroy `*this`
- [ ] `unique_ptr<T[]>` selects `default_delete<T[]>`, which runs `delete[]`, because a `T*` cannot say whether it came from `new[]`
