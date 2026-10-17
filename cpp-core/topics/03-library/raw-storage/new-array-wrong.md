---
id: storage-new-array-wrong
kind: basic
version: 1
level: 2
tags: [raw-storage, vector, lifetime]
elaborate: If the element type had no default constructor, what would `new T[8]` do to this design?
requires:
  - cpp-essentials/iter-size-vs-capacity
refs:
  - https://en.cppreference.com/w/cpp/language/new
  - https://en.cppreference.com/w/cpp/container/vector
---

## `Names` keeps its spare capacity in `new std::string[8]`. Why can't `std::vector<std::string>` work that way?

```cpp
struct Names {
    std::string* data = new std::string[8];   // capacity 8
    std::size_t size = 0;                     // no names yet
};
```

---

**The spare slots would hold live objects: `new std::string[8]` constructs all eight.**
`size` says 0, yet eight strings exist, were constructed, and will be
destroyed. A vector's spare capacity must be storage with no objects in
it, so getting memory and creating elements have to be separate steps.
