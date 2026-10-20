---
id: life-owner-choice-tree
kind: basic
version: 1
level: 3
tags: [lifetime, ownership, recognition]
requires:
  - smart-unique-ptr-intro
  - smart-shared-ptr-intro
  - life-unique-ptr-member-no-copy
elaborate: Say what a node's destructor would have to contain if its children were raw pointers, and what one forgotten line would cost.
refs:
  - https://en.cppreference.com/w/cpp/memory/unique_ptr
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#r20-use-unique_ptr-or-shared_ptr-to-represent-ownership
---

## A binary-tree `Node` holds its two children, which live on the heap (a struct cannot hold a member of its own type by value). No other code keeps a child, and a child must die with its parent. What type should each child member have?

---

**`std::unique_ptr<Node>`: each child has exactly one owner, its parent.**

The cue is one owner whose lifetime ends the child's. `std::shared_ptr`
pays for an owner count that no second owner needs. A raw `Node*` frees
nothing unless the destructor remembers `delete`, once per child.
