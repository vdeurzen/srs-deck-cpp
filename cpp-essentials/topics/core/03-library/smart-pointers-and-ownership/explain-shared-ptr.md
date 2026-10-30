---
id: smart-pointers-explain-shared-ptr
kind: explain
version: 4
level: 3
tags: [smart-pointers, ownership]
requires:
  - smart-pointers-two-control-blocks
  - smart-pointers-make-shared-one-allocation
  - life-shared-ptr-owners
elaborate: When would you not reach for `shared_ptr` at all, and what would you say to an interviewer who proposes it "to be safe"?
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://en.cppreference.com/w/cpp/memory/shared_ptr/make_shared
---
An interviewer asks you to explain how `std::shared_ptr` manages the
lifetime of its object. Answer aloud in about a minute.
---
- [ ] Every copy shares one heap control block that counts the owners
- [ ] Copying a `shared_ptr` adds an owner; destroying one or setting it to `nullptr` removes one
- [ ] Copying into an inner scope makes the count two there, and one again after its brace
- [ ] The owner that takes the count to zero deletes the object, whoever created it
- [ ] Two `shared_ptr`s built from one raw pointer make two blocks and delete it twice
