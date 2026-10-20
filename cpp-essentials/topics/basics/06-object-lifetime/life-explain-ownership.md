---
id: life-explain-ownership
kind: explain
version: 1
level: 4
tags: [lifetime, ownership, smart-pointers, interview]
requires:
  - life-new-outlives-scope
  - life-unique-ptr-frees
  - life-shared-ptr-owners
  - life-misconception-shared-to-be-safe
  - life-unique-ptr-member-no-copy
elaborate: Pick one heap object in code you know and say aloud who owns it, and which line frees it.
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#r20-use-unique_ptr-or-shared_ptr-to-represent-ownership
---
An interviewer asks: in modern C++, who frees an object created on the
heap, and how does the code make sure that happens? Answer them.
---
- [ ] Problem: an object from `new` lives until a matching `delete`; forgetting it leaks, repeating it is undefined behaviour
- [ ] Mechanism: a `std::unique_ptr` is the single owner; its destructor deletes the object on every path out of scope
- [ ] Example: copying a `std::shared_ptr` adds an owner, and the object dies when the last owner lets go
- [ ] Cost: each `shared_ptr` copy updates a shared count, and all copies alias the same object
- [ ] Pitfall: a class with a `unique_ptr` member cannot be copied, where a raw pointer member double-deletes
