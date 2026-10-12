---
id: storage-destroy-at-pop
kind: basic
version: 1
level: 3
tags: [raw-storage, lifetime, vector]
requires:
  - storage-live-range-invariant
  - storage-construct-at
refs:
  - https://en.cppreference.com/w/cpp/memory/destroy_at
  - https://en.cppreference.com/w/cpp/container/vector/pop_back
---

## A `new T[cap]` buffer can't drop one element: `delete[]` ends every lifetime and frees the memory. With raw storage, what ends just the last element?

```cpp
void pop_back() {
    --size_;
    // end data_[size_]'s lifetime; keep the buffer
}
```

---

**`std::destroy_at(data_ + size_)`: it runs that one destructor and frees nothing.**
The slot becomes raw storage again, back in `[size_, cap_)`, ready for
a later `construct_at`. The buffer still owns the memory; only
`deallocate` returns it.
