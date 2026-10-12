---
id: storage-live-range-invariant
kind: basic
version: 1
level: 2
tags: [raw-storage, vector, invariant]
elaborate: Which member function of your own container would break this invariant if it threw halfway?
requires:
  - storage-allocate-vs-construct
refs:
  - https://en.cppreference.com/w/cpp/container/vector
  - https://timsong-cpp.github.io/cppwp/n4950/vector.overview
---

## Between member calls, what state is each slot `data_[i]` in?

```cpp
template <class T>
class Vec {
    T* data_;              // from alloc.allocate(cap_)
    std::size_t size_;
    std::size_t cap_;
};
```

---

**`[0, size_)` hold live `T`s; `[size_, cap_)` are raw storage holding no objects.**
Every member relies on it: `push_back` constructs at `data_[size_]`
then bumps `size_`, and the destructor destroys exactly the first
`size_` before deallocating. Break it and you destroy a slot that holds
nothing, or never destroy one that does.
