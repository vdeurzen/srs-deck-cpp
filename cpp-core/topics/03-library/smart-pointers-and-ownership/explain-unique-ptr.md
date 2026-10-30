---
id: smart-pointers-explain-unique-ptr
kind: explain
version: 2
level: 3
tags: [smart-pointers, ownership]
requires:
  - cpp-essentials/smart-pointers-unique-ptr-ownership
  - cpp-essentials/smart-pointers-unique-ptr-moved-from-null
  - cpp-essentials/smart-pointers-sink-parameter
elaborate: Which raw `new` or `delete` in code you know would you replace with a `std::unique_ptr`, and who would own it?
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
---
A colleague coming from a garbage-collected language asks how
`std::unique_ptr` decides who deletes an object. Explain it to them.
---
- [ ] Exactly one `unique_ptr` owns the object, and its destructor deletes it: no `delete` in user code
- [ ] Copying is deleted, so a second owner, and the double delete it would cause, fails to compile
- [ ] A move transfers ownership and leaves the source guaranteed null, so `if (p)` after a move is reliable
- [ ] A by-value `unique_ptr` parameter takes ownership: the caller must `std::move` its pointer in and gives it up
- [ ] A function that only uses the object takes `const T&`; the caller keeps ownership, and with it the deletion
