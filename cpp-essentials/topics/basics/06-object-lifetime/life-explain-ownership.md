---
id: life-explain-ownership
kind: explain
version: 2
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
- [ ] An object from `new` lives until a matching `delete`; forgetting it leaks, repeating it is undefined behaviour
- [ ] Modern code gives it an owner: a `std::unique_ptr`, whose destructor deletes it on every path out of scope
- [ ] Copying a `std::shared_ptr` adds an owner, and the object is deleted when the last owner lets go
- [ ] Use `unique_ptr` by default; a `shared_ptr` copy shares the object rather than making copying safe
- [ ] A `unique_ptr` cannot be copied, so a class holding one never gets two owners deleting twice
