---
id: parsons-rule-of-five
kind: parsons
version: 2
level: 3
tags: [idioms, move-semantics]
requires:
  - cpp-essentials/move-semantics-rule-of-five
compile:
  harness: |
    constexpr bool check() {
      Buffer a{new int[2]{1, 2}, 2};
      Buffer b{new int[1]{9}, 1};
      b = a;
      bool ok = b.size_ == 2 && b.data_[0] == 1 && b.data_[1] == 2 && b.data_ != a.data_;
      b = b;
      ok = ok && b.size_ == 2 && b.data_[1] == 2;
      delete[] a.data_;
      delete[] b.data_;
      return ok;
    }
    static_assert(check());
    int main() {}
elaborate: If `Buffer` held a `std::vector<int>` instead of a raw array, which of its five special members would you still write, and why?
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three
---

`Buffer` owns the array `data_` of `size_` ints; its destructor, copy
and move constructors and move assignment are written elsewhere. Order
the lines of its copy assignment so that a throwing `new` leaves `*this`
untouched and `b = b` is safe without a self-check.

```cpp
struct Buffer { int* data_; int size_; constexpr Buffer& operator=(const Buffer&); };
constexpr Buffer& Buffer::operator=(const Buffer& other) {
  int* fresh = new int[other.size_];
  for (int i = 0; i < other.size_; ++i) fresh[i] = other.data_[i];
  delete[] data_;
  data_ = fresh; size_ = other.size_;
  return *this;
}
```

---

**Allocate, copy, release, adopt: the old array is deleted only after
the new one is full.** If `new` throws, `*this` is untouched (the strong
guarantee). Self-assignment needs no `this == &other` check, because
`other.data_` is read before `delete[] data_` frees it. Deleting first
would make `b = b` copy from freed memory, and adopting `fresh` before
the `delete[]` would free the new array instead of the old one.
