---
id: opt-conditionally-trivial-dtor
kind: basic
version: 1
level: 4
tags: [optional, abi, special-members, implement-std]
elaborate: Which small value types on your hot path have a user-provided destructor they don't need for every T?
requires:
  - opt-union-storage
  - cpp-core/templates-conditionally-trivial
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/optional.dtor#2
  - https://itanium-cxx-abi.github.io/cxx-abi/abi.html#non-trivial-return-values
  - https://en.cppreference.com/w/cpp/types/is_destructible
---

## Your `Opt<T>` has one destructor, `~Opt() { if (engaged) std::destroy_at(&val); }`. On x86-64 Linux, `std::optional<int> f()` returns its result in a register. How does `Opt<int> g()` return its result?

---

**Through memory: the caller passes a hidden pointer, and `g` writes the result there.**
The Itanium C++ ABI (x86-64 Linux) returns a class in memory if it has a
non-trivial copy constructor, move constructor or destructor (or has
every copy and move constructor deleted). The standard makes `optional<T>`'s destructor trivial
whenever `T`'s is; `Opt` needs the same conditionally trivial
destructor.
