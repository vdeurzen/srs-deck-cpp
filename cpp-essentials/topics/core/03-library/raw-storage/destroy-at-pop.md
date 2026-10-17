---
id: storage-destroy-at-pop
kind: basic
version: 1
level: 3
tags: [raw-storage, lifetime, vector]
requires:
  - storage-construct-at
  - storage-live-range-invariant
  - storage-allocate-vs-construct
refs:
  - https://en.cppreference.com/w/cpp/memory/destroy_at
  - https://en.cppreference.com/w/cpp/container/vector/pop_back
---

## `delete[]` would end every element's lifetime and free the buffer. Which `<memory>` function ends only the last element's lifetime?

```cpp
template <class T>
class Vec {
    T* data_;              // from alloc.allocate(cap_)
    std::size_t size_;     // [0, size_) hold live Ts
    std::size_t cap_;
public:
    void pop_back() {
        --size_;
        // end data_[size_]'s lifetime; keep the buffer
    }
};
```

---

**`std::destroy_at(data_ + size_)`: it runs that one destructor and frees nothing.**
The slot becomes raw storage again, back in `[size_, cap_)`, ready for
a later `construct_at`. An explicit `data_[size_].~T()` does the same.
The buffer still owns the memory; only `deallocate` returns it.
