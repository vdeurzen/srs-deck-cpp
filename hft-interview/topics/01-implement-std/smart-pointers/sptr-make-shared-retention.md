---
id: sptr-make-shared-retention
kind: basic
version: 1
level: 3
tags: [smart-pointers, lifetime, implement-std]
requires:
  - cpp-essentials/smart-pointers-make-shared-one-allocation
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/make_shared#Notes
  - https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/shared_ptr_base.h
---

## Your `make_shared<T>` puts `T` inside the control block. The strong count drops to 0; one `weak_ptr` remains. What does your release code do with the `T`?

---

**Destroy now, free later: run `~T()` in place at once; free the block
only when the weak count reaches 0.** The object's life ends with its
last owner, so its destructor (closing files, releasing locks) must not
wait for observers. The `weak_ptr` still reads the counts in the block,
so the memory can't go yet.
