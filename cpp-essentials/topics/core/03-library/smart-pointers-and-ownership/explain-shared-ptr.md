---
id: smart-pointers-explain-shared-ptr
kind: explain
version: 3
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
- [ ] Several owners share one object, and it must die exactly when the last owner lets go
- [ ] Every copy shares one heap control block that counts the owners
- [ ] Copying into an inner scope makes the count two there, and one again after its brace
- [ ] The control block is a separate allocation, which `make_shared` folds into the object's own
- [ ] Two `shared_ptr`s built from one raw pointer make two blocks and delete it twice
