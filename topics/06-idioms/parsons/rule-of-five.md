---
id: parsons-rule-of-five
kind: parsons
version: 1
level: 3
tags: [idioms, move-semantics]
compile:
  harness: |
    int main() {
      Buffer a(4);
      Buffer b = a;
      Buffer c = std::move(a);
      b = c;
      c = std::move(b);
    }
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three
---

```cpp
#include <cstddef>
#include <utility>
class Buffer {
 public:
  Buffer(std::size_t n) : data_(new int[n]), size_(n) {}
  ~Buffer() { delete[] data_; }
  Buffer(const Buffer& other) : data_(new int[other.size_]), size_(other.size_) {
    for (std::size_t i = 0; i < size_; ++i) data_[i] = other.data_[i];
  }
  Buffer& operator=(const Buffer& other) {
    if (this == &other) return *this;
    delete[] data_;
    data_ = new int[other.size_];
    size_ = other.size_;
    for (std::size_t i = 0; i < size_; ++i) data_[i] = other.data_[i];
    return *this;
  }
  Buffer(Buffer&& other) noexcept : data_(other.data_), size_(other.size_) {
    other.data_ = nullptr;
    other.size_ = 0;
  }
  Buffer& operator=(Buffer&& other) noexcept {
    if (this == &other) return *this;
    delete[] data_;
    data_ = other.data_;
    size_ = other.size_;
    other.data_ = nullptr;
    other.size_ = 0;
    return *this;
  }
 private:
  int* data_;
  std::size_t size_;
};
```

---

`Buffer` owns a raw array, so the rule of five applies in full: whenever a
class needs a user-provided destructor, it almost always needs to declare
all five of destructor, copy constructor, copy assignment, move
constructor and move assignment together, because the compiler-generated
default for any of them assumes member-wise copying, which is wrong for
an owning raw pointer.
