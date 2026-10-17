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
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://timsong-cpp.github.io/cppwp/n4950/util.smartptr.shared
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/shared_ptr_base.h
---
The interviewer: "Implement `std::shared_ptr`." Talk through its layout,
the counts and their atomics, and what happens when the last owner and
the last `weak_ptr` go.
---
- [ ] A `shared_ptr` holds two pointers, stored object and control block, because the aliasing constructor lets them name different objects (a member and its owner)
- [ ] Copying increments the strong count, and that increment may be `relaxed` (libc++; libstdc++ uses `acq_rel`)
- [ ] The strong-count decrement is `acq_rel`, so every owner's writes happen before the destructor runs
- [ ] When the strong count reaches 0 the object is destroyed at once, however long the control block lives on
- [ ] The owners collectively hold +1 on the weak count, so exactly one decrement frees the block
