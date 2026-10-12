---
id: storage-uninitialized-move
kind: basic
version: 1
level: 3
tags: [raw-storage, algorithms, misconception]
elaborate: Where in your own code does a loop assign into memory that came from an allocator rather than from a container?
requires:
  - storage-construct-at
refs:
  - https://en.cppreference.com/w/cpp/memory/uninitialized_move
  - https://en.cppreference.com/w/cpp/algorithm/move
  - https://timsong-cpp.github.io/cppwp/n4950/uninitialized.move#1
---

## Growing a buffer of `n` strings, this moves the old elements across. What goes wrong?

```cpp
// std::allocator<std::string> alloc;  std::string* old;  std::size_t n;
std::string* fresh = alloc.allocate(2 * n);
std::move(old, old + n, fresh);
```

---

**`std::move` (the algorithm) assigns, and `fresh` holds no strings to assign to.**
Each `fresh[i] = std::move(old[i])` calls `operator=` on a string whose
lifetime never began: undefined behaviour. `std::uninitialized_move`
move-*constructs* instead. The trap is the shared name. (A real vector
constructs each element from `std::move_if_noexcept(old[i])`, keeping
the strong guarantee.)
