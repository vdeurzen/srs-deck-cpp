---
id: sptr-explain-implement
kind: explain
version: 1
level: 5
tags: [smart-pointers, atomics, implement-std]
requires:
  - sptr-relaxed-increment
  - sptr-weak-plus-one
  - sptr-aliasing-ctor
elaborate: Which object in your own code is shared between threads, and where would its last owner run the destructor?
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://timsong-cpp.github.io/cppwp/n4950/util.smartptr.shared
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/shared_ptr_base.h
---
The interviewer: "Implement `std::shared_ptr`." Talk them through your
design.
---
- [ ] Holds two pointers, object and control block, because the aliasing constructor lets them name different objects
- [ ] Copying increments the strong count, and that increment may be `relaxed` (libc++; libstdc++ uses `acq_rel`)
- [ ] The strong-count decrement is `acq_rel`, so every owner's writes happen before the destructor runs
- [ ] When the strong count reaches 0 the object is destroyed at once, however long the control block lives on
- [ ] The owners collectively hold +1 on the weak count, so exactly one decrement frees the block
