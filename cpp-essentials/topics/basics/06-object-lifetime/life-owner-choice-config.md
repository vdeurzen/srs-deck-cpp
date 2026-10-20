---
id: life-owner-choice-config
kind: basic
version: 1
level: 3
tags: [lifetime, ownership, recognition]
requires:
  - smart-shared-ptr-intro
  - life-unique-ptr-member-no-copy
  - ptr-reference-must-bind
elaborate: Say what in a design would let you replace this choice with a single owner that clearly outlives the others.
refs:
  - https://en.cppreference.com/w/cpp/memory/shared_ptr
  - https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#r20-use-unique_ptr-or-shared_ptr-to-represent-ownership
---

## Two `Session` objects each need the same heap-allocated `Config` for as long as they live, and either `Session` may be destroyed first. What should each `Session` hold?

---

**A `std::shared_ptr<Config>`: the last `Session` to die frees it.**

The cue is several owners with no known last one. A `std::unique_ptr`
member cannot be copied into a second owner. A `const Config&` owns
nothing, so it refers to a dead object once the `Config`'s real owner
destroys it.
