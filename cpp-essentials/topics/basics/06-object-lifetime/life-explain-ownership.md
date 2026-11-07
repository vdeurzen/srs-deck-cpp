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
- [ ] Raw `new` leaves it to your own matching `delete`; forgetting it leaks, repeating it is undefined behaviour
- [ ] Modern code gives the object an owner: a `std::unique_ptr`, whose destructor deletes it on every path out of scope
- [ ] With `std::shared_ptr`, each copy adds an owner, and the last owner to let go deletes the object
- [ ] A `unique_ptr` is move-only, so exactly one owner exists at any moment
